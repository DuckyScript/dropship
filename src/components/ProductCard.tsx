"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden card-hover">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-square relative bg-gray-50">
          <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
          {product.compareAtPrice && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded">
              Sale
            </span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{product.category}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-medium text-gray-900 hover:text-gray-600 line-clamp-1">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-semibold text-gray-900">${product.price.toFixed(2)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-gray-400 line-through">${product.compareAtPrice.toFixed(2)}</span>
          )}
        </div>
        <button
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          className="w-full mt-3 bg-gray-900 text-white py-2 rounded hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}