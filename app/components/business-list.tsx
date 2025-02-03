"use client";

import { useState } from "react";
import Business from "./business";

interface Business {
  name: string;
  category: string;
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
export default function BusinessList({ allBusinesses }: BusinessListProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

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

  const filteredBusinesses = selectedCategory === "All"
    ? allBusinesses
    : allBusinesses.filter(b => Array.isArray(b.category) && b.category.includes(selectedCategory));

  return (
    <>
      <div className="md:hidden mb-4">
        <button
          className={`w-full text-left px-4 py-2 rounded ${
            isAccordionOpen ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          Filter by Category
        </button>
        {isAccordionOpen && (
          <nav className="flex flex-wrap justify-center space-x-2 space-y-2 mt-2">
            {categories.map((category, index) => (
              <button
                key={`${category}`}
                className={`px-2 py-1 text-sm rounded ${
                  selectedCategory === category ? "bg-orange-500 text-white scale-110" : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </nav>
        )}
      </div>
      <nav className="hidden md:flex flex-wrap justify-center space-x-2 space-y-2 mb-8">
        {categories.map((category, index) => (
          <button
            key={`${category}`}
            className={`px-2 py-1 text-sm rounded ${
              selectedCategory === category ? "bg-orange-500 text-white scale-110" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>
      {filteredBusinesses.map((business) => (
        <Business
          key={`${business.name}-${business.category}`}
          {...business}
        />
      ))}
    </>
  );
}
