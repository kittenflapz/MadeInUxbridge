"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  const [images, setImages] = useState<{ [key: string]: string }>({});

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
      (selectedCategory === "All" || (Array.isArray(b.category) && b.category.includes(selectedCategory))) &&
      b.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const fetchImages = async () => {
      const newImages: { [key: string]: string } = {};
      for (const business of allBusinesses) {
        if (!business.image?.url && Array.isArray(business.category)) {
          const category = business.category[0];
          if (!images[category]) {
            newImages[category] = await fetchUnsplashImage(category);
          }
        }
      }
      setImages(prevImages => ({ ...prevImages, ...newImages }));
    };

    fetchImages();
  }, [allBusinesses, images]);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="bg-white shadow-lg z-30 w-full md:w-64 md:h-min">
        <div className="p-4">
          <div className="flex flex-col gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm rounded ${
                  selectedCategory === category ? "bg-black text-white" : "bg-gray-100 text-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow pl-6 max-w-full mx-auto">
        {/* Header & Search */}
        <div className="sticky top-0 bg-white shadow-md p-4 rounded-lg mb-6 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search businesses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow p-2 border rounded"
          />
        </div>

        {/* Business Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBusinesses.map((business, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }}>
              <a href={business.website} target="_blank" rel="noopener noreferrer" className="block overflow-hidden shadow-lg rounded-2xl">
                <img
                  src={business.image?.url || placeholderImage}
                  alt={business.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{business.name}</h3>
                  <p className="text-sm text-gray-500">{Array.isArray(business.category) ? business.category.join(", ") : business.category}</p>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
