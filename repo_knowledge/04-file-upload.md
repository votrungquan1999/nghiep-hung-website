# File Upload & S3 Storage

## Overview

Product and project images are stored in AWS S3. The application handles upload, deletion, and URL generation for S3 objects.

## S3 Client Configuration

**Location:** `src/lib/s3.ts`

**Required Environment Variables:**
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `AWS_REGION` - S3 bucket region (default: us-east-1)
- `AWS_S3_BUCKET_NAME` - S3 bucket name

**Client setup:**
```typescript
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});
```

## S3 Utilities

### Upload File

**Function:** `uploadToS3(file: File, key: string)`

**Usage:**
```typescript
import { uploadToS3 } from "src/lib/s3";

const file = new File([buffer], "image.jpg", { type: "image/jpeg" });
const key = `products/${productId}/${Date.now()}-${file.name}`;

const result = await uploadToS3(file, key);
// result: { key: "products/123/...", url: "https://bucket.s3.region.amazonaws.com/..." }
```

**Key generation pattern:**
- Products: `products/${productId}/${timestamp}-${filename}`
- Projects: `projects/${projectId}/${timestamp}-${filename}`

**Features:**
- Sets `Content-Type` from file
- Sets ACL to `public-read`
- Returns both key and full public URL

### Delete File

**Function:** `deleteFromS3(key: string)`

**Usage:**
```typescript
import { deleteFromS3 } from "src/lib/s3";

await deleteFromS3("products/123/1234567890-image.jpg");
```

**When to delete:**
- User removes image from gallery
- Product/project is deleted
- Image is replaced with new one

### Get Public URL

**Function:** `getS3Url(key: string)`

**Usage:**
```typescript
import { getS3Url } from "src/lib/s3";

const url = getS3Url("products/123/image.jpg");
// Returns: "https://bucket.s3.region.amazonaws.com/products/123/image.jpg"
```

## Image Upload Flow

### Product Image Upload

1. User selects images in admin panel
2. Client component receives `File[]` objects
3. Form submission sends files to server action
4. Server action:
   - Generates unique keys for each file
   - Uploads to S3 with `uploadToS3()`
   - Stores keys and URLs in MongoDB
5. Success → revalidate cache
6. Display images using S3 URLs

### Image Deletion Flow

1. User clicks delete on image
2. Client triggers deletion
3. Server action:
   - Removes from MongoDB gallery array
   - Deletes from S3 with `deleteFromS3()`
4. Success → revalidate cache

## Database Storage Pattern

Images are stored as arrays in MongoDB:

```typescript
interface ProductImageDocument {
  key: string;           // S3 object key
  url: string;           // Full public URL
  isMain: boolean;       // Main product image flag
  uploadedAt?: Date;     // Upload timestamp
}

interface ProductDocument {
  id: string;
  // ... other fields
  gallery: ProductImageDocument[];
}
```

**Key points:**
- Store both `key` (for deletion) and `url` (for display)
- Track which image is main/featured
- Keep upload timestamps

## Image Gallery Component

**Location:** `src/components/image-gallery/`

**Features:**
- Display grid of images
- Set main image
- Delete images
- Optimistic UI updates

**State management:**
Uses `createReducerContext` pattern with actions:
- `ADD_IMAGES` - Add new images to gallery
- `REMOVE_IMAGE` - Remove image from gallery
- `SET_MAIN_IMAGE` - Set featured image
- `REORDER_IMAGES` - Drag-and-drop reordering

## Image Upload Component

**Location:** `src/components/image-upload/`

**Features:**
- Drag-and-drop upload
- File validation (type, size)
- Preview before upload
- Multiple file selection
- Progress indication

**Usage:**
```typescript
<ImageUpload
  onImagesSelected={(files) => {
    // Handle File[] array
  }}
  maxFiles={10}
  accept="image/*"
/>
```

## S3 Bucket Configuration

### Bucket Policy

Ensure bucket allows public read:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

### CORS Configuration

Allow uploads from your domain:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["https://yourdomain.com"],
    "ExposeHeaders": ["ETag"]
  }
]
```

## File Validation

### Client-Side

**Image types:**
- JPEG/JPG
- PNG
- WebP
- GIF

**Size limits:**
- Max file size: 5MB per image
- Max total upload: 50MB

**Validation in component:**
```typescript
const validateImage = (file: File) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type');
  }

  if (file.size > maxSize) {
    throw new Error('File too large');
  }
};
```

### Server-Side

Always revalidate on server:
- Check file type from buffer
- Verify size limits
- Sanitize filenames
- Generate safe S3 keys

## Error Handling

### Common Errors

1. **Missing credentials:** Check environment variables
2. **Bucket not found:** Verify `AWS_S3_BUCKET_NAME`
3. **Access denied:** Check IAM permissions
4. **Network timeout:** Increase timeout or retry
5. **File too large:** Enforce size limits

### Error Recovery

```typescript
try {
  const result = await uploadToS3(file, key);
  // Success
} catch (error) {
  console.error('S3 upload failed:', error);
  // Retry logic or user feedback
  throw new Error('Failed to upload image');
}
```

## Best Practices

1. **Unique keys:** Use timestamp + filename to avoid collisions
2. **Cleanup:** Always delete from S3 when removing from DB
3. **Validation:** Validate files on both client and server
4. **Error messages:** Provide clear feedback to users
5. **Optimization:** Consider image compression before upload
6. **Security:** Never expose AWS credentials to client
