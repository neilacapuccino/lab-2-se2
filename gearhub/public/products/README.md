# Product images

Drop image files into the folder for their category:

```
public/products/
  headphones/
  chargers/
  speakers/
  keyboards/
  mice/
  microphones/
  webcams/
```

The folder decides the category, so a file only needs to land in the right one —
no naming convention required. `IMG_4821.jpg` is fine.

## How these reach the app

`src/data/products.json` holds the catalogue, and each entry's `image` field is a
path from the site root:

```json
{ "id": "hp-01", "name": "Apple AirPods Max", "category": "Headphones",
  "price": 549, "image": "/products/headphones/airpods-max.jpg", "inStock": true }
```

Anything in `public/` is served as-is, so the path in the JSON is exactly the path
on disk minus the `public` prefix. Products with an empty `image` render a neutral
placeholder instead, so a half-filled catalogue still looks deliberate.

## Format notes

- **JPG, PNG or WebP.** WebP is smallest; PNG is worth it only for transparency.
- **Square-ish images work best.** Cards give the artwork a 160px-tall box and use
  `object-contain`, so nothing is cropped — very wide or very tall images just sit
  in more empty space.
- **Around 600-800px on the long edge** is plenty. The card never renders larger,
  so bigger files only slow the page down.
- **Keep files under ~200KB** where you can. They are committed to git, and the
  repo already carries history from a 316k-line accident.
