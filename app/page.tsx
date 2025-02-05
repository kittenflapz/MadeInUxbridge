import BusinessList from "./components/business-list";
import { getAllBusinesses } from "@/lib/api";

function Intro() {
  return (
    <section className="container mx-auto px-5 flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12 bg-secondary rounded-2xl shadow-lg p-10">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 text-primary">
        Made in Uxbridge.
      </h1>
      <h2 className="text-center md:text-left text-lg mt-5 md:pl-8 text-accent">
        Uxbridge is home to amazing products, so we have compiled an organized
        list of items made right here. Think spices, machinery, produce,
        publications, electronics and more!
      </h2>
    </section>
  );
}

export default async function Page() {
  const allBusinesses = await getAllBusinesses();

  return (
    <div className="container mx-auto px-5">
      <Intro />
      <BusinessList allBusinesses={allBusinesses} />
    </div>
  );
}
