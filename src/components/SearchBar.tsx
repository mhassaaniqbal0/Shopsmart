import { useState } from "react";

interface Props {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    const trimmed = query.trim();
    if (trimmed) onSearch(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        className="w-full px-4 py-2 rounded-md bg-gray-100 text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search for a product..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
  onClick={handleSubmit}
  className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded transition"
>
  Search
</button>

    </div>
  );
}

export default SearchBar;
