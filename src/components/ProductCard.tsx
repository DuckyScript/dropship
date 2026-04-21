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
      <div className="p-5">
        <div className="flex justify-between items-start mb-1">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{product.category}</p>
        </div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-zinc-900 group-hover:text-zinc-600 transition-colors line-clamp-1 text-lg leading-tight mb-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mb-4">
          <span className="font-bold text-zinc-900">${product.price.toFixed(2)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-zinc-400 line-through">${product.compareAtPrice.toFixed(2)}</span>
          )}
        </div>
        <button
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          className="w-full bg-black text-white py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-[0.98] disabled:bg-zinc-100 disabled:text-zinc-400 disabled:cursor-not-allowed"
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}