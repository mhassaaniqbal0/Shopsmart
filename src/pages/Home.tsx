import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import ProductModal from "../components/ProductModal";
import { type Product } from "../types/Product";
import groceryStatic from "../assets/grocery-static.png";
import groceryGif from "../assets/grocery.gif";

export default function Home() {
  const allProducts: Product[] = [
    {
      id: "1",
      name: "iPhone 13",
      image: "https://tse3.mm.bing.net/th/id/OIP.ykw83Uy-wp2Ql2xKjH-vLAHaHa?pid=Api&P=0&h=220",
      description: "Latest iPhone with A15 Bionic chip and dual-camera system.",
      summary: "Best-in-class smartphone with powerful features.",
      platformPrices: [
        {
          platform: "Daraz",
          price: "Rs. 220,000",
          link: "#",
          rating: 4.8,
          deliveryTime: "2-3 days",
          stockAvailable: true,
        },
        {
          platform: "OLX",
          price: "Rs. 215,000",
          link: "#",
          rating: 4.2,
          deliveryTime: "1-2 days",
          stockAvailable: false,
        },
      ],
    },
    {
      id: "2",
      name: "Samsung Galaxy S22",
      image: "https://tse1.mm.bing.net/th/id/OIP.XwJ889hbrMie6iA452AivgHaE7?pid=Api&P=0&h=220",
      description: "Flagship Android phone with dynamic AMOLED display.",
      summary: "High-end Samsung device with excellent camera.",
      platformPrices: [
        {
          platform: "Daraz",
          price: "Rs. 198,000",
          link: "#",
          rating: 4.6,
          deliveryTime: "3-5 days",
          stockAvailable: true,
        },
        {
          platform: "OLX",
          price: "Rs. 192,000",
          link: "#",
          rating: 4.3,
          deliveryTime: "2-3 days",
          stockAvailable: true,
        },
      ],
    },
    {
      id: "3",
      name: "Infinix Zero 30",
      image: "https://tse4.mm.bing.net/th/id/OIP.LMtr_QpOp5Vh4rpUrdrFygHaEK?pid=Api&P=0&h=220",
      description: "Affordable Infinix phone with strong battery life.",
      summary: "Best budget phone with premium looks.",
      platformPrices: [
        {
          platform: "Daraz",
          price: "Rs. 65,000",
          link: "#",
          rating: 4.1,
          deliveryTime: "2-4 days",
          stockAvailable: true,
        },
        {
          platform: "OLX",
          price: "Rs. 63,000",
          link: "#",
          rating: 3.8,
          deliveryTime: "1-2 days",
          stockAvailable: true,
        },
      ],
    },
  ];

  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);

  const handleSearch = (q: string) => {
    setQuery(q);
    const result = allProducts.filter((p) =>
      p.name.toLowerCase().includes(q.toLowerCase())
    );
    setFilteredProducts(result);
  };

  const applyFilters = (filters: {
    minPrice: number;
    maxPrice: number;
    platform: string[];
    rating: number;
    sortBy: string;
  }) => {
    let filtered = allProducts.filter((product) => {
      const priceMatch = product.platformPrices.some((p) => {
        const numeric = parseInt(p.price.replace(/[^\d]/g, ""));
        return numeric >= filters.minPrice && numeric <= filters.maxPrice;
      });

      const ratingMatch = product.platformPrices.some((p) => p.rating >= filters.rating);

      const platformMatch =
        filters.platform.length === 0 ||
        product.platformPrices.some((p) => filters.platform.includes(p.platform));

      return priceMatch && ratingMatch && platformMatch;
    });

    if (filters.sortBy === "priceLow") {
      filtered.sort((a, b) => {
        const aMin = Math.min(...a.platformPrices.map((p) => parseInt(p.price.replace(/[^\d]/g, ""))));
        const bMin = Math.min(...b.platformPrices.map((p) => parseInt(p.price.replace(/[^\d]/g, ""))));
        return aMin - bMin;
      });
    } else if (filters.sortBy === "priceHigh") {
      filtered.sort((a, b) => {
        const aMin = Math.min(...a.platformPrices.map((p) => parseInt(p.price.replace(/[^\d]/g, ""))));
        const bMin = Math.min(...b.platformPrices.map((p) => parseInt(p.price.replace(/[^\d]/g, ""))));
        return bMin - aMin;
      });
    } else if (filters.sortBy === "ratingHigh") {
      filtered.sort((a, b) => {
        const aMax = Math.max(...a.platformPrices.map((p) => p.rating));
        const bMax = Math.max(...b.platformPrices.map((p) => p.rating));
        return bMax - aMax;
      });
    }

    setFilteredProducts(filtered);
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-100 via-pink-50 to-white py-20 px-6 text-left">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1b0e0e] mb-4 leading-tight">
              Find the Best Deals in Pakistan
            </h1>
            <p className="text-lg text-[#7a5f5f] mb-6">
              Compare prices from Daraz, OLX, Temu & more. Powered by AI insights and real reviews.
            </p>
            <div className="max-w-md flex gap-2">
              <SearchBar onSearch={handleSearch} />
              <button
                onClick={() => setFiltersVisible(!filtersVisible)}
                className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
              >
                Filter
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="relative w-[300px] h-[300px] group overflow-hidden">
              <img
                src={groceryStatic}
                alt="Grocery Static"
                className="absolute top-0 left-0 w-full h-full object-contain group-hover:opacity-0 transition-opacity duration-300"
              />
              <img
                src={groceryGif}
                alt="Grocery GIF"
                className="absolute top-0 left-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {filtersVisible && (
        <section className="px-6 py-4">
          <Filters onFilter={applyFilters} />
        </section>
      )}

      {/* Flash Deals */}
      <section className="px-6 py-8 bg-accent">
        <h2 className="text-2xl font-semibold mb-4 text-pink-800">Flash Deals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} onClick={() => setSelectedProduct(product)}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      <Footer />
    </>
  );
}
