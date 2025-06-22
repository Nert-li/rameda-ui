# Rameda UI - Project Overview

## 🚀 Tech Stack
- **Frontend**: React 19 + TypeScript + Vite
- **UI**: shadcn/ui + Radix UI + Tailwind CSS 4.1
- **Routing**: React Router DOM 7.5
- **API**: OpenAPI-first with auto-generated types
- **State**: React Query + Zustand (create-gstore)
- **Auth**: JWT with auto-refresh  
- **Mocking**: MSW (Mock Service Worker)
- **Architecture**: Feature-Sliced Design
- **Utils**: Debounced hooks, layout composition

## 📁 Project Structure

```
src/
├── app/                    # Application layer
│   ├── main.tsx           # Entry point + MSW init
│   ├── router.tsx         # Routes with lazy loading
│   └── providers.tsx      # React Query provider
├── shared/                # Shared resources
│   ├── api/              # API layer
│   │   ├── schema/       # OpenAPI YAML files
│   │   ├── mocks/        # MSW handlers
│   │   └── instance.ts   # API clients
│   ├── ui/kit/           # shadcn/ui components
│   ├── lib/              # Utilities
│   └── model/            # Session, config, routes
└── features/             # Business logic
    ├── auth/             # Login/Register
    ├── boards-list/      # Boards with filters
    ├── board/            # Single board
    └── header/           # App header
```

## 🔧 API Schema Generation

### YAML Structure
```
src/shared/api/schema/
├── main.yaml            # Main OpenAPI spec
├── endpoints/           # Route definitions
│   ├── auth.yaml       # Auth endpoints + schemas
│   └── boards.yaml     # Board endpoints + schemas
└── shared/
    └── responses.yaml   # Common error responses
```

### Generation Command
```bash
npm run api  # Generates src/shared/api/schema/generated.ts
```

### Key Features
- **Combined Schema**: Each endpoint file contains both schemas and routes
- **Auto-types**: TypeScript types generated from OpenAPI spec
- **Type-safe API**: `openapi-fetch` + `openapi-react-query` for full type safety
- **Dual Clients**: Regular + public (non-auth) API clients

### Important Notes
- **YAML Structure**: Schemas defined at top level in each endpoint file
- **References**: Use `$ref: '#/schemas/SchemaName'` for internal refs
- **External Refs**: Use `$ref: '../shared/responses.yaml#/ErrorName'` for cross-file refs
- **Auto-Generation**: Run `npm run api` after YAML changes
- **Case Sensitivity**: Component names are lowercase: `accordion` not `Accordion`

## 🎨 shadcn/ui Integration

### Configuration (`components.json`)
```json
{
  "aliases": {
    "components": "@/shared/ui",
    "utils": "@/shared/lib/css", 
    "ui": "@/shared/ui/kit",
    "lib": "@/shared/lib",
    "hooks": "@/shared/lib/react"
  }
}
```

### Available Components
```bash
# Already installed:
button, card, dialog, dropdown-menu, form, input, 
label, scroll-area, select, skeleton, switch, tabs, accordion

# Add new components:
npx shadcn@latest add [component-name]
```

### Component Location & Import
```typescript
// Components stored in:
src/shared/ui/kit/[component].tsx

// Import in features:
import { Button } from "@/shared/ui/kit/button"
import { Card } from "@/shared/ui/kit/card"
```

### CSS Utils
```typescript
// src/shared/lib/css.ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## 🔐 Authentication Flow

### JWT Auto-Refresh
```typescript
// src/shared/model/session.ts
- Token stored in localStorage
- Auto-refresh before expiration
- Logout on refresh failure
- Global state with create-gstore
```

### API Integration
```typescript
// src/shared/api/instance.ts
- Automatic token injection
- Dual clients: auth + public
- Error handling with 401 responses
```

## 🛠 Development Features

### MSW Mocking
```typescript
// src/shared/api/mocks/
- Browser-based mocking  
- Realistic JWT tokens (jose library)
- 3s access token expiry for testing
- Delay simulation
- CRUD operations with persistent state
```

### React Query
```typescript
// Features
- Infinite queries for boards list
- Optimistic updates
- keepPreviousData
- Auto-refetch on focus
```

### Routing
```typescript
// src/app/router.tsx  
- Lazy loading + code splitting
- Protected routes with loader
- Type-safe params (declare module)
- Nested layouts with Outlet
- Auto-redirect to /boards
```

### Environment & Config
```typescript
// Environment variables
- VITE_API_BASE_URL for API endpoint
- Type-safe env with env.d.ts
- Separate config.ts for runtime access
```

## 📊 Key Patterns

### Feature Structure
```
features/[feature]/
├── index.ts          # Public API
├── [feature].page.tsx # Route component
├── model/            # Hooks, stores, filters
├── ui/               # Layout components (responsive)
└── compose/          # Composite components
```

### UI Components Architecture
```typescript
// Layout-based composition
- BoardsListLayout (responsive grid/list)
- Header + Filters + Content separation
- Skeleton loading states
- View mode toggle (cards/list)
- Infinite scroll with IntersectionObserver
```

### API Hooks
```typescript
// Auto-generated from OpenAPI
const { data, isLoading } = rqClient.useQuery("get", "/boards");
const { mutate } = rqClient.useMutation("post", "/boards");
```

### Infinite Scrolling
```typescript
// src/features/boards-list/model/use-boards-list.tsx
- IntersectionObserver
- Automatic pagination
- Cursor-based loading
```

## 🚀 Commands

```bash
npm run dev     # Development server
npm run build   # Production build
npm run api     # Generate API types from YAML
npm run lint    # ESLint
```

## 💡 Architecture Benefits

- **Type Safety**: End-to-end types from API to UI
- **Developer Experience**: Auto-completion, mocking, hot reload
- **Maintainability**: Clear separation of concerns
- **Scalability**: Feature-based organization
- **Performance**: Lazy loading, infinite scroll, optimistic updates 