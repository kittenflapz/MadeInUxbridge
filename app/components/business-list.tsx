"use client";

import { useState } from "react";
import Business from "./business";

interface Business {
  name: string;
  category: string;
  streetAddress: string;
  postalCode: string;
  website: string;
  image: {
    url: string;
  };
  description: string;
}

interface BusinessListProps {
  allBusinesses: Business[];
}

export default function BusinessList({ allBusinesses }: BusinessListProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(allBusinesses.map(b => b.category)))];

  const filteredBusinesses = selectedCategory === "All"
    ? allBusinesses
    : allBusinesses.filter(b => b.category === selectedCategory);

  return (
    <>
      <nav className="flex justify-center space-x-4 mb-8">
        {categories.map(category => (
          <button
            key={category}
            className={`px-4 py-2 rounded ${
              selectedCategory === category ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>
      {filteredBusinesses.map((business) => (
        <Business
          key={business.name}
          {...business}
        />
      ))}
    </>
  );
} 