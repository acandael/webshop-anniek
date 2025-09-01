# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a Next.js e-commerce application built with Crystallize headless CMS for "webshop-anniek" (Anniek Lambrecht | Skincenter). It's a beauty/skincare webshop with Belgian localization (Dutch).

## Essential Commands

### Development
```bash
npm run dev              # Start development server on http://localhost:3000
npm run dev:vercel       # Start with Vercel dev environment
npm run dev:inspect      # Start with Node.js inspector enabled
```

### Production
```bash
npm run build            # Build production bundle
npm run start            # Start production server
npm run prod             # Build and start production (npm run build && npm run start)
```

### Code Quality
```bash
npm run lint             # Run ESLint
npm run validate         # Run lint-staged (used by pre-commit hook)
```

### Utilities
```bash
npm run repo:cleanup-payment-providers    # Clean up payment provider configurations
```

## Architecture Overview

### Key Technologies
- **Framework**: Next.js 12 with SSR/SSG
- **Styling**: Styled Components + Chakra UI + Emotion
- **CMS**: Crystallize (headless e-commerce/PIM)
- **State Management**: React Query for data fetching, React Context for basket
- **Payment**: Stripe, Mollie, Klarna, Vipps integrations
- **i18n**: Next.js i18n with Dutch as primary language

### Directory Structure
- `src/pages/` - Next.js pages and API routes
- `src/page-components/` - Page-specific components (mirrors pages structure)
- `src/components/` - Reusable UI components
- `src/lib/` - Client-side utilities (GraphQL, search, auth, etc.)
- `src/lib-api/` - Server-side utilities for API routes
- `src/ui/` - Basic UI components and styling

### Dynamic Routing Strategy
The main content routing happens through `src/pages/[...catalogue].js` which:
1. Queries Crystallize to determine content type
2. Maps Crystallize shapes to specific page components:
   - `Webshop` → WebshopPage
   - `Merk` → BrandPage
   - `Lijn` → ProductLinePage
   - `Categorie` → CategoryPage
   - `Behandelingen` → BehandelingenPage
   - `Behandeling` → BehandelingPage
   - `BrandArticle` → BrandArticlePage
   - `Merken` → MerkenPage
   - `Kadobonnen` → KadobonnenPage
3. Falls back to generic folder/document/product renderers

### Data Fetching Patterns
- Each page component exports a `getData` function used by `getStaticProps`
- GraphQL queries are centralized in `src/lib/graph/`
- Search functionality uses `src/lib/search.js` with URL-based specifications

### Custom Content Types
This project has several custom Crystallize shapes:
- **Behandeling** (Treatment): Beauty treatments
- **Merk** (Brand): Product brands
- **Lijn** (Line): Product lines
- **Kadobonnen** (Gift certificates)

### Basket/Cart Implementation
- Located in `src/components/basket/`
- Uses React Context with reducer pattern
- Includes product variant extension and shared channel communication
- Integrates with multiple payment providers

### Configuration
- `app.config.json`: Locale and payment provider configuration
- `next.config.js`: Next.js configuration with Dutch as default locale
- Environment variables needed for Crystallize tenant and payment providers

### Styling Approach
- Styled Components as primary styling solution
- Chakra UI for specific components
- Component-specific styles in `/styles.js` files
- Global styles in `src/ui/global`

### Search & Filtering
- Advanced search with faceting support
- Price range filtering
- Category and brand filtering
- Results pagination
- URL-based search state management