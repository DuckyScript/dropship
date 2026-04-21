import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-xl font-bold text-white tracking-tight mb-6 block uppercase italic">
              VELVET <span className="text-zinc-500">& VUE</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Premium protection for your most essential devices. Designed with precision, built for the modern lifestyle.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Shop</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/products" className="hover:text-white transition-colors font-medium">All Collection</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors font-medium">New Arrivals</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors font-medium">Best Sellers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Support</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/orders" className="hover:text-white transition-colors font-medium">Track Order</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-white transition-colors font-medium">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors font-medium">Return Center</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Connect</h3>
            <div className="flex gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors cursor-pointer">
                <span className="text-xs font-bold text-white">IG</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors cursor-pointer">
                <span className="text-xs font-bold text-white">TW</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors cursor-pointer">
                <span className="text-xs font-bold text-white">FB</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} VELVET & VUE. Crafted with care.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}