# GearHub

A single-page React storefront for browsing tech accessories — filtering and
sorting a product catalogue, managing a cart, and running a simulated checkout.

Built for SE2 Lab 2.

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

## Other commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Type-checks with `tsc` and writes a production build to `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint over the project |

`npm run build` is the honest check: `npm run dev` does not type-check, so code
with type errors will run in development and still fail the build.

## Tech

- **React 19** with **TypeScript**
- **Vite 8** as the build tool and dev server
- **React Router 7** for routing
- **Tailwind CSS 4** via the official Vite plugin, alongside plain CSS files

State is held with React's own `useReducer` and `createContext` — no external
state library.

## Layout

```
gearhub/
  public/            served as-is; referenced by URL, never imported
    favicon.svg
    logo.svg
  src/
    main.tsx         entry point
    App.tsx          root component and routes
    index.css        global styles and Tailwind import
    types.ts         Product, CartItem, Filters, State
    components/
      icons.tsx      inline SVG icon set
      layout/
        NavBar.tsx   search, category filter, cart trigger
    data/
      products.json  the catalogue, as static data
      products.ts    loads the catalogue
    pages/
      homePage.tsx
      homePage.css
```

Two conventions worth knowing:

- **Images belong in `public/`.** The catalogue is a static JSON file, and JSON
  cannot `import`, so image fields hold URL paths such as `/products/hp-01.jpg`.
  Only files in `public/` keep their paths through a production build.
- **`node_modules/` and `dist/` are never committed.** Both are regenerated —
  by `npm install` and `npm run build` respectively.

## Product data

`src/data/products.json` holds the catalogue. Each entry matches the `Product`
interface in `src/types.ts`:

```json
{
  "id": "hp-01",
  "name": "Apple AirPods Max",
  "category": "Headphones",
  "price": 549,
  "image": "",
  "inStock": true
}
```

Image fields are currently empty, so cards render a neutral placeholder. To add
artwork, drop files into `public/products/` and set `image` to the matching
path — no code change is needed.
