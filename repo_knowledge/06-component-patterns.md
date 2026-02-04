# Component Architecture Patterns

## Component File Structure

Complex components follow a three-file pattern:

```
src/components/carousel/
├── carousel.tsx         # Server component (main entry)
├── carousel.ui.tsx      # Client display components
├── carousel.state.tsx   # State management
└── carousel.type.ts     # Shared types
```

**Purpose:**
- Separate server/client concerns
- Clear state management boundaries
- Reusable type definitions
- Better code organization

## Server Component Pattern

**File:** `component.tsx`

**Responsibilities:**
- Data fetching
- Authentication checks
- Composing layout structure
- Passing data to client components

**Example:**
```typescript
// src/components/product-list/product-list.tsx
import { getProducts } from "src/server/products";
import { ProductListUI } from "./product-list.ui";

export async function ProductList() {
  const products = await getProducts();

  return <ProductListUI products={products} />;
}
```

**Key points:**
- No `'use client'` directive
- Can use async/await
- Cannot use hooks or event handlers
- Composes children for client components

## Client UI Component Pattern

**File:** `component.ui.tsx`

**Responsibilities:**
- Rendering UI elements
- Handling user interactions
- Consuming state from context
- Animations and transitions

**Example:**
```typescript
// src/components/carousel/carousel.ui.tsx
"use client";

import { useCarouselState, useCarouselActions } from "./carousel.state";

export function CarouselUI() {
  const { currentIndex, itemCount } = useCarouselState();
  const { goToNext, goToPrevious } = useCarouselActions();

  return (
    <div>
      <button onClick={goToPrevious}>Previous</button>
      <div>Slide {currentIndex + 1} of {itemCount}</div>
      <button onClick={goToNext}>Next</button>
    </div>
  );
}
```

**Key points:**
- Must have `'use client'` directive
- Can use hooks and event handlers
- Cannot use server-only features
- Receives data as props or from context

## State Management Pattern

**File:** `component.state.tsx`

Uses `createReducerContext` utility for state management.

### The createReducerContext Utility

**Location:** `src/contexts/createReducerContext.tsx`

**Purpose:** Create type-safe context + reducer pairs

**Returns:**
```typescript
[Provider, useStateContext, useDispatch]
```

### State Implementation Pattern

**Example:** `carousel.state.tsx`

```typescript
"use client";

import { createReducerContext } from "src/contexts/createReducerContext";
import type { CarouselAction, CarouselState } from "./carousel.type";
import { CarouselActionType } from "./carousel.type";

// 1. Define initial state
const initialState: CarouselState = {
  currentIndex: 0,
  itemCount: 0,
  items: [],
  isTransitioning: false,
};

// 2. Create reducer function
function carouselReducer(
  state: CarouselState,
  action: CarouselAction
): CarouselState {
  switch (action.type) {
    case CarouselActionType.SetIndex:
      return { ...state, currentIndex: action.payload };
    case CarouselActionType.NextItem:
      const nextIndex = (state.currentIndex + 1) % state.itemCount;
      return { ...state, currentIndex: nextIndex };
    // ... more cases
    default:
      return state;
  }
}

// 3. Create context provider and hooks
const [CarouselProvider, useRawCarouselState, useRawCarouselDispatch] =
  createReducerContext(carouselReducer, initialState);

// 4. Create domain-specific hooks (transform raw state)
export function useCarouselState() {
  const rawState = useRawCarouselState();
  return {
    currentIndex: rawState.currentIndex,
    itemCount: rawState.itemCount,
    hasMultipleItems: rawState.items.length > 1,
    hasItems: rawState.items.length > 0,
  };
}

// 5. Create action hooks (encapsulate dispatch)
export function useCarouselActions() {
  const dispatch = useRawCarouselDispatch();
  return {
    goToNext: () => dispatch({ type: CarouselActionType.NextItem }),
    goToPrevious: () => dispatch({ type: CarouselActionType.PrevItem }),
    goToSlide: (index: number) =>
      dispatch({ type: CarouselActionType.SetIndex, payload: index }),
  };
}

export { CarouselProvider };
```

### Key Principles

1. **Transform raw context hooks into domain-specific hooks**
   - Don't expose `useRawCarouselState` directly
   - Create `useCarouselState` with computed values
   - Create `useCarouselActions` with named action methods

2. **Separate concerns:**
   - State access: `useCarouselState()` (read-only)
   - Actions: `useCarouselActions()` (mutations)
   - Special operations: `useCarouselItemManager()` (registration)

3. **Type safety:**
   - Define action types as enums
   - Use discriminated unions for actions
   - Type all state and payloads

## Type Definitions Pattern

**File:** `component.type.ts`

