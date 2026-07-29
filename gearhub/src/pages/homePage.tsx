// Artwork is on hold: products carry an empty `image` for now and the cards
// fall back to a neutral placeholder. Drop files into public/ and point the
// image fields at them (e.g. "/products/hp-01.jpg") to bring pictures back.

interface Product {
  id: number;
  category: string;
  name: string;
  price: number;
  image: string;
  stock: boolean;
}

interface HomePageProps {
  searchQuery: string;
  category: string;
}

export default function HomePage({ searchQuery, category }: HomePageProps) {
  const products: Product[] = [
    {
      id: 1,
      category: "Headphones",
      name: "Pro Wireless ANC Headphones",
      price: 189.99,
      image: "",
      stock: true,
    },
    {
      id: 2,
      category: "Chargers",
      name: "100W GaN Desktop Charger",
      price: 69.99,
      image: "",
      stock: true,
    },
    {
      id: 3,
      category: "Cases",
      name: "Carbon Fiber MagSafe Case",
      price: 34.99,
      image: "",
      stock: true,
    },
    {
      id: 4,
      category: "Cables",
      name: "USB-C DisplayPort Braided Cable",
      price: 24.99,
      image: "",
      stock: true,
    },
    {
      id: 5,
      category: "Keyboards",
      name: "Mechanical Wireless Keyboard 75%",
      price: 129.99,
      image: "",
      stock: true,
    },
    {
      id: 6,
      category: "Mouse",
      name: "Precision Wireless Mouse",
      price: 89.99,
      image: "",
      stock: false,
    },
  ];

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory = category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto my-10 max-w-[1400px] px-[30px] pb-[50px] text-[#1f2937] max-[768px]:p-5">
      {/* ================= HERO ================= */}

      <section className="mb-[55px] flex items-center justify-between gap-[60px] rounded-[22px] bg-white p-[50px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] max-[1024px]:flex-col max-[1024px]:text-center max-[768px]:p-[30px]">
        <div className="flex-1">
          <span className="mb-5 inline-block rounded-full bg-[#e8f0ff] px-4 py-2 text-[0.85rem] font-semibold text-[#2563eb]">
            New Arrivals Stocked Daily
          </span>

          <h1 className="mb-5 text-[3.2rem]/[1.2] font-extrabold text-[#111827] max-[768px]:text-[2.4rem] max-[480px]:text-[2rem]">
            Discover Premium Tech Gear
          </h1>

          <p className="mb-[30px] max-w-[560px] leading-[1.8] text-[#6b7280] max-[1024px]:mx-auto">
            Shop the latest hand-picked, premium-grade accessories carefully
            crafted to upgrade and power up your daily devices.
          </p>

          <button
            type="button"
            className="cursor-pointer rounded-xl bg-[#2563eb] px-[35px] py-[15px] font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#1d4ed8] max-[480px]:w-full"
          >
            Shop Now
          </button>
        </div>

        <div className="flex-1">
          <div className="h-[420px] w-full rounded-[18px] border border-dashed border-[#cbd5e1] bg-[#eef2f7] max-[1024px]:h-[320px]" />
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}

      <section className="mt-5">
        <div className="mb-[30px] flex items-center justify-between max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-2.5">
          <h2 className="text-[2rem] font-bold">Featured Products</h2>

          <button
            type="button"
            className="cursor-pointer font-semibold text-[#2563eb] transition duration-300 hover:text-[#1d4ed8]"
          >
            View All Products
          </button>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(330px,1fr))] gap-8 max-[768px]:grid-cols-1">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-[18px] border border-[#e5e7eb] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-2.5 hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)]"
              >
                <div className="flex h-[260px] items-center justify-center overflow-hidden bg-[#f8fafc]">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain p-[15px] transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full rounded-[10px] border border-dashed border-[#cbd5e1] bg-[#eef2f7]" />
                  )}
                </div>

                <div className="p-[22px]">
                  <div className="mb-3.5 flex items-center justify-between">
                    <span className="text-[0.85rem] font-semibold text-[#2563eb]">
                      {product.category}
                    </span>

                    <span
                      className={`text-[0.82rem] font-semibold ${
                        product.stock ? "text-[#16a34a]" : "text-[#dc2626]"
                      }`}
                    >
                      {product.stock ? "• In Stock" : "• Out of Stock"}
                    </span>
                  </div>

                  <h3 className="mb-[18px] min-h-[60px] text-[1.15rem]/[1.5] text-[#111827]">
                    {product.name}
                  </h3>

                  <h4 className="mb-5 text-[1.6rem] text-[#2563eb]">
                    ${product.price.toFixed(2)}
                  </h4>

                  <button
                    type="button"
                    className="w-full cursor-pointer rounded-xl bg-[#2563eb] p-3.5 text-base font-bold text-white transition duration-300 hover:bg-[#1d4ed8]"
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full p-[60px] text-center text-[#6b7280]">
              <h3 className="text-[1.15rem] font-semibold">No products found.</h3>
              <p className="mt-2">
                Try another search or choose a different category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
