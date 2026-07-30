# GearHub

A single-page React storefront for browsing tech accessories — filtering and
sorting a product catalogue, managing a cart, and running a simulated checkout.
State management relies entirely on React's `useReducer` combined with
`createContext`; there is no external state library.

Built for SE2123 Lab 2.

## Running it

You need [Node.js](https://nodejs.org) 20 or newer. Check with `node -v`.

The application lives in the `gearhub/` subfolder, so change into it first:

```bash
cd gearhub
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite prints a local address — usually <http://localhost:5173>. Open it in a
browser. Edits to files under `src/` reload automatically.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Type-checks with `tsc`, then writes a production build to `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint over the project |

`npm run build` is the honest check: `npm run dev` does not type-check, so code
with type errors will run in development and still fail the build.

## Tools and frameworks

The project was scaffolded with Vite's official React + TypeScript template:

```bash
npm create vite@latest gearhub -- --template react-ts
```

That boilerplate supplies `index.html`, `vite.config.ts`, the three `tsconfig`
files and `eslint.config.js`. Tailwind and React Router were added on top; the
strict compiler options in `tsconfig.app.json` (`noUnusedLocals`,
`noUnusedParameters`, `noFallthroughCasesInSwitch`, `erasableSyntaxOnly`) are the
template's defaults and are left on, so unused code and fallthrough cases fail
the build rather than sitting unnoticed.

### Runtime dependencies

| Package | Version | What it does here |
| --- | --- | --- |
| `react`, `react-dom` | ^19.2.7 | The UI library. `useReducer`, `createContext` and `useSyncExternalStore` all come from here — no state-management library is installed |
| `react-router-dom` | ^7.18.2 | Client-side routing. `BrowserRouter` in `main.tsx`, one `Route` in `App.tsx` |

### Build and tooling dependencies

| Package | Version | What it does here |
| --- | --- | --- |
| `vite` | ^8.1.1 | Dev server and production bundler |
| `@vitejs/plugin-react` | ^6.0.3 | React support for Vite: JSX transform and hot reload |
| `typescript` | ~6.0.2 | Type checking, run by `npm run build` before the bundle |
| `tailwindcss`, `@tailwindcss/vite` | ^4.3.3 | All styling. Tailwind 4 is configured from CSS — one `@import "tailwindcss"` in `src/index.css`, no `tailwind.config.js` |
| `eslint`, `typescript-eslint`, `@eslint/js` | ^10.6.0 / ^8.62.0 / ^10.0.1 | Linting, TypeScript-aware |
| `eslint-plugin-react-hooks` | ^7.1.1 | Catches hook-rule violations, including stale dependency arrays |
| `eslint-plugin-react-refresh` | ^0.5.3 | Warns when a module's exports would break hot reload |
| `@types/react`, `@types/react-dom`, `@types/node` | ^19.2.17 / ^19.2.3 / ^24.13.2 | Type definitions |
| `globals` | ^17.7.0 | Browser global names for ESLint |

Deliberately not installed: any state library (Redux, Zustand, Jotai), any icon
package — `src/components/icons.tsx` holds the icon set as inline SVG — and any
UI component library.

## Layout

```
lab-2/
  README.md
  gearhub/                     the application
    index.html                 Vite entry document
    vite.config.ts             Vite + React + Tailwind plugins
    eslint.config.js           flat ESLint config
    tsconfig*.json             app / node / root project references
    public/                    served as-is; referenced by URL, never imported
      favicon.svg, logo.svg, hero.jpg
      products/                151 product photos, in a folder per category
    src/
      main.tsx                 entry point; wraps the app in AppStateProvider
      App.tsx                  routes, and the only consumer of the app state
      index.css                the only stylesheet (Tailwind entry)
      types.ts                 Product, CartItem, Filters, ViewFlags, State
      state/
        actions.ts             the Action union and one action creator per action
        appStateReducer.ts     pure (state, action) => state, plus initialState
        appStateContext.ts     the context object and the useAppState hook
        AppStateProvider.tsx   the provider component
      components/
        CartDrawer.tsx         the slide-out cart
        FilterSidebar.tsx      categories, price, views, sort
        ProductGrid.tsx        results header, filter chips, grid
        ProductCard.tsx        one product tile
        FeaturedSection.tsx    the landing view
        CategoryMenu.tsx       nav category picker
        Dropdown.tsx           styled select
        icons.tsx              inline SVG icon set
        layout/
          NavBar.tsx           search, category filter, cart trigger
      pages/
        dashboardPage.tsx      the single screen: rail, grid, drawer
      data/
        products.json          the catalogue, as static data
        products.ts            loads the catalogue and rolls stock levels
      utils/
        productUtils.ts        pure filtering, sorting, totals and stock helpers
        useMediaQuery.ts       reads a CSS breakpoint from JavaScript
```

Three conventions worth knowing:

- **State lives in `src/state/`,** in one reducer behind one context. `App.tsx`
  is the only component that calls `useAppState()`; everything below it takes
  what it needs as props.
- **Images belong in `public/`.** The catalogue is a static JSON file, and JSON
  cannot `import`, so image fields hold URL paths such as
  `/products/headphones/h1.jpg`. Only files in `public/` keep their paths
  through a production build.
- **`node_modules/` and `dist/` are never committed.** Both are regenerated —
  by `npm install` and `npm run build` respectively.
