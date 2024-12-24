"use client";

import Link from "next/link";
import BusinessImage from "../business-image";

interface BusinessProps {
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

export default function Business({
  name,
  category,
  streetAddress,
  postalCode,
  website,
  image,
  description,
}: BusinessProps) {
  return (
    <section className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
      <div className="mb-8 md:mb-16">
        <BusinessImage title={name} slug={website} url={image.url} />
      </div>
      <div>
        <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
          <Link href={website} className="hover:underline">
            {name}
          </Link>
        </h3>
        <div className="mb-8 md:mb-4 text-lg">
          <p>{streetAddress}</p>
          <p>{postalCode}</p>
        </div>
        <div className="bg-gray-100 border-l-4 border-orange-500 text-orange-700 p-6 mb-6 rounded-l-xl shadow-2xl">
          <p className="text-lg leading-relaxed">{description}</p>
        </div>
        <span className="inline-block bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded">
          {category}
        </span>
      </div>
    </section>
  );
} 