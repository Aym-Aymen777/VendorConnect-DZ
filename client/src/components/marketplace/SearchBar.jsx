import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  isSearchFocused,
  setIsSearchFocused,
  onSearch,
}) {
  const navigate = useNavigate();

  return (
    <div className="hidden md:flex flex-1 max-w-2xl mx-8">
      <div
        className={`flex w-full bg-slate-800 rounded-lg overflow-hidden transition-all duration-200 ${
          isSearchFocused ? "ring-2 ring-[#e1a95f]" : ""
        }`}>
        <input
          type="text"
          placeholder="Search in 20,000+ products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchTerm.trim()) {
              onSearch(e); // Call your custom logic (e.g., setSearchTerm)
              navigate(`/products/${encodeURIComponent(searchTerm.trim())}`);
            }
          }}
          className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-3 border-none outline-none"
        />
        <button
          onClick={onSearch}
          className="bg-[#e1a95f] hover:bg-[#f6b868] px-6 py-3 text-slate-800 font-medium transition-colors duration-200 flex items-center space-x-2">
          <Search className="h-4 w-4" />
          <span className="hidden lg:inline">Search</span>
        </button>
      </div>
    </div>
  );
}
