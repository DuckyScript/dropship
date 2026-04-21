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
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em] mb-3">{product.category}</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-6">{product.name}</h1>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-zinc-900">${product.price.toFixed(2)}</span>
                {product.compareAtPrice && (
                  <div className="flex items-center gap-3">
                    <span className="text-xl text-zinc-300 line-through">
                      ${product.compareAtPrice.toFixed(2)}
                    </span>
                    <span className="bg-zinc-100 text-zinc-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                      Save {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">Description</h3>
                <p className="text-zinc-600 leading-relaxed font-medium">{product.description}</p>
              </div>

              <div className="flex items-center gap-4 py-2">
                <div className={`px-4 py-2 rounded-full flex items-center gap-2 border ${
                  product.inStock 
                  ? "bg-emerald-50 border-emerald-100 text-emerald-700" 
                  : "bg-rose-50 border-rose-100 text-rose-700"
                }`}>
                  <span className={`w-2 h-2 rounded-full animate-pulse ${product.inStock ? "bg-emerald-500" : "bg-rose-500"}`} />
                  <span className="text-xs font-bold uppercase tracking-widest">{product.inStock ? "Ready to ship" : "Out of Stock"}</span>
                </div>
                {product.inStock && (
                  <span className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Ships worldwide</span>
                )}
              </div>

              <div className="pt-4">
                <AddToCartButton product={product} />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-zinc-100">
                <div>
                  <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Materials</h4>
                  <p className="text-sm font-bold text-zinc-900">Premium TPU / Vegan Leather</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Compatibility</h4>
                  <p className="text-sm font-bold text-zinc-900">iPhone 13 / 14 / 15 Series</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}