**Contents:**
- State interfaces
- Action types (enums)
- Action unions
- Props interfaces

**Example:**
```typescript
// carousel.type.ts

// State interface
export interface CarouselState {
  currentIndex: number;
  itemCount: number;
  items: CarouselItem[];
  isTransitioning: boolean;
}

export interface CarouselItem {
  id: string;
}

// Action type enum
export enum CarouselActionType {
  SetIndex = "SET_INDEX",
  NextItem = "NEXT_ITEM",
  PrevItem = "PREV_ITEM",
  RegisterItem = "REGISTER_ITEM",
  UnregisterItem = "UNREGISTER_ITEM",
}

// Action union (discriminated union)
export type CarouselAction =
  | { type: CarouselActionType.SetIndex; payload: number }
  | { type: CarouselActionType.NextItem }
  | { type: CarouselActionType.PrevItem }
  | { type: CarouselActionType.RegisterItem; payload: string }
  | { type: CarouselActionType.UnregisterItem; payload: string };
```

## Component Composition

### Server Composes, Client Renders

**Pattern:**
```typescript
// Server component
import { ProductListUI } from "./product-list.ui";
import { ProductListProvider } from "./product-list.state";

export async function ProductList() {
  const products = await getProducts();

  return (
    <ProductListProvider>
      <ProductListUI products={products} />
    </ProductListProvider>
  );
}

// Client UI component
"use client";

import { useProductListState } from "./product-list.state";

export function ProductListUI({ products }) {
  const { filter } = useProductListState();

  const filtered = products.filter(p => /* filter logic */);

  return <div>{/* render */}</div>;
}
```

### Passing Content as Children

Server components can pass complex content to client wrappers:

```typescript
// Server component
export async function Page() {
  const data = await fetchData();

  return (
    <ClientWrapper>
      {/* Server-rendered content passed as children */}
      <ServerComponent data={data} />
    </ClientWrapper>
  );
}

// Client component
"use client";

export function ClientWrapper({ children }) {
  // Client-side interactivity
  return <div onClick={handleClick}>{children}</div>;
}
```

## Optimistic UI Updates

For mutations with immediate feedback:

```typescript
"use client";

export function DeleteButton({ productId }: { productId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true); // Optimistic update

    try {
      await deleteProduct(productId);
      // Success feedback
    } catch (error) {
      setIsDeleting(false); // Rollback on error
      // Error feedback
    }
  }

  return (
    <button onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
```

## Form Components

### Form Field Pattern

**Structure:**
```
src/components/form-field/
├── form-field.tsx       # Server/client hybrid
├── form-field.ui.tsx    # UI elements
├── form-field.state.tsx # Field state management
└── form-field.type.ts   # Field types
```

**Integration with React Hook Form:**
```typescript
"use client";

import { useFormContext } from "react-hook-form";

export function FormField({ name, label }: Props) {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <label>{label}</label>
      <input {...register(name)} />
      {errors[name] && <span>{errors[name].message}</span>}
    </div>
  );
}
```

## Empty State Pattern

**Location:** `src/components/empty-state/empty-state.ui.tsx`

Standard component for empty data states:

```typescript
"use client";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div>
      {icon}
      <h3>{title}</h3>
      <p>{description}</p>
      {action && <Link href={action.href}>{action.label}</Link>}
    </div>
  );
}
```

## Best Practices

### When to Split Components

**Use three-file pattern when:**
- Component needs state management
- Multiple UI variations needed
- Complex user interactions
- Reusable across pages

**Use single file when:**
- Simple presentational component
- No state management needed
- Used in one place only

### Hook Organization

**Pattern:**
1. State access hooks (read-only): `useComponentState()`
2. Action hooks (mutations): `useComponentActions()`
3. Special operation hooks: `useComponentManager()`

**Don't:**
- Expose raw context hooks
- Mix state and actions in one hook
- Return both state and dispatch together

### Performance

**Avoid:**
- `useCallback` / `useMemo` unless passing to memoized children
- `useEffect` unless syncing with external systems
- Premature optimization

**Prefer:**
- Simple state updates
- Direct function calls
- Trust React's rendering optimizations

### TypeScript

**Requirements:**
- JSDoc comments for all exported functions
- Interfaces over types (except unions/mapped types)
- Enums for fixed value sets
- Strict typing for all state and actions

## Common Component Patterns

### Image Gallery
- File upload with preview
- Drag-and-drop reordering
- Main image selection
- Optimistic updates for delete

### Carousel
- Auto-advance with timer
- Manual navigation
- Indicator dots
- Item registration/unregistration

### Form State
- Field-level validation
- Form-level errors
- Submission state
- Reset functionality

See implementation examples in `src/components/` for reference.
