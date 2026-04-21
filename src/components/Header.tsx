"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Header() {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-lg font-semibold text-gray-900">
            Store
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">Home</Link>
            <Link href="/products" className="text-sm text-gray-600 hover:text-gray-900">Shop</Link>
            <Link href="/orders" className="text-sm text-gray-600 hover:text-gray-900">Orders</Link>
            <Link href="/cart" className="text-sm text-gray-600 hover:text-gray-900">Cart ({totalItems})</Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/cart" className="p-2 text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </Link>
            <button className="md:hidden p-2 text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-gray-100 px-4 py-3 flex flex-col gap-2">
          <Link href="/" className="py-2 text-sm text-gray-600">Home</Link>
          <Link href="/products" className="py-2 text-sm text-gray-600">Shop</Link>
          <Link href="/orders" className="py-2 text-sm text-gray-600">Orders</Link>
          <Link href="/cart" className="py-2 text-sm text-gray-600">Cart ({totalItems})</Link>
        </nav>
      )}
    </header>
  );
}