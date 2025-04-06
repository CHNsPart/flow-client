# **next-seo-dynamic-theme-template**

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## ✨ Author

**Touhidul Islam Chayan**  
[@chnspart](https://github.com/chnspart)  
[LinkedIn](https://linkedin.com/in/chnspart)

---

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

---

## ⚙️ Global Configuration System

### Overview
 
This template includes a comprehensive global configuration system for themes and company-specific settings. This enables easy customization of the application for different companies without code changes—just by modifying environment variables.

### Key Features

- **Company-specific theming**: Each company can have its own colors, fonts, and styling
- **Configurable branding**: Company name, logo, favicon, and site metadata
- **Feature flag management**: Enable/disable features per company
- **Locale management**: Set default language and supported locales

---

### 🔄 How to Use

#### Switching Companies

To switch between different company configurations:

1. Set the `NEXT_PUBLIC_THEME` environment variable to the desired theme ID:
   ```bash
   NEXT_PUBLIC_THEME=default    # Default theme  
   NEXT_PUBLIC_THEME=companyA   # Company A specific theme
   ```

2. The system will automatically apply the corresponding:
   - Theme (colors, styling)
   - Company information (name, logo)
   - Feature flags
   - Metadata (page titles, descriptions)

#### Adding a New Company

To add a new company theme:

1. Create a new theme file in `config/themes/` (e.g., `companyB.ts`)
2. Add company-specific site config in `config/site.ts`
3. Register the new theme in `config/themes/index.ts`

Example for adding Company B:

```ts
// config/themes/companyB.ts
export const companyBTheme: ThemeConfig = {
  id: "companyB",
  name: "Company B Theme",
  company: "Company B Inc.",
  colors: {
    light: {
      primary: "oklch(0.6 0.2 180)", // Custom blue
      // ...other colors
    },
    dark: {
      // Dark mode colors
      // ...
    }
  },
  // ...other theme settings
};

// In config/site.ts
export const companySiteConfigs: Record<string, Partial<SiteConfig>> = {
  // ...existing configs
  companyB: {
    name: "Company B",
    description: "Loan Management System for Company B",
    company: {
      name: "Company B Inc.",
      logo: "/logos/companyB-logo.svg",
      favicon: "/companyB-favicon.ico"
    },
    // ...other settings
  }
};
```

---

### 🗂 Configuration Structure

- `config/themes/`: Theme definitions (colors, styling)
- `config/site.ts`: Site and company configurations
- `providers/theme-provider.tsx`: Theme application mechanism
- `lib/theme-utils.ts`: Helper functions for accessing theme values

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) – learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) – interactive Next.js tutorial.
- [Next.js GitHub](https://github.com/vercel/next.js) – your feedback and contributions are welcome!

---

## ▲ Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---