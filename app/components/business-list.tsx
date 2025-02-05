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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      (selectedCategory === "All" || (Array.isArray(b.category) && b.category.map(cat => cat.trim()).includes(selectedCategory))) &&
      b.name.toLowerCase().includes(search.toLowerCase())
  );

  console.log(filteredBusinesses)

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

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category.trim());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto">
      {/* Collapsible Menu for Mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-full bg-secondary text-accent p-2 rounded mb-4"
        >
          {isMenuOpen ? "Hide Categories" : "Show Categories"}
        </button>
        {isMenuOpen && (
          <div className="bg-[#FDF6E3] shadow-lg p-4 rounded">
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`px-4 py-2 text-sm rounded ${
                    selectedCategory === category ? "bg-primary text-secondary" : "bg-secondary text-accent"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex md:flex-row">
        {/* Sidebar for Larger Screens */}
        <div className="hidden md:block bg-[#FDF6E3] shadow-lg z-30 w-full md:w-64 md:h-min md:mr-6">
          <div className="p-4">
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`px-4 py-2 text-sm rounded ${
                    selectedCategory === category ? "bg-primary text-secondary" : "bg-secondary text-accent"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow max-w-full mx-auto">
          {/* Header & Search */}
          <div className="sticky top-0 bg-secondary shadow-md p-4 rounded-lg mb-6 flex justify-between items-center">
            <input
              type="text"
              placeholder="Search businesses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow p-2 border rounded text-accent bg-[#FDF6E3]"
            />
          </div>

          {/* Business Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBusinesses.map((business, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05 }}>
                <a href={business.website} target="_blank" rel="noopener noreferrer" className="block overflow-hidden shadow-lg rounded-2xl bg-[#EAE0CB]">
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
    </div>
  );
}
