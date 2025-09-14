# Admin Setup Guide

This guide explains how to set up the admin authentication system with Google OAuth and MongoDB.

## Prerequisites

1. **MongoDB Database** - You can use either:
   - Local MongoDB installation
   - MongoDB Atlas (cloud)
   - Any MongoDB-compatible service

2. **Google OAuth Application** - For admin authentication

## Step 1: Environment Configuration

1. Copy the example environment file:
   ```bash
   cp env.example .env.local
   ```

2. Update the `.env.local` file with your actual values:

### MongoDB Configuration

#### Option A: Local MongoDB
```bash
MONGODB_URI=mongodb://localhost:27017/nghiep-hung-website
```

#### Option B: MongoDB Atlas
1. Create a MongoDB Atlas cluster at https://cloud.mongodb.com
2. Get your connection string and replace the placeholder:
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nghiep-hung-website
```

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
7. Copy the Client ID and Client Secret:

```bash
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

### Admin Authorization

Add comma-separated email addresses of users who should have admin access:

```bash
ADMIN_EMAILS=admin@company.com,manager@company.com
```

### Better Auth Configuration

Generate a secure random secret for production:

```bash
BETTER_AUTH_SECRET=your-secure-random-secret-here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

For production, update the URLs to your actual domain.

## Step 2: Database Setup

Better Auth will automatically create the necessary collections in your MongoDB database. No manual setup required.

## Step 3: Start the Application

```bash
npm run dev
```

## Step 4: Access Admin Panel

1. Open your browser and go to: `http://localhost:3000/admin`
2. You'll be redirected to the login page
3. Click "Sign in with Google"
4. Only users listed in `ADMIN_EMAILS` will be granted access

## Admin Features

Once logged in, you can manage:

- **Products**: Add, edit, delete air duct products
- **Services**: Manage company services
- **Projects**: Showcase completed projects
- **Contact Info**: Update contact details, social media links, working hours

## Security Notes

1. **Environment Variables**: Never commit `.env.local` to version control
2. **Admin Emails**: Only add trusted email addresses to `ADMIN_EMAILS`
3. **Production Secrets**: Use strong, unique secrets in production
4. **MongoDB Security**: Enable authentication and use secure connection strings in production

## Troubleshooting

### Common Issues

1. **"Database connection failed"**
   - Check your MongoDB connection string
   - Ensure MongoDB is running (for local installations)
   - Verify network access (for MongoDB Atlas)

2. **"Unauthorized" after Google login**
   - Check if your email is listed in `ADMIN_EMAILS`
   - Verify the email matches exactly (case-sensitive)

3. **Google OAuth errors**
   - Verify your Google OAuth credentials
   - Check redirect URIs are correctly configured
   - Ensure Google+ API is enabled

### Development vs Production

For production deployment:
1. Update all URLs to your production domain
2. Use strong, unique secrets
3. Configure proper MongoDB security
4. Set up proper CORS and security headers
