import Link from "next/link";
import ProductCard from "@/components/ProductCard";

async function getProducts() {
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();
  const products = await prisma.product.findMany({
    where: { featured: true },
  });
  await prisma.$disconnect();
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
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center bg-zinc-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-zinc-200 rounded-full blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-200 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest mb-6 animate-fade-in">
              <span>New Arrival</span>
              <span className="w-1 h-1 rounded-full bg-white animate-ping"></span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 mb-6 tracking-tight animate-fade-in-up leading-[1.1] text-balance">
              Protection that <br />
              <span className="text-zinc-400">Reflects Your Style.</span>
            </h1>
            <p className="text-xl text-zinc-500 mb-10 max-w-xl animate-fade-in-up animation-delay-100 text-balance leading-relaxed">
              Discover our curated collection of premium phone cases designed for the modern lifestyle. Minimalist, durable, and uniquely yours.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-200">
              <Link href="/products" className="btn-primary px-8">
                Explore Collection
              </Link>
              <Link href="/orders" className="btn-outline px-8">
                Track My Order
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-y border-zinc-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: "Fast Shipping", desc: "Worldwide in 3-5 days" },
              { title: "Premium Quality", desc: "Military-grade protection" },
              { title: "Secure Checkout", desc: "100% protected payments" },
              { title: "Easy Returns", desc: "30-day money back" }
            ].map((feature, i) => (
              <div key={i} className="text-center md:text-left">
                <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wider mb-1">{feature.title}</h3>
                <p className="text-xs text-zinc-500 font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-container bg-white">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold text-zinc-900 tracking-tight mb-4">Featured Picks</h2>
            <p className="text-zinc-500 font-medium">Hand-selected favorites from our latest drop. Built for protection, designed for expression.</p>
          </div>
          <Link href="/products" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-900 hover:text-zinc-500 transition-colors">
            View All 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-zinc-900 text-white py-20 md:py-32 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-500 via-transparent to-transparent"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Ready to Upgrade Your Device?</h2>
          <p className="text-xl text-zinc-400 mb-10 leading-relaxed max-w-2xl mx-auto">Join 10,000+ happy customers who trust CASESTORE for their device protection.</p>
          <Link href="/products" className="bg-white text-black px-10 py-4 rounded-full font-bold transition-all hover:bg-zinc-200 active:scale-95 inline-block">
            Shop the Collection
          </Link>
        </div>
      </section>
    </div>
  );
}