# Flow Hub - Loan Management System (LMS)

A multi-tenant loan management system built with Next.js that supports multiple companies with customizable themes, branding, and internationalization.

## 🏗️ Architecture Overview

Flow Hub is designed as a multi-tenant application where different companies can have their own:
- **Custom branding** (logos, colors, company names)
- **Custom themes** (color schemes for light/dark modes)
- **Localized content** (English, French, Spanish)
- **Dynamic sidebar navigation** (configured via API responses)
- **Company-specific configurations**

### Key Features

- ✅ **Multi-tenant Architecture** - Single codebase serving multiple companies
- ✅ **Dynamic Theming** - Company-specific colors and branding
- ✅ **Internationalization** - Support for EN/FR/ES with react-i18next
- ✅ **Dynamic Sidebar** - Menu structure driven by API responses
- ✅ **Responsive Design** - Built with Tailwind CSS and shadcn/ui
- ✅ **Type Safety** - Full TypeScript implementation
- ✅ **Docker Support** - Containerized deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (optional)

### Local Development

1. **Clone the repository**
```bash
git clone <repository-url>
cd flow-hub
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Create .env.local file
cp .env.example .env.local
```

Add the following environment variables:
```env
# Theme Configuration (optional - defaults to 'default')
NEXT_PUBLIC_THEME=default

# API Configuration (optional - uses mock data in development)
NEXT_PUBLIC_API_BASE_URL=https://api.flowhub.example.com

# Analytics (optional)
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

4. **Start the development server**
```bash
npm run dev
```

5. **Open your browser**
```
http://localhost:3000
```

The application will automatically redirect to:
```
http://localhost:3000/en/default/dashboard
```

### Docker Development

1. **Build the Docker image**
```bash
docker build -t flow-hub .
```

2. **Run the container**
```bash
docker run -p 3000:3000 -e NEXT_PUBLIC_THEME=default flow-hub
```

### Docker Compose (Recommended)

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  flow-hub:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_THEME=default
      - NEXT_PUBLIC_API_BASE_URL=https://api.flowhub.example.com
    volumes:
      - ./public/brands:/app/public/brands
```

Run with:
```bash
docker-compose up
```

## 🎨 Theme Configuration

### Available Themes

- `default` - Flow Hub Inc. (neutral colors)
- `companyA` - Company A Inc. (blue theme)
- `companyB` - Company B Inc. (orange theme)

### Creating a New Theme

1. **Add company assets**
```
public/brands/companyC/
├── companyC.svg          # Company logo
├── companyC-og-image.jpg # Open Graph image
└── favicon.ico           # Company favicon
```

2. **Create theme configuration**
```typescript
// config/themes/companyC.ts
import { ThemeConfig } from "./types"
import { defaultTheme } from "./default"

export const companyCTheme: ThemeConfig = {
  ...defaultTheme,
  id: "companyC",
  name: "Company C Theme",
  company: "Company C Inc.",
  colors: {
    light: {
      ...defaultTheme.colors.light,
      primary: "oklch(0.5 0.2 120)", // Green theme
      // ... customize other colors
    },
    dark: {
      // ... dark mode colors
    }
  }
}
```

3. **Register the theme**
```typescript
// config/themes/index.ts
import { companyCTheme } from "./companyC"

export const themes: Record<string, ThemeConfig> = {
  default: defaultTheme,
  companyA: companyATheme,
  companyB: companyBTheme,
  companyC: companyCTheme, // Add your theme
}
```

4. **Add site configuration**
```typescript
// config/site.ts
export const companySiteConfigs: Record<string, Partial<SiteConfig>> = {
  // ... existing configs
  companyC: {
    name: "Company C",
    description: "Loan Management System for Company C",
    company: {
      name: "Company C Inc.",
      logo: "/brands/companyC/companyC.svg",
      favicon: "/favicon.ico"
    },
    // ... other config options
  }
}
```

5. **Update valid clients**
```typescript
// config/index.ts
export const validClients = ['default', 'companyA', 'companyB', 'companyC'];
```

### Switching Themes

