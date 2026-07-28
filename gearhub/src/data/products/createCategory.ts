import type { Product } from '../../types';

/** The editable half of a product: everything that isn't derived. */
export interface ProductSpec {
  name: string;
  price: number;
  /** Defaults to true; set false to show the item as sold out. */
  inStock?: boolean;
}

type GlobbedImages = Record<string, { default: string }>;

/**
 * Zips a folder of images together with a list of product specs.
 *
 * Category files pass `import.meta.glob(..., { eager: true })` for their own
 * image folder, which keeps them to a single import line instead of one per
 * file. Ids are generated from the prefix and position, so adding a product
 * means adding one line to the spec list and dropping an image in the folder.
 */
export function createCategory(
  prefix: string,
  category: string,
  images: GlobbedImages,
  specs: ProductSpec[],
): Product[] {
  const urls = Object.keys(images)
    .sort()
    .map((key) => images[key].default);

  return specs.slice(0, urls.length).map((spec, index) => ({
    id: `${prefix}-${String(index + 1).padStart(2, '0')}`,
    name: spec.name,
    category,
    price: spec.price,
    image: urls[index],
    inStock: spec.inStock ?? true,
  }));
}
