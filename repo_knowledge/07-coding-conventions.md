# Coding Conventions & Style Guide

## TypeScript Conventions

### Types vs Interfaces

**Rule:** Use `interface` over `type` (except for unions/mapped types)

```typescript
// ✅ Good
interface Product {
  id: string;
  name: string;
}

// ❌ Avoid (use interface instead)
type Product = {
  id: string;
  name: string;
};

// ✅ Good (union requires type)
type Status = "active" | "draft" | "archived";

// ✅ Good (enum is better for fixed values)
enum Status {
  Active = "active",
  Draft = "draft",
  Archived = "archived",
}
```

### Enums for Fixed Values

**Rule:** Use `enum` for fixed value sets, not string literal unions

```typescript
// ✅ Good
export enum ProductStatus {
  Active = "active",
  Draft = "draft",
  Archived = "archived",
}

// ❌ Avoid
type ProductStatus = "active" | "draft" | "archived";
```

### Type Hoisting

**Rule:** Hoist type/interface definitions to top of file

```typescript
// ✅ Good
interface Props {
  id: string;
  name: string;
}

export function Component({ id, name }: Props) {
  // implementation
}

// ❌ Avoid inline types
export function Component({ id, name }: { id: string; name: string }) {
  // implementation
}
```

### JSDoc Requirements

**Rule:** Every function requires JSDoc with purpose, params, and return description

```typescript
/**
 * Get a single product by ID
 * @param id - The product ID
 * @returns Promise that resolves to the product or null if not found
 */
export async function getProductById(id: string): Promise<Product | null> {
  // implementation
}
```

### No Inline Imports

**Rule:** Never use inline imports like `import("path").TypeName`

```typescript
// ❌ Avoid
function foo(): import("./types").Product {
  // implementation
}

// ✅ Good
import type { Product } from "./types";

function foo(): Product {
  // implementation
}
```

### Path Aliases

**Rule:** Use `src/*` for all imports (configured in tsconfig.json)

```typescript
// ✅ Good
import { getDatabase } from "src/lib/database";
import { Product } from "src/server/products";

// ❌ Avoid relative paths
import { getDatabase } from "../../lib/database";
import { Product } from "../products";
```

## React Patterns

### Hook Usage Rules

**Rule:** Never use `useCallback`/`useMemo` unless passing to memoized children

```typescript
// ❌ Avoid (premature optimization)
const handleClick = useCallback(() => {
  doSomething();
}, []);

// ✅ Good (only if passing to memoized child)
const MemoizedChild = React.memo(Child);

function Parent() {
  const handleClick = useCallback(() => {
    doSomething();
  }, []);

  return <MemoizedChild onClick={handleClick} />;
}
```

**Rule:** Never use `useEffect` except for syncing with external resources

```typescript
// ❌ Avoid (can be done during render)
useEffect(() => {
  setFilteredData(data.filter(item => item.active));
}, [data]);

// ✅ Good (computed during render)
const filteredData = data.filter(item => item.active);

// ✅ Good (syncing with external system)
useEffect(() => {
  const connection = createConnection();
  connection.connect();
  return () => connection.disconnect();
}, []);
```

### State Management

**Rule:** Use `useReducer` over `useState` for complex state

```typescript
// ❌ Avoid for complex state
const [count, setCount] = useState(0);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);

// ✅ Good
const [state, dispatch] = useReducer(reducer, {
  count: 0,
  error: null,
  loading: false,
});
```

**Rule:** Use `createReducerContext` for shared state

See [06-component-patterns.md](./06-component-patterns.md) for details.

## Tailwind CSS Conventions

### Size Utilities

**Rule:** Use `size-x` instead of `w-x h-x`

```tsx
// ✅ Good
<div className="size-10" />

// ❌ Avoid
<div className="w-10 h-10" />
```

### Positioning

**Rule:** Use `pile` class instead of `absolute` positioning

```tsx
// ✅ Good (pile is a custom utility)
<div className="pile" />

// ❌ Avoid
<div className="absolute inset-0" />
```

### Layout Preference

**Rule:** Prefer `grid` for layout; use `flex` only when grid cannot solve it

```tsx
// ✅ Good
<div className="grid grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id} />)}
</div>

// ⚠️ Use flex only if grid doesn't work
<div className="flex items-center gap-2">
  <Icon />
  <Text />
</div>
```

### Color Tokens

**Rule:** Use tokenized colors (`bg-primary`, `text-muted`) not palette values

```tsx
// ✅ Good
<div className="bg-primary text-foreground" />

// ❌ Avoid
<div className="bg-blue-800 text-gray-100" />
```

### Class Organization

**Rule:** Separate semantic, layout, and breakpoint classes with `cn()`

```tsx
import { cn } from "src/lib/utils";

// ✅ Good
<div className={cn(
  "bg-primary text-foreground", // semantic colors
  "px-4 py-2 rounded-lg",        // layout/spacing
  "md:px-6 lg:text-xl"           // breakpoints
)} />

// ❌ Avoid (all mixed together)
<div className="bg-primary text-foreground px-4 py-2 rounded-lg md:px-6 lg:text-xl" />
```

## File Organization

### Naming Conventions

