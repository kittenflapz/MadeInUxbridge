import { motion } from "framer-motion";

interface Business {
  name: string;
  category: string[];
  website: string;
  image?: {
    url?: string;
  };
}

const placeholderImage = '/placeholder.webp';

export default function BusinessCard({ business }: { business: Business }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <a
        href={business.website}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden shadow-lg rounded-2xl bg-[#EAE0CB] header"
      >
        <img
          src={business.image?.url || placeholderImage}
          alt={business.name}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-heading">{business.name}</h3>
          <p className="text-sm text-gray-500">
            {Array.isArray(business.category) ? business.category.join(", ") : business.category}
          </p>
        </div>
      </a>
    </motion.div>
  );
} 