import Link from "next/link";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

async function getFeaturedProducts() {
  const res = await fetch("/api/products?featured=true", {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const products = await getFeaturedProducts();
  const featuredProducts = products.filter((p: Product) => p.featured);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Premium Phone Cases
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Stylish protection for your device. Quality cases with fast shipping.
            </p>
            <div className="flex gap-3">
              <Link href="/products" className="btn-primary">
                Shop Now
              </Link>
              <Link href="/products" className="btn-secondary">
                View All
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Fast Shipping</h3>
              <p className="text-sm text-gray-500">Orders ship within 24 hours</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Quality Checked</h3>
              <p className="text-sm text-gray-500">We test every case before listing</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Easy Returns</h3>
              <p className="text-sm text-gray-500">30-day return window</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product: Product, index: number) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          <div className="mt-8">
            <Link href="/products" className="text-sm font-medium text-gray-900 hover:underline">
              View all products →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}