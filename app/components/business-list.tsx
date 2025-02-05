"use client";

import { useState } from "react";
import BusinessCard from "./BusinessCard";
import Sidebar from "./Sidebar";
import MobileMenu from "./MobileMenu";

interface Business {
  name: string;
  category: string[];
  streetAddress: string;
  postalCode: string;
  website: string;
  image?: {
    url?: string;
  };
  description: string;
}

interface BusinessListProps {
  allBusinesses: Business[];
}

const UNSPLASH_ACCESS_KEY = 'e9PA3s8hfvJXQUAqLtjB4R3Xgl-kpC4uzq_NZyrj1TA';
const placeholderImage = '/placeholder.webp';

async function fetchUnsplashImage(query: string) {
  const response = await fetch(`https://api.unsplash.com/photos/random?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`);
  const data = await response.json();
  return data.urls?.small || '';
}

export default function BusinessList({ allBusinesses }: BusinessListProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categorySet = new Set<string>();
  allBusinesses.forEach(b => {
    if (Array.isArray(b.category)) {
      b.category.forEach(cat => {
        const normalizedCategory = cat.trim();
        categorySet.add(normalizedCategory);
      });
    }
  });

  const categories = ["All", ...Array.from(categorySet)];

  const filteredBusinesses = allBusinesses.filter(
    (b) =>
      (selectedCategory === "All" || (Array.isArray(b.category) && b.category.map(cat => cat.trim()).includes(selectedCategory))) &&
      b.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category.trim());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto font-body">
      <MobileMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategorySelect={handleCategorySelect}
      />

      <div className="flex md:flex-row">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        <div className="flex-grow max-w-full mx-auto">
          <div className="sticky top-0 bg-secondary shadow-md p-4 rounded-lg mb-6 flex justify-between items-center header">
            <input
              type="text"
              placeholder="Search businesses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow p-2 border rounded text-accent bg-[#FDF6E3] font-body"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBusinesses.map((business, index) => (
              <BusinessCard key={index} business={business} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
