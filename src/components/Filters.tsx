import { useState } from "react";

interface Props {
  onFilter: (filters: {
    minPrice: number;
    maxPrice: number;
    platform: string[];
    rating: number;
    sortBy: string;
  }) => void;
}

export default function Filters({ onFilter }: Props) {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(999999);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("");

  const platforms = ["Daraz", "OLX", "Temu"];

  const handlePlatformChange = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const applyFilters = () => {
    onFilter({ minPrice, maxPrice, platform: selectedPlatforms, rating, sortBy });
  };

  return (
    <div className="bg-white border p-4 rounded-lg mb-6 shadow space-y-4">
      <h2 className="font-semibold text-lg text-pink-800">Filters</h2>

      <div className="flex gap-4">
        <input
          type="number"
          className="border p-2 rounded w-full"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
        />
        <input
          type="number"
          className="border p-2 rounded w-full"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </div>

      <div>
        <h3 className="font-medium text-sm mb-1">Platforms</h3>
        <div className="flex flex-wrap gap-2">
          {platforms.map((p) => (
            <label key={p} className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                checked={selectedPlatforms.includes(p)}
                onChange={() => handlePlatformChange(p)}
              />
              {p}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm block mb-1">Minimum Rating:</label>
        <input
          type="range"
          min="0"
          max="5"
          step="0.5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full"
        />
        <span className="text-sm">Rating: {rating}+</span>
      </div>

      <div>
        <label className="text-sm block mb-1">Sort By:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">None</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="ratingHigh">Rating: High to Low</option>
        </select>
      </div>

      <button
        onClick={applyFilters}
        className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
      >
        Apply Filters
      </button>
    </div>
  );
}
