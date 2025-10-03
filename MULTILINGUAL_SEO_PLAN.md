# Multilingual SEO Strategy Plan
## Nghiệp Hưng Website - English & Vietnamese Support

### Current State Analysis

**Existing Structure:**
- Current site is Vietnamese-only with hardcoded Vietnamese content
- Uses `MultilingualText` interface for database storage
- Main pages: Home, About, Products, Services, Projects, Contact, Privacy Policy
- Products, Services, Projects, Contact pages read content from database

**Current Issues:**
- Root layout hardcoded to `lang="vi"`
- Metadata only in Vietnamese
- No language switching mechanism
- No hreflang implementation
- No URL structure for different languages

---

## 1. URL Structure Strategy

### Subdirectory Approach
```
/ (redirect to browser language or default to Vietnamese)
/vi/ (Vietnamese)
/vi/about
/vi/products
/vi/services
/vi/projects
/vi/contact
/vi/privacy-policy
/en/ (English)
/en/about
/en/products
/en/services
/en/projects
/en/contact
/en/privacy-policy
```

**Recommendation: Subdirectory Approach**
- Easier to implement with Next.js App Router
- Better for SEO (consolidates domain authority)
- Simpler analytics tracking
- More cost-effective (single domain)
- Both Vietnamese and English have dedicated subdirectories
- Root `/` redirects to browser language preference or defaults to Vietnamese

---

## 2. Technical Implementation Plan

### 2.1 Next.js Internationalization Setup

**File Structure:**
```
src/
├── app/
│   ├── (main)/
│   │   ├── [lang]/
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── products/
│   │   │   ├── services/
│   │   │   ├── projects/
│   │   │   ├── privacy-policy/
│   │   │   └── page.tsx
│   │   └── layout.tsx (redirect to /vi)
├── lib/
│   ├── i18n/
│   │   ├── config.ts
│   │   ├── dictionaries.ts
│   │   └── types.ts
└── middleware.ts
```

**Key Components:**
1. **middleware.ts** - Language detection and routing
2. **i18n/config.ts** - Language configuration
3. **dictionaries.ts** - Translation management (separate objects for English and Vietnamese)
4. **Dynamic routing** - `[lang]` parameter handling with static params generation

### 2.2 Language Configuration

**Supported Languages:**
- `vi` (Vietnamese) - Default
- `en` (English)

**Language Detection Priority:**
1. URL parameter (`/en/`, `/vi/`)
2. Accept-Language header (if landing on `/`)
3. Default to Vietnamese

---

## 3. SEO Implementation Strategy

### 3.1 Metadata & Structured Data

**Per-Language Metadata:**
```typescript
// Vietnamese (default)
export const metadata: Metadata = {
  title: "Công ty TNHH Nghiệp Hưng - Hệ thống ống gió chuyên nghiệp",
  description: "Chuyên sản xuất và thi công hệ thống ống gió chất lượng cao...",
  keywords: "ống gió, hệ thống thông gió, công nghiệp, dân dụng",
  openGraph: {
    title: "Công ty TNHH Nghiệp Hưng",
    description: "Hệ thống ống gió chuyên nghiệp",
    locale: "vi_VN",
  },
  alternates: {
    canonical: "https://nghiephung.com/vi",
    languages: {
      "vi": "https://nghiephung.com/vi",
      "en": "https://nghiephung.com/en",
    },
  },
}

// English
export const metadata: Metadata = {
  title: "Nghiep Hung Co., Ltd - Professional Ductwork Systems",
  description: "Specialized in manufacturing and installing high-quality ductwork systems...",
  keywords: "ductwork, ventilation systems, industrial, residential",
  openGraph: {
    title: "Nghiep Hung Co., Ltd",
    description: "Professional Ductwork Systems",
    locale: "en_US",
  },
  alternates: {
    canonical: "https://nghiephung.com/en",
    languages: {
      "vi": "https://nghiephung.com/vi",
      "en": "https://nghiephung.com/en",
    },
  },
}
```

### 3.2 Hreflang Implementation

**HTML Head Tags:**
```html
<link rel="alternate" hreflang="vi" href="https://nghiephung.com/vi" />
<link rel="alternate" hreflang="en" href="https://nghiephung.com/en" />
<link rel="alternate" hreflang="x-default" href="https://nghiephung.com/vi" />
```