**Development:**
```bash
NEXT_PUBLIC_THEME=companyA npm run dev
```

**Production:**
```bash
NEXT_PUBLIC_THEME=companyA npm run build
npm start
```

**Docker:**
```bash
docker run -p 3000:3000 -e NEXT_PUBLIC_THEME=companyA flow-hub
```

## 🌐 Internationalization

### Supported Languages

- 🇨🇦 **English (en)** - Default
- 🇨🇦 **French (fr)** - Canadian French
- 🇪🇸 **Spanish (es)** - Spanish

### Adding Translations

1. **Add translations to JSON files**
```json
// public/locales/en/en.json
{
  "common": {
    "sidebar": {
      "newCategory": {
        "title": "New Category",
        "subcategory": "Subcategory"
      }
    }
  }
}
```

2. **Use in components**
```typescript
import { useTranslationHelper } from '@/hooks/use-translation-helper'

function MyComponent() {
  const { t } = useTranslationHelper()
  
  return (
    <h1>{t('common.sidebar.newCategory.title')}</h1>
  )
}
```

### Language Switching

The application automatically detects language from the URL:
- `/en/default/dashboard` - English
- `/fr/default/dashboard` - French  
- `/es/default/dashboard` - Spanish

## 📁 Project Structure

```
flow-hub/
├── app/                          # Next.js App Router
│   ├── [lang]/                   # Language-based routing
│   │   ├── [client]/             # Client-specific routing
│   │   │   ├── dashboard/        # Dashboard pages
│   │   │   ├── tenants-management/
│   │   │   ├── loan-management/
│   │   │   └── layout.tsx
│   │   └── layout.tsx
│   ├── globals.css               # Global styles
│   └── layout.tsx
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui components
│   ├── layout/                   # Layout components
│   │   └── sidebar/              # Sidebar components
│   └── i18n/                     # Internationalization components
├── config/                       # Configuration files
│   ├── themes/                   # Theme configurations
│   │   ├── default.ts
│   │   ├── companyA.ts
│   │   └── companyB.ts
│   └── site.ts                   # Site configurations
├── lib/                          # Utility libraries
│   ├── i18n/                     # i18n configuration
│   └── utils.ts
├── public/                       # Static assets
│   ├── brands/                   # Company-specific assets
│   │   ├── default/
│   │   ├── companyA/
│   │   └── companyB/
│   └── locales/                  # Translation files
├── providers/                    # React Context providers
├── services/                     # API services
├── types/                        # TypeScript type definitions
└── hooks/                        # Custom React hooks
```

## 🔧 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_THEME` | Active theme ID | `default` | No |
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL | - | No |
| `NEXT_PUBLIC_APP_URL` | Application URL | `http://localhost:3000` | No |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | Enable analytics | `false` | No |

## 🚢 Production Deployment

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Docker Production Build

```bash
# Build production image
docker build -t flow-hub:latest .

# Run in production mode
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_THEME=companyA \
  -e NODE_ENV=production \
  flow-hub:latest
```

### Multi-Company Deployment

You can deploy the same codebase for different companies:

```bash
# Company A deployment
docker run -p 3001:3000 -e NEXT_PUBLIC_THEME=companyA flow-hub

# Company B deployment  
docker run -p 3002:3000 -e NEXT_PUBLIC_THEME=companyB flow-hub
```

## 🧪 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📚 API Integration

The sidebar navigation is driven by API responses. In development, mock data is used from `data/mock.json`.

### Sidebar API Response Format

```json
{
  "dashboard": {
    "name": "Dashboard",
    "description": "Overview of system performance",
    "icon": "BsFillHouseFill",
    "url": "/dashboard"
  },
  "category-with-submenu": {
    "name": "Category Name",
    "description": "Category description",
    "icon": "BsPeopleFill",
    "sub-menu": [
      {
        "name": "Subcategory",
        "url": "/category/subcategory",
        "icon": "BsEyeFill"
      }
    ]
  }
}
```

### User Permissions API

The system supports role-based permissions for menu items:

```json
{
  "dashboard": true,
  "tenants-management": true,
  "loan-management": false
}
```