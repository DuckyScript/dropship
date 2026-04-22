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
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="section-container">
        <div className="max-w-3xl mb-20 animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
             <span className="w-12 h-px bg-zinc-900"></span>
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-900">The Series</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-zinc-900 tracking-tighter mb-6 leading-none">All Creations</h1>
          <p className="text-xl text-zinc-500 leading-relaxed font-medium max-w-2xl">Discover our complete range of precision-engineered protection. From crystal clear to artisan leather, find your perfect match.</p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-20 animate-fade-in animation-delay-100">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto pb-4 lg:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all border ${
                  selectedCategory === category 
                  ? "bg-zinc-900 text-white border-zinc-900 shadow-xl shadow-zinc-200" 
                  : "bg-white text-zinc-500 border-zinc-100 hover:border-zinc-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-96 group">
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-8 py-4 bg-zinc-50 border border-zinc-50 rounded-full focus:bg-white focus:ring-4 focus:ring-zinc-100 focus:border-zinc-200 transition-all outline-none text-zinc-900 text-sm font-bold tracking-tight"
            />
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