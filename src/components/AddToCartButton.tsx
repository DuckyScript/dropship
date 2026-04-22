"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Select Quantity</span>
        <div className="flex items-center bg-zinc-50 rounded-full border border-zinc-100 p-1">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all text-zinc-600 active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
          <span className="w-8 text-center font-bold text-sm text-zinc-900">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all text-zinc-600 active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
        </div>
      </div>

      <button
        onClick={handleAdd}
        disabled={!product.inStock}
        className={`w-full py-5 rounded-full font-bold uppercase tracking-[0.15em] text-sm transition-all duration-300 relative overflow-hidden group active:scale-[0.98] ${
          added
            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100"
            : "bg-zinc-900 text-white hover:bg-zinc-800 shadow-xl shadow-zinc-200 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:shadow-none"
        }`}
      >
        <span className={`flex items-center justify-center gap-2 transition-transform duration-300 ${added ? "translate-y-0" : ""}`}>
          {added ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Added to Cart
            </>
          ) : product.inStock ? (
            "Add to Collection"
          ) : (
            "Sold Out"
          )}
        </span>
      </button>
    </div>
  );
}