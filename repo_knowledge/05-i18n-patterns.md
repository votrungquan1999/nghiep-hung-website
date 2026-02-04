# Internationalization (i18n) Patterns

## Overview

The application supports two languages:
- **Vietnamese (vi)** - Default language
- **English (en)**

**Important:** Admin panel does NOT use i18n. Only public routes in `(main)/[lang]/` are internationalized.

## Configuration

**Location:** `src/lib/i18n/config.ts`

**Key constants:**
```typescript
export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "vi";

export const localeNames: Record<Locale, string> = {
  vi: "Tiếng Việt",
  en: "English",
};
```

## URL Structure

Public pages use language prefix in URL:
- Vietnamese: `/vi/products`
- English: `/en/products`

**Root redirect:** `/` → `/vi` (default language)

**Route pattern:**
```
src/app/(main)/[lang]/
├── page.tsx              → /[lang]
├── about/page.tsx        → /[lang]/about
├── products/page.tsx     → /[lang]/products
├── services/page.tsx     → /[lang]/services
└── projects/page.tsx     → /[lang]/projects
```

## Dictionary System

**Location:** `src/lib/i18n/dictionaries.ts`

All translations stored in a single file with nested structure:

```typescript
export const dictionaries: DictionaryForLocale = {
  vi: {
    nav: {
      home: "Trang chủ",
      about: "Giới thiệu",
      products: "Sản phẩm",
      // ...
    },
    common: {
      loading: "Đang tải...",
      error: "Có lỗi xảy ra",
      // ...
    },
    // ... more sections
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      products: "Products",
      // ...
    },
    // ... mirror structure in English
  },
};
```

**Categories:**
- `nav` - Navigation menu items
- `common` - Common UI text (buttons, actions, states)
- `form` - Form labels, validations, actions
- `footer` - Footer content
- `about` - About page content
- `products` - Products page content
- `services` - Services page content
- `projects` - Projects page content
- `contact` - Contact page content
- `hero` - Hero section content
- `meta` - SEO metadata

## Using Translations in Pages

### Server Components (Recommended)

```typescript
import { getDictionary } from "src/lib/i18n/dictionaries";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang as "vi" | "en");

  return (
    <div>
      <h1>{dict.products.title}</h1>
      <p>{dict.products.description}</p>
    </div>
  );
}
```

### Client Components

Pass translations as props from server component:

```typescript
// Server component
import { getDictionary } from "src/lib/i18n/dictionaries";
import { ClientComponent } from "./client-component";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang as "vi" | "en");

  return <ClientComponent translations={dict.products} />;
}

// Client component
"use client";

interface Props {
  translations: {
    title: string;
    description: string;
  };
}

export function ClientComponent({ translations }: Props) {
  return <h1>{translations.title}</h1>;
}
```

## Database Content i18n

For content from MongoDB (products, services, projects), use `MultilingualText` interface:

```typescript
export interface MultilingualText {
  en: string;
  vi: string;
}

interface Product {
  id: string;
  name: MultilingualText;
  description: MultilingualText;
  // ...
}
```

**Display pattern:**
```typescript
const lang = (await params).lang as "vi" | "en";
const product = await getProductById(id);

return (
  <div>
    <h1>{product.name[lang]}</h1>
    <p>{product.description[lang]}</p>
  </div>
);
```

## Language Switcher

Implementation in navigation component:

```typescript
"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function LanguageSwitcher() {
  const pathname = usePathname();

  // Extract current language from pathname
  const currentLang = pathname.split('/')[1]; // 'vi' or 'en'

  // Toggle language
  const newLang = currentLang === 'vi' ? 'en' : 'vi';
  const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);

  return (
    <Link href={newPath}>
      {newLang === 'vi' ? 'Tiếng Việt' : 'English'}
    </Link>
  );
}
```

## SEO Configuration

Each language has specific SEO settings:

```typescript
export const seoConfig: Record<Locale, {
  locale: string;
  direction: "ltr" | "rtl";
  charset: string;
}> = {
  vi: {
    locale: "vi_VN",
    direction: "ltr",
    charset: "utf-8",
  },
  en: {
    locale: "en_US",
    direction: "ltr",
    charset: "utf-8",
  },
};
```

**Usage in layout:**
```typescript
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang as "vi" | "en");
  const seo = seoConfig[lang as "vi" | "en"];

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      languages: {
        'vi': '/vi',
        'en': '/en',
      },
    },
  };
}
```

## Cookie-based Language Preference

**Configuration:** `src/lib/i18n/config.ts`

```typescript
export const languageDetection = {
  cookieName: "NEXT_LOCALE",
  cookieOptions: {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
  },
};
```

Store user's language preference in cookie for persistence across visits.

## Validation Messages

Form validation messages are localized:

```typescript
// Vietnamese
form: {
  required: "Trường này là bắt buộc",
  invalidEmail: "Email không hợp lệ",
  invalidPhone: "Số điện thoại không hợp lệ",
}

// English
form: {
  required: "This field is required",
  invalidEmail: "Invalid email address",
  invalidPhone: "Invalid phone number",
}
```

**Usage with React Hook Form + Zod:**
```typescript
const dict = getDictionary(lang);

const schema = z.object({
  email: z.string().email(dict.form.invalidEmail),
  name: z.string().min(1, dict.form.required),
});
```

## Dynamic Content Patterns

### With Template Variables

If you need dynamic values in translations:

```typescript
// Dictionary
minLength: "Tối thiểu {min} ký tự"

// Usage
const message = dict.form.minLength.replace("{min}", "5");
```

### Arrays in Translations

For lists (like about page commitments):

```typescript
commitment: {
  title: "Cam kết của chúng tôi",
  items: [
    "An toàn tuyệt đối",
    "Trực tiếp sản xuất",
    "Xưởng hiện đại",
    // ...
  ]
}

// Usage
<ul>
  {dict.about.commitment.items.map((item, i) => (
    <li key={i}>{item}</li>
  ))}
</ul>
```

## Type Safety

**Dictionary types:** `src/lib/i18n/types.ts`

Define type for dictionary structure:

```typescript
export type DictionaryForLocale = Record<Locale, Dictionary>;

export interface Dictionary {
  nav: NavDictionary;
  common: CommonDictionary;
  form: FormDictionary;
  // ... other sections
}
```

This ensures:
- Autocomplete in IDE
- Type checking for translations
- Compile-time errors for missing translations

## Best Practices

1. **Keep dictionaries in sync:** Both languages should have identical structure
2. **Use keys, not content:** `dict.products.title`, not hardcoded strings
3. **Server-first:** Get dictionary in server components, pass to client
4. **Database content:** Use `MultilingualText` for all user-facing content
5. **Admin panel:** No i18n needed - always English
6. **URL structure:** Always include language prefix in public routes
7. **SEO:** Provide alternate language links in metadata
8. **Fallback:** Default to Vietnamese if language not found

## Adding New Translations

1. Add key to both `vi` and `en` in `dictionaries.ts`
2. Maintain same structure in both languages
3. Use nested objects for organization
4. Update types in `types.ts` if needed
5. Test both languages

## Common Pitfalls

- ❌ Using i18n in admin routes
- ❌ Hardcoding text instead of using dictionary
- ❌ Forgetting to translate database content
- ❌ Missing language in one dictionary
- ❌ Not passing translations to client components
- ✅ Use server components for dictionary access
- ✅ Pass only needed translations to client
- ✅ Use `MultilingualText` for database content
- ✅ Keep dictionaries synchronized
