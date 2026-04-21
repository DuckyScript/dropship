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
      <div className="section-container min-h-[60vh] flex flex-col items-center justify-center text-center animate-fade-in">
        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-muted" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-4">Your cart is empty</h1>
        <p className="text-muted mb-8 max-w-md">
          Looks like you haven't added any premium phone cases to your cart yet.
        </p>
        <Link href="/products" className="btn-primary">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="section-container animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => router.back()}
          className="p-2 hover:bg-secondary rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-4xl font-bold tracking-tight">Shopping Bag</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-card border border-border animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link href={`/products/${item.slug}`} className="shrink-0">
                <div className="w-full sm:w-32 h-40 relative rounded-xl overflow-hidden bg-secondary">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </Link>

              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="flex justify-between items-start">
                  <div>
                    <Link
                      href={`/products/${item.slug}`}
                      className="text-xl font-semibold hover:text-zinc-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-muted mt-1 text-sm">Premium Protection Case</p>
                  </div>
                  <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-1 bg-secondary rounded-full p-1">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="p-8 rounded-3xl bg-zinc-900 text-white shadow-2xl">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-white">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Shipping</span>
                  <span className="text-green-400 uppercase text-xs font-bold tracking-widest flex items-center">Free</span>
                </div>
                <div className="flex justify-between text-zinc-400 pb-2">
                  <span>Tax</span>
                  <span className="text-white">$0.00</span>
                </div>
                <div className="border-t border-zinc-800 pt-4 flex justify-between items-end">
                  <div>
                    <p className="text-sm text-zinc-400">Total Amount</p>
                    <p className="text-3xl font-bold">${totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <Link
                href="/checkout"
                className="w-full btn-primary bg-white text-black hover:bg-zinc-200 mt-8 py-4 text-lg"
              >
                Proceed to Checkout
              </Link>
            </div>

            <div className="p-6 rounded-2xl border border-dashed border-border text-center">
              <p className="text-sm text-muted">
                Secure SSL Encryption & 30-Day Money Back Guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}