**Files:**
- Components: `kebab-case.tsx`
- Types: `kebab-case.type.ts`
- State: `kebab-case.state.tsx`
- UI: `kebab-case.ui.tsx`
- Queries: `get-entity-name.query.ts`
- Mutations: `action-entity-name.mutation.ts`

**Functions:**
- camelCase for functions and variables
- PascalCase for components and types
- SCREAMING_SNAKE_CASE for constants

```typescript
// ✅ Good
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export function getProductById() {}
export interface Product {}
export function ProductCard() {}
```

### Import Order

**Pattern:**
1. External dependencies
2. Internal utilities
3. Components
4. Types
5. Styles

```typescript
// 1. External
import { useState } from "react";
import { useForm } from "react-hook-form";

// 2. Internal utilities
import { cn } from "src/lib/utils";
import { getProducts } from "src/server/products";

// 3. Components
import { Button } from "src/components/ui/button";
import { ProductCard } from "./product-card";

// 4. Types
import type { Product } from "src/server/products/product.type";

// 5. Styles (if any)
import "./styles.css";
```

## Code Style

### Over-Engineering Rules

**Rule:** Avoid over-engineering. Only make changes that are directly requested or clearly necessary.

**Don't:**
- Add features beyond what was asked
- Refactor surrounding code when fixing bugs
- Add "improvements" that weren't requested
- Add docstrings/comments to code you didn't change
- Add error handling for impossible scenarios
- Create abstractions for one-time operations
- Design for hypothetical future requirements

**Do:**
- Fix only what's broken
- Add features only what's requested
- Keep solutions simple and focused
- Write self-evident code

### Backwards Compatibility

**Rule:** Avoid backwards-compatibility hacks

```typescript
// ❌ Avoid
const _unusedVar = oldValue; // keeping for backwards compat
export { OldName as NewName }; // re-export for compat
// removed: function oldFunction() {} // keeping comment

// ✅ Good - just delete unused code
```

### Comments

**Rule:** Only add comments where logic isn't self-evident

```typescript
// ❌ Unnecessary comment
// Set the user name
const userName = user.name;

// ✅ Good - explains WHY
// Using floor instead of round to match legacy behavior
const value = Math.floor(result);
```

### Error Handling

**Rule:** Only validate at system boundaries (user input, external APIs)

```typescript
// ❌ Avoid - internal function doesn't need validation
function calculateTotal(items: Item[]) {
  if (!items || !Array.isArray(items)) {
    throw new Error("Items must be an array");
  }
  // calculation
}

// ✅ Good - trust internal code
function calculateTotal(items: Item[]) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ✅ Good - validate at boundary
export async function createProduct(data: unknown) {
  const validated = productSchema.parse(data); // validate user input
  const product = await saveProduct(validated);
  return product;
}
```

## Formatting

### Biome Configuration

The project uses **Biome** for linting and formatting.

**Rule:** Always format files after editing

```bash
# Format changed files
npm run biome:format:changed

# Format specific files
npm run biome:format

# Fix issues
npm run biome:fix
```

**Auto-format on save:** Configure your editor to run Biome on save.

### Line Length

Biome handles line wrapping automatically. Don't manually break lines.

### Semicolons

Biome configuration determines semicolon usage. Follow the formatter output.

## Testing

The project uses Vitest for testing.

**Run tests:**
```bash
npm run test
```

**Test file naming:**
- `component.test.tsx` for component tests
- `utils.test.ts` for utility tests

**Test organization:**
```typescript
describe("ProductCard", () => {
  it("renders product name", () => {
    // test
  });

  it("handles click events", () => {
    // test
  });
});
```

## Git Conventions

### Commit Messages

Follow conventional commits:

```bash
feat: add product filtering
fix: resolve image upload bug
refactor: simplify auth logic
docs: update README
style: format with Biome
test: add product tests
chore: update dependencies
```

### Branch Names

```bash
feature/product-filtering
fix/image-upload-bug
refactor/auth-simplification
```

## Performance

### Image Optimization

Use Next.js Image component:

```tsx
import Image from "next/image";

// ✅ Good
<Image
  src={product.image}
  alt={product.name}
  width={400}
  height={300}
  priority={isHero}
/>

// ❌ Avoid
<img src={product.image} alt={product.name} />
```

### Data Fetching

- Use React `cache()` for deduplication
- Fetch at page level, not component level
- Use server components for data fetching

See [02-data-patterns.md](./02-data-patterns.md) for details.

## Security

### Environment Variables

**Client-side:** Must be prefixed with `NEXT_PUBLIC_`

```typescript
// ✅ Good - available in client
const url = process.env.NEXT_PUBLIC_API_URL;

// ⚠️ Only available on server
const secret = process.env.SECRET_KEY;
```

### Authentication

Always use `requireAdminAuth()` for protected routes.

See [03-auth-patterns.md](./03-auth-patterns.md) for details.

### Input Validation

Use Zod for all user inputs:

```typescript
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

const validated = schema.parse(userInput);
```

## Summary

Key principles:
1. **Simplicity:** Keep solutions simple and focused
2. **Type Safety:** Use TypeScript strictly
3. **Performance:** Leverage React Server Components
4. **Organization:** Follow file structure patterns
5. **Code Quality:** Format with Biome after edits
