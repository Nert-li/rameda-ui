# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
bun run dev

# Build the project
bun run build

# Lint the codebase
bun run lint

# Preview production build
bun run preview

# Generate OpenAPI types from schema
bun run api

# Bundle analysis
bun run bundle:analyze
bun run bundle:audit
```

**Note**: No test runner is configured - MSW is set up for API mocking but no test commands are available in package.json.

## Project Architecture

This is a React 19 + TypeScript + Vite application built with Feature-Sliced Design (FSD) architecture using Bun as the package manager.

### Tech Stack
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS 4.x
- **UI Components**: Radix UI primitives with shadcn/ui
- **State Management**: Zustand for global state, TanStack Query for server state
- **Routing**: React Router v7
- **Forms**: React Hook Form with Zod validation
- **API**: OpenAPI-first approach with generated types
- **Testing**: MSW for API mocking

### Architecture Pattern

The project follows Feature-Sliced Design (FSD) with clear separation of concerns:

**`src/app/`** - Application initialization and routing
- `router.tsx` - Main routing configuration with lazy loading and role-based protection
- `providers.tsx` - Global providers (Theme, Query Client, etc.)
- `protected-route.tsx` - Authentication guards

**`src/features/`** - Business logic features (auth, dashboard, offers, etc.)
- Each feature has its own directory with `/model/`, `/ui/`, and `index.ts`
- Features are independent and communicate through shared APIs

**`src/shared/`** - Shared resources across features
- `api/` - OpenAPI schema and generated types, reusable API hooks
- `ui/` - Shared UI components (data-grid, kit components)
- `model/` - Shared business logic, routes, user management
- `lib/` - Utility functions and React hooks

### ESLint Boundaries Configuration

The project enforces architectural boundaries using `eslint-plugin-boundaries`:
- **Shared** layer cannot import from **Features** or **App** layers
- **Features** layer cannot import from **App** layer
- Features must be imported through public API (`index.ts` or `*.page.tsx`)
- This ensures proper layer separation and prevents circular dependencies

### Key Components

**DataGrid** (`src/shared/ui/data-grid/`)
- Unified component supporting both table and card views
- Server-side pagination and filtering
- Built on TanStack Table with customizable columns
- Includes sorting, column visibility, and loading states

**API Layer** (`src/shared/api/`)
- OpenAPI schema-first approach with generated TypeScript types
- Centralized API hooks using factory pattern (`createCrudHooks`)
- TanStack Query for caching and synchronization
- MSW integration for development and testing

**Authentication & Authorization**
- JWT-based authentication with role-based access control
- Protected routes with automatic redirects
- User roles: admin, manager, user
- Route-level and component-level protection

### Data Flow

1. OpenAPI schema definitions in `src/shared/api/schema/`
2. Generated types via `bun run api` command
3. Typed API hooks using `createCrudHooks` factory
4. Features consume API hooks for data fetching
5. UI components render with proper loading/error states

### Development Patterns

- Use `createCrudHooks` for standard CRUD operations
- Implement server-side pagination with DataGrid
- Follow FSD architecture for new features
- Use role-based route protection for sensitive pages
- Maintain OpenAPI schema synchronization with backend

### Column Definitions Pattern

Features using DataGrid follow a consistent pattern:
```typescript
// src/features/[feature]/ui/columns.tsx
export const getColumns = (
    onSort: SortFunction,
    sortingState: SortingState,
    callbacks?: ColumnCallbacks
): ColumnDef<EntityType>[] => [
    // Column definitions with SortableHeader for server-side sorting
    // Actions column with entity-specific operations
];
```

### shadcn/ui Configuration

The project uses shadcn/ui with custom aliases:
- `@/shared/ui` for components
- `@/shared/ui/kit` for UI primitives
- `@/shared/lib/css` for utilities
- New York style with neutral base color and CSS variables

### File Naming Conventions

- Features: `feature-name.page.tsx` for pages
- Components: `component-name.tsx` (kebab-case)
- Hooks: `use-hook-name.ts`
- Types: co-located with implementation or in schema