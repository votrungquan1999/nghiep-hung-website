# Data Layer Patterns

## Database Architecture

### MongoDB Singleton Pattern

The application uses a singleton pattern for MongoDB connections to prevent connection exhaustion:

**Location:** `src/lib/database.ts`

**Key functions:**
- `getDatabase()` - Returns `Db` instance
- `getClient()` - Returns `MongoClient` instance
- `closeDatabase()` - Closes connection (rarely used)

**Usage:**
```typescript
import { getDatabase } from "src/lib/database";

const db = await getDatabase();
const products = await db.collection<ProductDocument>("products").find({}).toArray();
```

## Type Conventions

### Document Types vs Client Types

**Pattern:** Separate database document types from client-facing interfaces

**Database Document Type (raw MongoDB):**
```typescript
export interface ProductDocument {
  id: string;
  name: MultilingualText;
  description: MultilingualText;
  status: ProductStatus;
  gallery: ProductImageDocument[];
  createdAt: Date;
  updatedAt: Date;
}
```

**Client-Facing Type (clean interface):**
```typescript
export interface Product {
  id: string;
  name: MultilingualText;
  description: MultilingualText;
  status: ProductStatus;
  gallery: ProductImage[];
  createdAt: Date;
  updatedAt: Date;
}
```

**Naming convention:**
- Database types: `*Document` suffix
- Client types: No suffix
- Always convert documents to client interfaces before returning to components

## Server Queries

### Query File Pattern

**Location:** `src/server/[domain]/get-*.query.ts`

**Requirements:**
1. Wrap with React `cache()` for deduplication
2. Use JSDoc comments
3. Convert `*Document` to client interface
4. Handle errors with try/catch
5. Return clean client types

**Example:**
```typescript
import { cache } from "react";
import { getDatabase } from "src/lib/database";
import type { Product, ProductDocument } from "./product.type";

export const getProductById = cache(async (id: string): Promise<Product | null> => {
  try {
    const db = await getDatabase();
    const product = await db.collection<ProductDocument>("products").findOne({ id });

    if (!product) {
      return null;
    }

    // Convert Document to client interface
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      status: product.status,
      gallery: product.gallery,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw new Error(`Failed to fetch product with id ${id}`);
  }
});
```

### Common Query Patterns

1. **Get by ID:** `get-[entity]-by-id.query.ts`
2. **Get counts:** `get-[entity]-counts.query.ts`
3. **Get IDs list:** `get-[entity]-ids.query.ts`
4. **Get categories:** `get-[entity]-categories.query.ts`

## Server Mutations

### Mutation File Pattern

**Location:** `src/server/[domain]/*-mutation.ts`

**Requirements:**
1. NOT wrapped with `cache()` (mutations shouldn't be cached)
2. Use revalidation after data changes
3. Handle errors appropriately
4. Return meaningful results

**Example:**
```typescript
import { revalidateTag } from "next/cache";
import { getDatabase } from "src/lib/database";

export async function deleteProduct(id: string): Promise<void> {
  try {
    const db = await getDatabase();
    await db.collection("products").deleteOne({ id });

    revalidateTag("products");
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw new Error(`Failed to delete product ${id}`);
  }
}
```

## Cache Management

### Cache Tags

**Location:** `src/lib/cache-tags.ts`

Define reusable cache tags for revalidation:

```typescript
export const CACHE_TAGS = {
  products: "products",
  services: "services",
  projects: "projects",
  contact: "contact",
};
```

### Revalidation Pattern

After mutations, revalidate relevant cache tags:

```typescript
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "src/lib/cache-tags";

// After updating products
revalidateTag(CACHE_TAGS.products);
```

## Collections

### MongoDB Collections

**Naming:** Lowercase, plural (e.g., `products`, `services`, `projects`)

**Standard collections:**
- `products` - Product catalog
- `services` - Service offerings
- `projects` - Completed projects
- `contact` - Contact information
- `user` - Better Auth users
- `session` - Better Auth sessions

## Domain Organization

Each domain (products, services, projects, contact) follows this structure:

```
src/server/[domain]/
├── get-[entity]-by-id.query.ts
├── get-[entity]-counts.query.ts
├── get-[entity]-ids.query.ts
├── create-[entity].mutation.ts (if applicable)
├── update-[entity].mutation.ts (if applicable)
├── delete-[entity].mutation.ts (if applicable)
├── [entity].type.ts
└── index.ts (exports all)
```

**index.ts exports:**
```typescript
export * from "./get-product-by-id.query";
export * from "./get-product-counts.query";
export * from "./product.type";
```

## Type System

### Enums for Fixed Values

Use TypeScript enums for fixed value sets:

```typescript
export enum ProductStatus {
  Active = "active",
  Draft = "draft",
  Archived = "archived",
}
```

### Multilingual Content

Standard interface for content in multiple languages:

```typescript
export interface MultilingualText {
  en: string;
  vi: string;
}
```

### Type Hoisting

Always hoist type/interface definitions to the top of files before implementation code.
