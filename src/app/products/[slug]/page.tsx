import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import AddToCartButton from "@/components/AddToCartButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} - Dropship`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      <div className="section-container">
        <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 mb-12 animate-fade-in">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span className="text-zinc-200">/</span>
          <Link href="/products" className="hover:text-black transition-colors">Products</Link>
          <span className="text-zinc-200">/</span>
          <span className="text-zinc-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <div className="animate-scale-in">
            <div className="aspect-[4/5] relative bg-zinc-50 rounded-3xl overflow-hidden group">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              {product.compareAtPrice && (
                <span className="absolute top-6 left-6 bg-white text-black text-xs font-bold px-4 py-2 rounded-full shadow-xl uppercase tracking-widest">
                  Special Offer
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center animate-fade-in-up animation-delay-100">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em]">{product.category}</p>
                <span className="w-1 h-1 rounded-full bg-zinc-200"></span>
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-900"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">4.9/5 (128 reviews)</span>
                </div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-6">{product.name}</h1>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-zinc-900">${product.price.toFixed(2)}</span>
                {product.compareAtPrice && (
                  <div className="flex items-center gap-3">
                    <span className="text-xl text-zinc-300 line-through">
                      ${product.compareAtPrice.toFixed(2)}
                    </span>
                    <span className="bg-zinc-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                      Save {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <div className="prose prose-zinc prose-sm">
                <p className="text-zinc-600 leading-relaxed font-medium text-base">{product.description}</p>
              </div>

              <div className="flex flex-wrap items-center gap-6 py-4 border-y border-zinc-100">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${product.inStock ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900">{product.inStock ? "In Stock & Ready to ship" : "Out of Stock"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">2-Year Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Free Worldwide Shipping</span>
                </div>
              </div>

              <div className="pt-2">
                <AddToCartButton product={product} />
              </div>
              
              <div className="bg-zinc-50 rounded-2xl p-6 flex items-center justify-between border border-zinc-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-900"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-0.5">Secure Checkout</h4>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">SSL Encrypted Payment</p>
                  </div>
                </div>
                <div className="flex gap-2 opacity-40 grayscale">
                   {/* Mock Payment Icons */}
                   <div className="w-8 h-5 bg-zinc-300 rounded-sm"></div>
                   <div className="w-8 h-5 bg-zinc-300 rounded-sm"></div>
                   <div className="w-8 h-5 bg-zinc-300 rounded-sm"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Materials</h4>
                  <p className="text-sm font-bold text-zinc-900">Premium Grade-A Quality</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Compatibility</h4>
                  <p className="text-sm font-bold text-zinc-900">Universal Fit / Multi-Device</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}