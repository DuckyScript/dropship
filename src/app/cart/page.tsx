"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="section-container min-h-[70vh] flex flex-col items-center justify-center text-center animate-fade-in">
        <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mb-10 shadow-sm border border-zinc-100">
          <ShoppingBag className="w-8 h-8 text-zinc-300" />
        </div>
        <h1 className="text-5xl font-bold tracking-tighter mb-6 text-zinc-900 leading-none">Your Bag is Empty</h1>
        <p className="text-zinc-500 mb-12 max-w-md font-medium text-lg leading-relaxed">
          The pieces you've selected will appear here. Start exploring our latest collection to find your perfect match.
        </p>
        <Link href="/products" className="bg-zinc-900 text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs transition-all hover:bg-black hover:shadow-2xl hover:shadow-zinc-200 active:scale-95">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="section-container animate-fade-in pt-32">
      <div className="max-w-3xl mb-16">
        <div className="flex items-center gap-2 mb-4">
           <span className="w-8 h-px bg-zinc-900"></span>
           <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-900">Your Selection</span>
        </div>
        <h1 className="text-6xl font-bold tracking-tighter text-zinc-900 leading-none">Shopping Bag</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:items-start">
        <div className="lg:col-span-8 space-y-10">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-8 pb-10 border-b border-zinc-100 animate-fade-in-up last:border-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link href={`/products/${item.slug}`} className="shrink-0">
                <div className="w-full sm:w-40 aspect-[4/5] relative rounded-3xl overflow-hidden bg-zinc-50 group border border-zinc-100">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </Link>

              <div className="flex-1 flex flex-col justify-between py-2">
                <div>
                   <div className="flex justify-between items-start mb-4">
                    <div>
                      <Link
                        href={`/products/${item.slug}`}
                        className="text-2xl font-bold text-zinc-900 hover:text-zinc-500 transition-colors tracking-tight"
                      >
                        {item.name}
                      </Link>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-2">Special Edition Case</p>
                    </div>
                    <p className="text-xl font-bold text-zinc-900">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-6 mt-8">
                    <div className="flex items-center bg-zinc-50 rounded-full p-1 border border-zinc-100">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all text-zinc-400 hover:text-zinc-900 disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-bold text-sm text-zinc-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all text-zinc-400 hover:text-zinc-900"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-rose-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Ready to Ship</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 lg:sticky lg:top-32">
          <div className="bg-zinc-50 rounded-[32px] p-10 border border-zinc-100">
            <h2 className="text-2xl font-bold mb-8 tracking-tight">Summary</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 font-medium">Subtotal</span>
                <span className="text-zinc-900 font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 font-medium">Shipping</span>
                <span className="text-zinc-900 font-bold uppercase text-[10px] tracking-widest">Calculated at next step</span>
              </div>
              <div className="flex justify-between items-center text-sm pb-2">
                <span className="text-zinc-500 font-medium">Tax</span>
                <span className="text-zinc-900 font-bold">$0.00</span>
              </div>
              <div className="border-t border-zinc-200 pt-6 flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Total Amount</p>
                  <p className="text-4xl font-bold tracking-tighter text-zinc-900">${totalPrice.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <Link
              href="/checkout"
              className="w-full block bg-zinc-900 text-white hover:bg-black mt-10 py-5 rounded-full text-center text-xs font-bold uppercase tracking-[0.2em] transition-all hover:shadow-2xl hover:shadow-zinc-200 active:scale-95"
            >
              Secure Checkout
            </Link>
            
            <div className="mt-8 space-y-4">
               <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Secure SSL Encrypted</span>
               </div>
               <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">30-Day Guarantee</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}