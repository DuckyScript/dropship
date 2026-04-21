"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="section-container">
        <div className="max-w-xl mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-zinc-900 tracking-tight mb-4">Our Collection</h1>
          <p className="text-xl text-zinc-500 leading-relaxed">Browse our selection of premium phone cases. Each one is designed for protection and style.</p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12 animate-fade-in animation-delay-100">
          <div className="relative w-full md:flex-1 group">
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-zinc-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none text-zinc-900 font-medium"
            />
          </div>
          
          <div className="flex w-full md:w-auto overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-4 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === category 
                  ? "bg-black text-white shadow-lg shadow-black/10 scale-105" 
                  : "bg-zinc-50 text-zinc-500 hover:bg-zinc-100 hover:text-black"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-zinc-100 rounded-2xl mb-4"></div>
                <div className="h-4 bg-zinc-100 rounded w-1/4 mb-2"></div>
                <div className="h-6 bg-zinc-100 rounded w-3/4 mb-4"></div>
                <div className="h-10 bg-zinc-100 rounded-xl"></div>
              </div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!loading && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : !loading && (
          <div className="text-center py-32 bg-zinc-50 rounded-3xl border border-dashed border-zinc-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-zinc-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-zinc-500 font-medium text-lg">We couldn't find any products matching your search.</p>
            <button 
              onClick={() => {setSearchQuery(""); setSelectedCategory("All");}}
              className="mt-6 text-sm font-bold underline hover:text-zinc-500 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}