**Page-Level Hreflang:**
```html
<!-- For /about page -->
<link rel="alternate" hreflang="vi" href="https://nghiephung.com/vi/about" />
<link rel="alternate" hreflang="en" href="https://nghiephung.com/en/about" />
```

### 3.3 URL Structure & Redirects

**URL Mapping:**
- `/` → `/vi/` or `/en/` (redirect based on browser language)
- `/about` → `/vi/about` (redirect)
- `/products` → `/vi/products` (redirect)
- etc.

**Redirect Rules:**
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Redirect root to browser language or default to Vietnamese
  if (pathname === '/') {
    const locale = getLocale(request); // Detects browser language or defaults to 'vi'
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }
  
  // Redirect old URLs to language-specific URLs
  if (!pathname.startsWith('/vi/') && !pathname.startsWith('/en/')) {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }
}
```

**Language Detection Logic:**
- URL-based language detection (primary)
- Cookie-based language preference (secondary)
- Accept-Language header fallback (tertiary)
- Default to Vietnamese if none available

---

## 4. Content Strategy

### 4.1 Translation Management

**Content Categories:**
1. **Static Content** - UI text, navigation, forms
2. **Database Content** - Products, Services, Projects, Contact info
3. **SEO Content** - Meta descriptions, titles, structured data

**Translation Approach:**
- **Static Content**: JSON dictionaries with separate objects for English and Vietnamese
- **Database Content**: Utilize existing `MultilingualText` interface of the database document type
- **SEO Content**: Separate metadata files per language


### 4.2 Content Localization Strategy

**Vietnamese Content (Primary):**
- Keep existing Vietnamese content as-is
- Maintain current tone and style
- Focus on local market terminology

**English Content (Secondary):**
- Professional, technical tone
- International business terminology
- Clear, concise descriptions
- Industry-standard keywords

---

## 5. Technical SEO Features

### 5.1 Language Switching

**Implementation:**
- Language toggle in header

**UI Components:**
```typescript
// Language switcher component
export function LanguageSwitcher({ 
  currentLang, 
  currentPath 
}: { 
  currentLang: string;
  currentPath: string;
}) {
  // Remove current language prefix and add target language
  const pathWithoutLang = currentPath.replace(/^\/[a-z]{2}/, '');
  
  return (
    <div className="flex items-center space-x-2">
      <Link 
        href={`/vi${pathWithoutLang}`} 
        className={currentLang === 'vi' ? 'font-bold' : ''}
      >
        VI
      </Link>
      <span>|</span>
      <Link 
        href={`/en${pathWithoutLang}`} 
        className={currentLang === 'en' ? 'font-bold' : ''}
      >
        EN
      </Link>
    </div>
  );
}
```

### 5.2 Sitemap Generation

**Dynamic Sitemap:**
```typescript
// app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nghiephung.com';
  const languages = ['vi', 'en'];
  const pages = ['', '/about', '/products', '/services', '/projects', '/contact', '/privacy-policy'];
  
  return pages.flatMap(page => 
    languages.map(lang => ({
      url: `${baseUrl}/${lang}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1 : 0.8,
      alternates: {
        languages: {
          vi: `${baseUrl}/vi${page}`,
          en: `${baseUrl}/en${page}`,
        },
      },
    }))
  );
}
```

### 5.3 Robots.txt

**Multi-language Robots:**
```txt
User-agent: *
Allow: /

# Language-specific sitemaps
Sitemap: https://nghiephung.com/sitemap.xml
Sitemap: https://nghiephung.com/sitemap-vi.xml
Sitemap: https://nghiephung.com/sitemap-en.xml
```

---

## 6. Performance Considerations

### 6.1 Bundle Optimization

**Code Splitting:**
- Separate bundles for each language
- Lazy load translations
- Tree-shake unused translations

**Static Params Generation:**
```typescript
// app/(main)/[lang]/page.tsx
export async function generateStaticParams() {
  return [
    { lang: 'vi' },
    { lang: 'en' },
  ];
}
```

**Caching Strategy:**
- Cache translations separately
- Use CDN for static assets
- Implement proper cache headers

### 6.2 Loading Performance

**Implementation:**
- Preload critical translations
- Use Suspense for language switching
- Implement loading states
- Optimize font loading per language

