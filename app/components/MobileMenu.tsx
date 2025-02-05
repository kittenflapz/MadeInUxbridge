"use client";

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  categories: string[];
  selectedCategory: string;
  handleCategorySelect: (category: string) => void;
}

export default function MobileMenu({
  isMenuOpen,
  setIsMenuOpen,
  categories,
  selectedCategory,
  handleCategorySelect,
}: MobileMenuProps) {
  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="w-full bg-secondary text-accent p-2 rounded mb-4 font-heading"
      >
        {isMenuOpen ? "Hide Categories" : "Show Categories"}
      </button>
      {isMenuOpen && (
        <div className="bg-secondary shadow-lg p-4 rounded">
          <div className="flex flex-col gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`px-4 py-2 text-sm rounded font-heading ${
                  selectedCategory === category ? "bg-primary text-secondary" : "bg-[#FDF6E3] text-accent"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 