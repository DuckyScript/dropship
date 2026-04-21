import Link from "next/link";
import { Truck, Globe, Clock, ShieldCheck } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl mb-4 uppercase italic">
            Shipping <span className="text-zinc-400">Policy</span>
          </h1>
          <p className="text-zinc-500 max-w-2xl mx-auto font-medium">
            At VELVET & VUE, we ensure your premium protection arrives safely and swiftly, no matter where you are in the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-zinc-200 transition-all group animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Globe className="text-white w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-3">Global Delivery</h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              We ship to over 50 countries worldwide. Every order is handled with extreme care and tracked from our door to yours.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-zinc-200 transition-all group animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Clock className="text-white w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-3">Processing Time</h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              Orders are typically processed within 24-48 business hours. During collection drops, please allow up to 3 business days.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-zinc-200 transition-all group animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Truck className="text-white w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-3">Shipping Methods</h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              Standard Shipping (7-14 days) is complimentary on orders over $50. Express Shipping (3-5 days) is available at checkout.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-zinc-200 transition-all group animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-3">Fully Insured</h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              Every VELVET & VUE shipment is fully insured against loss or damage during transit for your peace of mind.
            </p>
          </div>
        </div>

        <div className="prose prose-zinc max-w-none animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <h2 className="text-2xl font-bold text-zinc-900 mb-6 uppercase tracking-tight italic">Detailed Information</h2>
          <div className="space-y-8 text-zinc-600">
            <section>
              <h4 className="text-zinc-900 font-bold uppercase text-xs tracking-widest mb-3">1. Tracking Your Order</h4>
              <p className="text-sm leading-relaxed">
                Once your order has been dispatched, you will receive a shipping confirmation email containing your tracking number and a link to track your package. You can also track your order directly on our <Link href="/orders" className="text-black underline font-bold hover:text-zinc-600 transition-colors">Order Tracking</Link> page.
              </p>
            </section>
            
            <section>
              <h4 className="text-zinc-900 font-bold uppercase text-xs tracking-widest mb-3">2. Customs, Duties & Taxes</h4>
              <p className="text-sm leading-relaxed">
                VELVET & VUE is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).
              </p>
            </section>

            <section>
              <h4 className="text-zinc-900 font-bold uppercase text-xs tracking-widest mb-3">3. Damaged Goods</h4>
              <p className="text-sm leading-relaxed">
                If you received your order damaged, please contact our support team at <span className="text-black font-bold underline cursor-pointer">support@velvetvue.com</span> within 48 hours of delivery. Please save all packaging materials and damaged goods before filing a claim.
              </p>
            </section>
          </div>
        </div>

        <div className="mt-20 p-8 rounded-3xl bg-zinc-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <div>
            <h3 className="text-2xl font-bold mb-2 uppercase italic">Need help with an order?</h3>
            <p className="text-zinc-400 text-sm">Our support team is available 24/7 for your convenience.</p>
          </div>
          <Link href="/returns" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-zinc-200 transition-all transform hover:scale-105">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
