interface SidebarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function Sidebar({ categories, selectedCategory, onSelectCategory }: SidebarProps) {
  return (
    <div className="hidden md:block bg-[#EAE0CB] shadow-lg z-30 w-full md:w-64 md:mr-6 md:h-min rounded header">
      <div className="p-4">
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-2 text-sm rounded font-heading ${
                selectedCategory === category ? "bg-primary text-secondary" : "bg-[#FDF6E3] text-accent"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 