import { useState } from 'react';
import NavBar from './components/layout/NavBar';

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
        <div className="rounded-xl border border-dashed border-[#CBD5E1] bg-white p-10 text-center">
          <p className="text-sm text-[#475569]">
            Filter sidebar and product grid land in Parts 3 and 4.
          </p>
          <p className="mt-2 text-xs text-[#94A3B8]">
            search: <span className="font-mono">{searchQuery || '—'}</span> · category:{' '}
            <span className="font-mono">{category}</span>
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
