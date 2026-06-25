# CleverBiz — Electron Desktop App

## Project Overview
CleverBiz is a Smart POS & Business Operations Platform for SME (UMKM) management. This repository is the **frontend Electron desktop client**. The backend API is developed by a separate team.

**Stack:** Electron 31 + React 18 + Redux Toolkit + Tailwind CSS 3 + TypeScript 5 + Vite 5

## Architecture

### Process Model
- **Main Process** (`src/main/`): Electron main thread — window management, IPC handlers, native APIs, SQLite
- **Preload** (`src/preload/`): Context bridge — only specific API methods exposed via `electronAPI`
- **Renderer** (`src/renderer/`): React app — all UI, state, and business logic

### Data Flow
```
Renderer → dispatch(Redux thunk) → electronAPI.invoke() → IPC → Main Handler → SQLite/Backend API
```

### Security Rules
- `nodeIntegration: false` — no Node access in renderer
- `contextIsolation: true` — preload is isolated
- `sandbox: true` — sandboxed renderer
- All IPC handlers validate inputs before acting
- CSP headers configured in `main.ts`

## Code Conventions

### Naming
- **Files**: PascalCase for components (`Sidebar.tsx`), camelCase for utilities/slices (`authSlice.ts`)
- **Functions**: camelCase
- **Types/Interfaces**: PascalCase
- **Constants/Channels**: UPPER_SNAKE_CASE

### Imports Order
1. React / external libs
2. `react-i18next` / `react-redux` hooks
3. Local store hooks (`../store/hooks`)
4. Store slices (`../store/slices/...`)
5. Shared types (`@shared/types`)
6. Local components

### Component Structure
- Functional components with `React.FC` type annotation
- Hooks at top, handlers before render
- Use Tailwind classes for layout, CSS variables for colors (see Design System)

## Design System

### Theme
The app uses **CSS custom properties** for all colors — no hardcoded color values in components.
- Light theme: `:root` / `.theme-light`
- Dark theme: `.theme-dark`
- System mode: `ThemeProvider` resolves via `prefers-color-scheme`

**Do NOT use:**
- Tailwind color classes like `bg-gray-50`, `text-blue-600`
- Hardcoded hex colors

**Use instead:**
- Semantic CSS variables via `style={{}}`:
  - `var(--color-surface)` — page background
  - `var(--color-surface-container-lowest)` — card background
  - `var(--color-on-surface)` — primary text
  - `var(--color-on-surface-variant)` — secondary text
  - `var(--color-outline-variant)` — borders
  - `var(--color-outline)` — low-emphasis text/borders
  - `var(--color-secondary)` — primary button bg
  - `var(--color-error)` — error states
  - `var(--color-tertiary)` — accent/focus
  - `var(--color-success-container)` / `var(--color-success)` — success badges
  - `var(--color-warning-container)` / `var(--color-warning)` — warning badges

### Component Classes (from `globals.css`)
- `.btn-primary` — solid button
- `.btn-secondary` — outlined button
- `.btn-danger` — destructive button
- `.card` — container card
- `.input-field` — text input
- `.sidebar-link`, `.sidebar-link-active`, `.sidebar-link-inactive` — nav links
- `.badge`, `.badge-success`, `.badge-warning`, `.badge-error`, `.badge-info` — status chips
- `.data-table` — table with th/td styling

### Typography Classes
- `text-display-lg` — 32px/600
- `text-headline-md` — 24px/600
- `text-title-sm` — 18px/600
- `text-body-lg` — 16px/400
- `text-body-md` — 14px/400
- `text-body-sm` — 13px/400
- `text-label-md` — 12px/600/0.05em uppercase
- `text-label-sm` — 11px/500

### Spacing Classes
- `gap-gutter` — 16px gap
- `p-space-xs` — 4px
- `p-space-sm` — 8px
- `p-space-md` — 16px
- `p-space-lg` — 24px
- `p-space-xl` — 48px

## Localization

### Setup
Uses `i18next` + `react-i18next` + `i18next-browser-languagedetector`.

### Adding a New Language
1. Create `src/renderer/i18n/locales/{code}.json`
2. Add to `SUPPORTED_LOCALES` in `src/renderer/i18n/index.ts`
3. Add language picker option in `SettingsView.tsx`

### Usage in Components
```tsx
import { useTranslation } from 'react-i18next';

const Component: React.FC = () => {
  const { t } = useTranslation();
  return <h1>{t('section.key')}</h1>;
};
```
- All user-facing strings MUST use `t()` calls
- Key format: `section.descriptiveKey` (dot notation)
- Keys in `en.json` are the source of truth

### Switching Locale
```tsx
import { useAppDispatch } from '../store/hooks';
import { setLocale } from '../store/slices/uiSlice';

dispatch(setLocale('id')); // Also persists to localStorage
```

## Redux Store Structure

| Slice | State |
|---|---|
| `auth` | user, tokens, isAuthenticated, loading, error |
| `products` | items[], loading, error |
| `transactions` | items[], loading, error |
| `employees` | items[], loading, error |
| `dashboard` | summary, health, loading, error |
| `ui` | activeView, sidebarOpen, theme, locale |

### Adding a New Slice
1. Create file in `src/renderer/store/slices/`
2. Add to `reducer` object in `src/renderer/store/index.ts`

## IPC Channels

All channels defined in `src/shared/types.ts` under `IPC_CHANNELS` constant.
Exposed to renderer via `window.electronAPI.*` methods (see `src/preload/preload.ts`).

**Available methods:**
- `getAppVersion()`
- `login()`, `logout()`
- `getProducts()`, `createProduct()`, `updateProduct()`, `deleteProduct()`
- `createTransaction()`, `getTransactions()`
- `generateQRIS()`
- `getEmployees()`, `createEmployee()`
- `getDashboardSummary()`
- `printReceipt()`
- `log()`, `logError()`

When adding a new IPC channel:
1. Add to `IPC_CHANNELS` in `src/shared/types.ts`
2. Add handler in `src/main/ipc/handlers.ts`
3. Add method in `src/preload/preload.ts`
4. Add type declaration in `src/renderer/global.d.ts` (if needed)

## Commands

```bash
npm start        # Development (hot reload)
npm run build    # TypeScript check + package
npm run make     # Package into installer
npm run typecheck # TypeScript check only
```

## Project Structure
```
cleverbiz-electron/
├── src/
│   ├── main/
│   │   ├── main.ts           # Electron entry
│   │   └── ipc/handlers.ts   # IPC handlers
│   ├── preload/
│   │   └── preload.ts        # Context bridge
│   ├── renderer/
│   │   ├── App.tsx            # Root component
│   │   ├── index.tsx          # React entry
│   │   ├── index.html         # HTML shell
│   │   ├── global.d.ts        # Window.electronAPI types
│   │   ├── store/             # Redux Toolkit
│   │   │   ├── index.ts       # configureStore
│   │   │   ├── hooks.ts       # Typed hooks
│   │   │   └── slices/        # Domain slices
│   │   ├── pages/             # Route-level pages
│   │   ├── components/        # Feature components
│   │   ├── styles/
│   │   │   └── globals.css    # Design tokens + components
│   │   ├── i18n/
│   │   │   ├── index.ts       # i18next config
│   │   │   └── locales/       # Translation JSON files
│   │   └── theme/
│   │       └── ThemeProvider.tsx  # Theme context
│   └── shared/
│       └── types.ts           # Shared types + IPC channels
├── assets/                    # Icons, images
├── forge.config.ts            # Electron Forge config
├── tailwind.config.js         # Tailwind with design tokens
└── tsconfig.json              # TypeScript config
```
