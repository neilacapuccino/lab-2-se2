import { useState } from 'react';
import NavBar from './components/layout/NavBar';

/**
 * Local state is temporary scaffolding so the nav bar is interactive before
 * the reducer exists. The dashboard body below fills in next.
 */
function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');

  return (
    <div className="min-h-screen bg-white">
      <NavBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        category={category}
        onCategoryChange={setCategory}
        cartCount={3}
        onCartClick={() => {}}
      />

      <main className="mx-auto max-w-[1440px]" />
    </div>
  );
}

export default App;
