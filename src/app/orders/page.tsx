"use client";

import { useState } from "react";
import Link from "next/link";

interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  total: number;
  status: string;
  items: any[];
}

export default function OrdersPage() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchOrders = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/orders?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending": return "bg-zinc-100 text-zinc-900 border-zinc-200";
      case "shipped": return "bg-blue-50 text-blue-700 border-blue-100";
      case "delivered": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "cancelled": return "bg-rose-50 text-rose-700 border-rose-100";
      default: return "bg-zinc-50 text-zinc-500 border-zinc-100";
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="section-container max-w-4xl">
        <div className="max-w-xl mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-zinc-900 tracking-tight mb-4">Track Order</h1>
          <p className="text-xl text-zinc-500 leading-relaxed">Enter your email address to see your recent orders and delivery status.</p>
        </div>

        <div className="bg-zinc-50 p-8 md:p-10 rounded-3xl border border-zinc-100 animate-fade-in-up">
          <form onSubmit={fetchOrders} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 group">
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-14 pr-6 py-4 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none text-zinc-900 font-medium shadow-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary py-4 px-10 text-lg shadow-xl shadow-black/10 active:scale-95"
            >
              {loading ? "Searching..." : "Track Orders"}
            </button>
          </form>
        </div>

        {searched && (
          <div className="mt-16 space-y-8 animate-fade-in">
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <div 
                  key={order.id} 
                  className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-8 border-b border-zinc-50 flex flex-wrap justify-between items-center gap-8">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Order ID</p>
                      <p className="font-bold text-zinc-900 text-lg">{order.orderNumber}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Placed On</p>
                      <p className="text-zinc-900 font-bold">{new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Total Amount</p>
                      <p className="text-zinc-900 font-bold text-lg">${order.total.toFixed(2)}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full border text-[10px] font-bold uppercase tracking-[0.15em] ${getStatusColor(order.status)}`}>
                      {order.status}
                    </div>
                  </div>
                  <div className="p-8 bg-zinc-50/50">
                    <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Package Contents</h4>
                    <div className="space-y-3">
                      {order.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center bg-white p-4 rounded-xl border border-zinc-100/50 shadow-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-zinc-900 font-bold">{item.name}</span>
                            <span className="text-zinc-400 text-xs">× {item.quantity}</span>
                          </div>
                          <span className="font-bold text-zinc-900">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-24 bg-zinc-50 rounded-3xl border border-dashed border-zinc-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-zinc-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-zinc-500 font-medium text-lg">No orders found for this email address.</p>
                <Link href="/products" className="mt-6 inline-block text-sm font-bold underline hover:text-zinc-400 transition-colors">
                  Start your first order
                </Link>
              </div>
            )}
          </div>
        )}

        <div className="mt-20 text-center">
          <Link href="/products" className="group flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
