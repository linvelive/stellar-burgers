# Stellar Burgers - Project Structure

## 📋 Overview

**Stellar Burgers** is a React-based web application for creating custom burgers. The project uses TypeScript, Redux Toolkit for state management, React Router for navigation, and includes authentication and protected routes.

## 🏗️ Architecture

```
stellar-burgers/
├── 📁 public/                      # Static assets
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
│
├── 📁 src/                         # Source code
│   ├── index.tsx                   # Application entry point
│   ├── index.css                   # Global styles
│   ├── styles.d.ts                 # CSS modules type definitions
│   ├── svg.d.ts                    # SVG type definitions
│   │
│   ├── 📁 components/              # React components
│   │   ├── index.ts                # Components barrel export
│   │   │
│   │   ├── 📁 app/                 # Main App component
│   │   │   ├── app.tsx
│   │   │   └── app.module.css
│   │   │
│   │   ├── 📁 app-header/          # Application header
│   │   │   ├── app-header.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── 📁 burger-constructor/  # Burger builder component
│   │   │   ├── burger-constructor.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── 📁 burger-constructor-element/  # Individual constructor item
│   │   │   ├── burger-constructor-element.tsx
│   │   │   ├── index.ts
│   │   │   └── type.ts
│   │   │
│   │   ├── 📁 burger-ingredient/   # Ingredient card component
│   │   │   ├── burger-ingredient.tsx
│   │   │   ├── index.ts
│   │   │   └── type.ts
│   │   │
│   │   ├── 📁 burger-ingredients/  # Ingredients list container
│   │   │   ├── burger-ingredients.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── 📁 feed-info/           # Feed information display
│   │   │   ├── feed-info.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── 📁 ingredient-details/  # Ingredient details modal
│   │   │   ├── ingredient-details.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── 📁 ingredients-category/ # Ingredient category section
│   │   │   ├── ingredients-category.tsx
│   │   │   ├── index.ts
│   │   │   └── type.ts
│   │   │
│   │   ├── 📁 modal/               # Modal component
│   │   │   ├── modal.tsx
│   │   │   ├── index.ts
│   │   │   └── type.ts
│   │   │
│   │   ├── 📁 order-card/          # Order card component
│   │   │   ├── order-card.tsx
│   │   │   ├── index.ts
│   │   │   └── type.ts
│   │   │
│   │   ├── 📁 order-info/          # Order information display
│   │   │   ├── order-info.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── 📁 order-status/        # Order status component
│   │   │   ├── order-status.tsx
│   │   │   ├── index.ts
│   │   │   └── type.ts
│   │   │
│   │   ├── 📁 orders-list/         # Orders list container
│   │   │   ├── orders-list.tsx
│   │   │   ├── index.ts
│   │   │   └── type.ts
│   │   │
│   │   ├── 📁 profile-menu/        # Profile navigation menu
│   │   │   ├── profile-menu.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── 📁 protected-route/     # Route protection HOC
│   │   │   └── protected-route.tsx
│   │   │
│   │   └── 📁 ui/                  # UI library components
│   │       ├── index.ts
│   │       ├── 📁 app-header/
│   │       ├── 📁 burger-constructor/
│   │       ├── 📁 burger-constructor-element/
│   │       ├── 📁 burger-ingredient/
│   │       ├── 📁 burger-ingredients/
│   │       ├── 📁 feed-info/
│   │       ├── 📁 ingredient-details/
│   │       ├── 📁 ingredients-category/
│   │       ├── 📁 modal/
│   │       ├── 📁 modal-overlay/
│   │       ├── 📁 order-card/
│   │       ├── 📁 order-details/
│   │       ├── 📁 order-info/
│   │       ├── 📁 order-status/
│   │       ├── 📁 orders-list/
│   │       ├── 📁 preloader/
│   │       ├── 📁 profile-menu/
│   │       └── 📁 pages/           # UI page components
│   │           ├── common-type.ts
│   │           ├── common.module.css
│   │           ├── index.ts
│   │           ├── 📁 constructor-page/
│   │           ├── 📁 feed/
│   │           ├── 📁 forgot-password/
│   │           ├── 📁 login/
│   │           ├── 📁 profile/
│   │           ├── 📁 profile-orders/
│   │           ├── 📁 register/
│   │           └── 📁 reset-password/
│   │
│   ├── 📁 pages/                   # Page components
│   │   ├── index.ts
│   │   ├── 📁 constructor-page/    # Main burger constructor page
│   │   ├── 📁 feed/                # Orders feed page
│   │   ├── 📁 forgot-password/     # Password recovery page
│   │   ├── 📁 login/               # Login page
│   │   ├── 📁 not-fount-404/       # 404 error page
│   │   ├── 📁 profile/             # User profile page
│   │   ├── 📁 profile-orders/      # User orders history page
│   │   ├── 📁 register/            # Registration page
│   │   └── 📁 reset-password/      # Password reset page
│   │
│   ├── 📁 services/                # Redux store and slices
│   │   └── store.ts                # Redux store configuration
│   │
│   ├── 📁 utils/                   # Utility functions
│   │   ├── burger-api.ts           # API endpoints and requests
│   │   ├── cookie.ts               # Cookie management utilities
│   │   └── types.ts                # Shared TypeScript types
│   │
│   ├── 📁 images/                  # Image assets
│   │
│   └── 📁 stories/                 # Storybook stories
│
├── 📁 .storybook/                  # Storybook configuration
│
├── 📄 Configuration Files
│   ├── .babelrc                    # Babel configuration
│   ├── .editorconfig               # Editor configuration
│   ├── .env.example                # Environment variables template
│   ├── .eslintrc                   # ESLint configuration
│   ├── .gitignore                  # Git ignore rules
│   ├── .prettierrc                 # Prettier configuration
│   ├── package.json                # Project dependencies and scripts
│   ├── tsconfig.json               # TypeScript configuration
│   └── webpack.config.js           # Webpack configuration
│
└── 📄 README.md                    # Project documentation
```

