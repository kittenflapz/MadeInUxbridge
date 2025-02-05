import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
  title: `Made in Uxbridge`,
  description: `Makers, products and services in Uxbridge, Ontario.`,
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <div className="container mx-auto px-5">
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-5xl font-heading tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Built by Uxbridgeans.
          </h3>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <section className="min-h-screen">
          <main>{children}</main>
          <Footer />
        </section>
      </body>
    </html>
  );
}
