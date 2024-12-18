import Link from "next/link";
import { draftMode } from "next/headers";
import BusinessImage from "./business-image";
import { getAllBusinesses } from "@/lib/api";

function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12 bg-gray-200 rounded-2xl shadow-lg p-10">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Made in Uxbridge.
      </h1>
      <h2 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Uxbridge is home to amazing products, so we have compiled an organized
        list of items made right here. Think spices, machinery, produce,
        publications, electronics and more!
      </h2>
    </section>
  );
}

function Business({
  name,
  category,
  streetAddress,
  postalCode,
  website,
  image,
  description,
}: {
  name: string;
  category: string;
  streetAddress: string;
  postalCode: string;
  website: string;
  image: any;
  description: string;
}) {
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

export default async function Page() {
  const allBusinesses = await getAllBusinesses();

  return (
    <div className="container mx-auto px-5">
      <Intro />
      {allBusinesses.map((business) => (
        <Business
          key={business.name}
          name={business.name}
          category={business.category}
          streetAddress={business.streetAddress}
          postalCode={business.postalCode}
          website={business.website}
          image={business.image}
          description={business.description}
        />
      ))}
    </div>
  );
}