## 🔧 Technology Stack

### Core Technologies
- **React 18.2.0** - UI library
- **TypeScript 5.3.3** - Type-safe JavaScript
- **Redux Toolkit 2.0.1** - State management
- **React Router DOM 6.10.0** - Client-side routing
- **React Redux 9.1.0** - React bindings for Redux

### Build Tools
- **Webpack 5.89.0** - Module bundler
- **Babel 7.23.6** - JavaScript compiler
- **TypeScript Compiler** - Type checking

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Storybook 7.6.10** - Component development environment
- **Jest 29.7.0** - Testing framework
- **Cypress 13.6.1** - E2E testing

### UI Components
- **@zlden/react-developer-burger-ui-components** - Custom UI component library

## 📂 Key Directories Explained

### `/src/components`
Contains all React components organized by feature. Each component typically has:
- Main component file (`.tsx`)
- Type definitions (`type.ts`)
- Index file for exports (`index.ts`)
- CSS modules (`.module.css`)

### `/src/components/ui`
UI library components - reusable, presentational components with their own styling and types. These are the building blocks used throughout the application.

### `/src/pages`
Page-level components that represent different routes in the application:
- **constructor-page** - Main burger building interface
- **feed** - Public orders feed
- **login/register** - Authentication pages
- **profile** - User profile management
- **profile-orders** - User's order history
- **forgot-password/reset-password** - Password recovery flow

### `/src/services`
Redux store configuration and state management logic. Contains:
- Store setup
- Slices/reducers
- Async thunks
- Selectors

### `/src/utils`
Utility functions and shared code:
- **burger-api.ts** - API client for backend communication
- **cookie.ts** - Cookie management for authentication
- **types.ts** - Shared TypeScript interfaces and types

## 🔐 Authentication Flow

The application implements protected routes using the [`protected-route`](src/components/protected-route/protected-route.tsx) component:
- Public routes: login, register, forgot-password, reset-password
- Protected routes: profile, profile-orders
- Authentication state managed via Redux
- Token storage using cookies

## 🎨 Styling Approach

- **CSS Modules** - Scoped component styles
- **Global styles** - [`index.css`](src/index.css)
- **UI component library** - Pre-built styled components

## 🚀 Available Scripts

```bash
npm start              # Start development server
npm run lint           # Run ESLint
npm run lint:fix       # Fix ESLint errors
npm run format         # Format code with Prettier
npm run storybook      # Start Storybook
npm run build-storybook # Build Storybook
```

## 🌐 API Integration

API endpoints are defined in [`utils/burger-api.ts`](src/utils/burger-api.ts). The application communicates with a backend API for:
- Fetching ingredients
- Creating orders
- User authentication (login, register, logout)
- User profile management
- Order history

**Environment Variable Required:**
```
BURGER_API_URL=<API_URL>
```
(See [`.env.example`](.env.example) for reference)

## 📱 Application Features

1. **Burger Constructor** - Drag-and-drop interface for building custom burgers
2. **Ingredients Catalog** - Browse available ingredients by category
3. **Order Management** - Create and track orders
4. **User Authentication** - Register, login, and manage profile
5. **Orders Feed** - View all orders in real-time
6. **Order History** - Personal order history for authenticated users
7. **Protected Routes** - Secure pages requiring authentication

## 🧩 Component Architecture

### Container/Presentational Pattern
- **Container components** (in `/src/components`) - Handle logic and state
- **Presentational components** (in `/src/components/ui`) - Handle rendering

### Component Structure
Each feature component typically includes:
```
component-name/
├── component-name.tsx      # Main component logic
├── component-name.module.css # Component styles
├── type.ts                 # TypeScript interfaces
└── index.ts                # Barrel export
```

## 🔄 State Management

Redux Toolkit is used for global state management:
- **Store** - Centralized application state
- **Slices** - Feature-based state modules
- **Thunks** - Async actions for API calls
- **Selectors** - State access patterns

## 📝 Type Safety

TypeScript is used throughout the project:
- Component props interfaces
- API response types
- Redux state types
- Utility function types

## 🎯 Project Goals

Based on the README, this is a learning project (Sprint 11) focusing on:
1. Setting up routing with React Router
2. Implementing Redux for state management
3. Creating API integration with server
4. Building authentication and protected routes

---

**Last Updated:** December 2025
**Project Version:** 0.1.0
