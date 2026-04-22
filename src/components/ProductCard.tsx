"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div 
      className="product-card card-hover group animate-fade-in-up" 
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-[4/5] relative bg-zinc-50 overflow-hidden">
          <Image 
            src={product.images[0]} 
            alt={product.name} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          {product.compareAtPrice && (
            <span className="absolute top-3 left-3 bg-white text-black text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider">
              Sale
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
              <span className="text-sm font-bold uppercase tracking-widest text-zinc-900">Sold Out</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">{product.category}</p>
          <div className="flex items-center gap-1">
             <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-900"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
             <span className="text-[10px] font-bold text-zinc-900 tracking-tighter">4.9</span>
          </div>
        </div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-bold text-zinc-900 group-hover:text-zinc-500 transition-colors line-clamp-1 text-lg leading-tight mb-3 tracking-tight">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-900">${product.price.toFixed(2)}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-zinc-400 line-through">${product.compareAtPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className="group/btn relative h-10 w-10 flex items-center justify-center bg-zinc-900 text-white rounded-full transition-all hover:w-32 hover:bg-black active:scale-95 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:cursor-not-allowed overflow-hidden"
          >
            <span className="absolute left-1/2 -translate-x-1/2 transition-all group-hover/btn:opacity-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </span>
            <span className="opacity-0 group-hover/btn:opacity-100 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-opacity">
              Add to Bag
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}