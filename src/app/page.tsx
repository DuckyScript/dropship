import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

async function getProducts() {
  const products = await prisma.product.findMany({
    where: { featured: true },
  });
  
  return products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    price: p.price,
    compareAtPrice: p.compareAtPrice ?? undefined,
    images: JSON.parse(p.images || "[]"),
    category: p.category,
    inStock: p.inStock,
    featured: p.featured,
  }));
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="overflow-hidden bg-white">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-zinc-50">
        <div className="absolute inset-0 z-0 opacity-40">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_20%,_rgba(0,0,0,0.05)_0%,_transparent_50%)]"></div>
        </div>
        
        <div className="section-container relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-zinc-200 bg-white text-zinc-900 text-[10px] font-bold uppercase tracking-[0.2em] mb-10 animate-fade-in shadow-sm">
              <span>Edition 2026</span>
              <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
              <span className="text-zinc-400">Limited Release</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-zinc-900 mb-8 tracking-tighter animate-fade-in-up leading-[0.9] text-balance">
              The Art of <br />
              <span className="italic font-light text-zinc-400">Protection.</span>
            </h1>
            <p className="text-xl text-zinc-500 mb-12 max-w-2xl mx-auto animate-fade-in-up animation-delay-100 text-balance leading-relaxed font-medium">
              A curated collection of premium essentials designed for those who demand excellence in every detail. Military-grade strength, artisan-grade finish.
            </p>
            <div className="flex flex-wrap justify-center gap-6 animate-fade-in-up animation-delay-200">
              <Link href="/products" className="bg-zinc-900 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs transition-all hover:bg-black hover:shadow-2xl hover:shadow-zinc-200 active:scale-95">
                Shop Collection
              </Link>
              <Link href="/orders" className="bg-white text-zinc-900 border border-zinc-200 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs transition-all hover:bg-zinc-50 active:scale-95">
                Track Shipment
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
        </div>
      </section>

      {/* Trust & Social Proof */}
      <section className="py-20 border-y border-zinc-100 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-shrink-0">
               <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-2">Featured In</p>
               <div className="flex items-center gap-8 opacity-30 grayscale contrast-125">
                  <span className="text-xl font-black tracking-tighter italic">VOGUE</span>
                  <span className="text-xl font-bold tracking-tight">GQ</span>
                  <span className="text-xl font-serif">Wired</span>
                  <span className="text-xl font-sans font-bold">Forbes</span>
               </div>
            </div>
            <div className="h-px w-24 bg-zinc-100 hidden md:block"></div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 flex-1">
              {[
                { title: "Express", desc: "Global Delivery" },
                { title: "Quality", desc: "Lifetime Warranty" },
                { title: "Secure", desc: "Encrypted Pay" },
                { title: "Returns", desc: "30-Day Window" }
              ].map((feature, i) => (
                <div key={i} className="text-center md:text-left">
                  <h3 className="font-bold text-zinc-900 text-[10px] uppercase tracking-[0.2em] mb-1">{feature.title}</h3>
                  <p className="text-xs text-zinc-400 font-bold">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-container bg-white">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
               <span className="w-8 h-px bg-zinc-900"></span>
               <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-900">Curated Series</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tighter mb-4 leading-none">The Essentials</h2>
            <p className="text-zinc-500 font-medium">The pieces we're known for. Hand-selected for the modern minimalist.</p>
          </div>
          <Link href="/products" className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-900 hover:text-zinc-500 transition-colors border-b-2 border-zinc-900 pb-1">
            Explore All 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>
      
      {/* Statement Section */}
      <section className="bg-zinc-900 text-white py-24 md:py-40 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
           <div className="grid grid-cols-12 h-full w-full">
              {Array.from({length: 144}).map((_, i) => (
                 <div key={i} className="border-[0.5px] border-white/20 aspect-square"></div>
              ))}
           </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-10 tracking-tighter leading-none italic">Experience <br /> VELVET & VUE</h2>
          <p className="text-xl text-zinc-400 mb-14 leading-relaxed max-w-2xl mx-auto font-medium">
            Join a global community of 50,000+ individuals who refuse to compromise on quality. Crafted with precision, delivered with care.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
             <Link href="/products" className="bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs transition-all hover:bg-zinc-200 active:scale-95 inline-block">
               Start Shopping
             </Link>
             <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                   <div key={i} className="w-12 h-12 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
                      {i === 4 ? "+50k" : ""}
                   </div>
                ))}
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}