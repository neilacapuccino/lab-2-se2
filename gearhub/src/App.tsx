import { useState } from 'react';
import NavBar from './components/layout/NavBar';
import { products } from './data/products';
import { CATEGORIES } from './types';

/**
 * Local state here is temporary scaffolding so the nav bar is interactive
 * before the reducer exists. Part 9 replaces it with dispatch + selectors.
 */
function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <NavBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        category={category}
        onCategoryChange={setCategory}
        cartCount={3}
        onCartClick={() => {}}
      />

      <main className="mx-auto max-w-[1440px] px-10 py-10">
        <p className="mb-6 text-sm text-[#475569]">
          {products.length} products across {CATEGORIES.length - 1} categories. The
          filter sidebar and product grid arrive in Parts 3 and 4.
        </p>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.filter((c) => c !== 'All').map((name) => {
            const sample = products.find((p) => p.category === name);
            return (
              <div
                key={name}
                className="rounded-xl border border-[#E2E8F0] bg-white p-4 text-center"
              >
                <img
                  src={sample?.image}
                  alt={sample?.name ?? name}
                  className="mx-auto h-28 w-full object-contain"
                />
                <p className="mt-3 text-[13px] font-semibold text-[#0F172A]">{name}</p>
                <p className="text-[11px] text-[#94A3B8]">
                  {products.filter((p) => p.category === name).length} items
                </p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
