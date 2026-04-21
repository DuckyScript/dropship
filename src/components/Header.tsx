"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Header() {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity uppercase italic">
            VELVET <span className="text-zinc-400">& VUE</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-zinc-600 hover:text-black transition-colors">Home</Link>
            <Link href="/products" className="text-sm font-medium text-zinc-600 hover:text-black transition-colors">Shop</Link>
            <Link href="/orders" className="text-sm font-medium text-zinc-600 hover:text-black transition-colors">Orders</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="group relative p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zinc-700 transition-colors group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-black text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-scale-in">
                  {totalItems}
                </span>
              )}
            </Link>
            <button className="md:hidden p-2 text-zinc-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-t border-zinc-100 px-4 py-6 flex flex-col gap-4 animate-fade-in">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-zinc-900">Home</Link>
          <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-zinc-900">Shop All</Link>
          <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-zinc-900">Order Tracking</Link>
          <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-zinc-900 flex items-center gap-2">
            Cart ({totalItems})
          </Link>
        </nav>
      )}
    </header>
  );
}