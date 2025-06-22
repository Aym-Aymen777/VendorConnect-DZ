import { Link } from "react-router-dom";
import { slugify } from "../../utils/slugify";
import { TabsTrigger } from "../ui/tabs";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function CategoryMenu({
  categories,
  tab,
  setTab,
  expandedCategories,
  toggleCategory,
  onItemClick,
}) {
  return (
    <div className="space-y-2 ">
      {categories.map((category) => (
        <Link
          to={`/products/${slugify(category.category)}`}
          key={category.category}>
          <div className="flex items-center">
            <TabsTrigger
              value={category.category}
              className="flex-1 justify-start gap-3 px-4 py-3 text-left bg-white hover:bg-[#e1a95f]/10 data-[state=active]:bg-[#1f3b73] data-[state=active]:text-white transition-all duration-200 rounded-xl border-0"
              onClick={onItemClick}>
              {category.icon}
              <span className="font-medium">{category.category}</span>
            </TabsTrigger>
            <button
              onClick={() => toggleCategory(category.category)}
              className="p-2 hover:bg-[#e1a95f]/10 rounded-lg transition-colors ml-2">
              {expandedCategories.includes(category.category) ? (
                <ChevronDown size={16} className="text-[#1f3b73]" />
              ) : (
                <ChevronRight size={16} className="text-[#1f3b73]" />
              )}
            </button>
          </div>

          {/* Subcategories with scrollable container */}
          {expandedCategories.includes(category.category) && (
            <div className="ml-4 mt-2 max-h-48 overflow-y-auto border-l-2 border-[#e1a95f]/30 pl-4">
              <div className="space-y-1">
                {category.subcategories.map((subcategory) => (
                  <Link
                    to={`/products/${slugify(category.category)}/${slugify(
                      subcategory
                    )}`}
                    key={subcategory}
                    onClick={onItemClick}
                    className="block w-full text-left px-3 py-2 text-sm text-[#1f3b73] hover:bg-[#e1a95f]/10 rounded-lg transition-colors">
                    {subcategory}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
