import { products } from './data/products';
import { CATEGORIES } from './types';

/**
 * Temporary shell. Part 2 replaces this with the real GearHub layout —
 * for now it just proves the catalogue is wired up and loading.
 */
function App() {
  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-bold text-slate-900">GearHub</h1>
      <p className="mt-2 text-slate-600">
        {products.length} products across {CATEGORIES.length - 1} categories.
      </p>
      <ul className="mt-6 space-y-1">
        {CATEGORIES.filter((c) => c !== 'All').map((category) => (
          <li key={category} className="text-sm text-slate-700">
            {category} — {products.filter((p) => p.category === category).length}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
