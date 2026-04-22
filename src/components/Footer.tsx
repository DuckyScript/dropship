import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-50 text-zinc-400 py-32 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-8 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-5">
            <Link href="/" className="text-xl font-black text-zinc-900 tracking-[0.3em] mb-8 block uppercase italic">
              VELVET <span className="text-zinc-300 font-light">&</span> VUE
            </Link>
            <p className="text-sm leading-relaxed max-w-sm font-medium text-zinc-500">
              The Art of Protection. We create precision-engineered essentials for the modern minimalist who demands both style and substance.
            </p>
            <div className="mt-10 flex gap-4">
               {['Instagram', 'Twitter', 'Journal'].map(social => (
                  <button key={social} className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 hover:text-zinc-400 transition-colors">
                     {social}
                  </button>
               ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-zinc-900 font-bold text-[10px] uppercase tracking-[0.2em] mb-8">The Series</h3>
            <ul className="space-y-4 text-xs font-bold tracking-widest uppercase">
              <li><Link href="/products" className="hover:text-zinc-900 transition-colors">All Pieces</Link></li>
              <li><Link href="/products" className="hover:text-zinc-900 transition-colors">New Releases</Link></li>
              <li><Link href="/products" className="hover:text-zinc-900 transition-colors">Best Sellers</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-zinc-900 font-bold text-[10px] uppercase tracking-[0.2em] mb-8">Service</h3>
            <ul className="space-y-4 text-xs font-bold tracking-widest uppercase">
              <li><Link href="/orders" className="hover:text-zinc-900 transition-colors">Tracking</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-zinc-900 transition-colors">Shipping</Link></li>
              <li><Link href="/returns" className="hover:text-zinc-900 transition-colors">Returns</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <h3 className="text-zinc-900 font-bold text-[10px] uppercase tracking-[0.2em] mb-8">Newsletter</h3>
            <p className="text-xs font-medium text-zinc-500 mb-6 leading-relaxed">Join the collective for exclusive early access and artisan updates.</p>
            <div className="relative">
               <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full bg-white border border-zinc-200 rounded-full py-3 px-6 text-xs font-bold tracking-tight outline-none focus:border-zinc-900 transition-colors"
               />
               <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-zinc-900 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
               </button>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-200 mt-24 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em]">
          <p className="text-zinc-400">&copy; {new Date().getFullYear()} VELVET & VUE. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="text-zinc-900 hover:text-zinc-400 transition-colors">Privacy</Link>
            <Link href="#" className="text-zinc-900 hover:text-zinc-400 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}