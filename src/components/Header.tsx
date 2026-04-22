"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Header() {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link href="/" className="text-lg font-black tracking-[0.3em] hover:opacity-70 transition-opacity uppercase italic flex items-center gap-2">
            VELVET <span className="text-zinc-300 font-light">&</span> VUE
          </Link>

          <nav className="hidden md:flex items-center gap-12">
            <Link href="/" className="text-[10px] font-bold text-zinc-400 hover:text-black uppercase tracking-[0.2em] transition-colors">Home</Link>
            <Link href="/products" className="text-[10px] font-bold text-zinc-400 hover:text-black uppercase tracking-[0.2em] transition-colors">The Series</Link>
            <Link href="/orders" className="text-[10px] font-bold text-zinc-400 hover:text-black uppercase tracking-[0.2em] transition-colors">Support</Link>
          </nav>

          <div className="flex items-center gap-6">
            <Link href="/cart" className="group relative p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-900 group-hover:scale-110 transition-transform"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-zinc-900 text-white text-[9px] font-bold flex items-center justify-center rounded-full animate-scale-in border-2 border-white">
                  {totalItems}
                </span>
              )}
            </Link>
            <button className="md:hidden p-2 text-zinc-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-t border-zinc-50 px-8 py-10 flex flex-col gap-6 animate-fade-in shadow-2xl">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold uppercase tracking-widest text-zinc-900">Home</Link>
          <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold uppercase tracking-widest text-zinc-900">The Series</Link>
          <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold uppercase tracking-widest text-zinc-900">Order Tracking</Link>
          <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold uppercase tracking-widest text-zinc-900 flex items-center justify-between">
            Bag <span>({totalItems})</span>
          </Link>
        </nav>
      )}
    </header>
  );
}