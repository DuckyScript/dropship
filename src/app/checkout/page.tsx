"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

type Step = "cart" | "info" | "payment" | "done";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [isProcessing, setIsProcessing] = useState(false);

  const [info, setInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [payment, setPayment] = useState({
    method: "card",
    btcAddress: "",
    notes: "",
  });

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // 1. Create the order in the database
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: info.name,
          customerEmail: info.email,
          address: `${info.address}, ${info.city}, ${info.state} ${info.zip}`,
          items: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
          total: totalPrice,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create order");
      }

      // 2. Clear cart and show success
      setStep("done");
      clearCart();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong with your order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0 && step !== "done") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center animate-fade-in">
        <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 mb-4 tracking-tight">Your cart is empty</h1>
        <p className="text-zinc-500 mb-8 font-medium">Looks like you haven't added any premium cases to your cart yet.</p>
        <Link href="/products" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  if (step === "done") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center animate-scale-in">
        <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-zinc-200">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4 tracking-tight">Order Confirmed</h1>
        <p className="text-zinc-500 mb-10 text-lg font-medium leading-relaxed">Thank you for your purchase. We've received your order and we're getting it ready for shipment. You'll receive a confirmation email shortly.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/orders" className="btn-primary px-8">
            Track Your Order
          </Link>
          <Link href="/products" className="btn-outline px-8">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress */}
        <div className="flex items-center justify-center gap-6 mb-16 animate-fade-in">
          {[
            { id: "cart", label: "Cart" },
            { id: "info", label: "Shipping" },
            { id: "payment", label: "Payment" }
          ].map((s, i) => (
            <div key={s.id} className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s.id 
                  ? "bg-black text-white ring-4 ring-zinc-100" 
                  : i < ["cart", "info", "payment"].indexOf(step)
                    ? "bg-zinc-100 text-zinc-900"
                    : "bg-zinc-50 text-zinc-300"
                }`}>
                  {i + 1}
                </span>
                <span className={`text-sm font-bold uppercase tracking-widest ${
                  step === s.id ? "text-zinc-900" : "text-zinc-400"
                }`}>
                  {s.label}
                </span>
              </div>
              {i < 2 && <div className="h-px w-8 bg-zinc-100 hidden sm:block"></div>}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden animate-fade-in-up">
          <div className="p-8 md:p-12">
            {step === "cart" && (
              <div className="animate-fade-in">
                <h1 className="text-3xl font-bold text-zinc-900 mb-8 tracking-tight">Review Cart</h1>
                <div className="space-y-6 mb-10">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-6 p-4 bg-zinc-50 rounded-2xl group transition-all hover:bg-zinc-100/50">
                      <div className="w-20 h-24 bg-white rounded-xl overflow-hidden relative shadow-sm">
                        <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">{item.category}</p>
                        <h3 className="font-bold text-zinc-900 text-lg mb-1">{item.name}</h3>
                        <p className="text-zinc-500 text-sm font-medium">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-zinc-900 text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-zinc-100 pt-8 mb-10">
                  <div className="flex justify-between items-center text-2xl font-bold text-zinc-900">
                    <span className="tracking-tight text-zinc-400 uppercase text-sm tracking-widest">Grand Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setStep("info")} 
                  className="w-full btn-primary py-4 text-lg"
                >
                  Proceed to Shipping
                </button>
              </div>
            )}

            {step === "info" && (
              <form onSubmit={handleInfoSubmit} className="animate-fade-in">
                <h1 className="text-3xl font-bold text-zinc-900 mb-8 tracking-tight">Shipping Information</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-4">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={info.name}
                      onChange={(e) => setInfo({ ...info, name: e.target.value })}
                      required
                      className="w-full px-6 py-4 bg-zinc-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none text-zinc-900 font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-4">Email Address</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={info.email}
                      onChange={(e) => setInfo({ ...info, email: e.target.value })}
                      required
                      className="w-full px-6 py-4 bg-zinc-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none text-zinc-900 font-medium"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-4">Street Address</label>
                    <input
                      type="text"
                      placeholder="House number and street name"
                      value={info.address}
                      onChange={(e) => setInfo({ ...info, address: e.target.value })}
                      required
                      className="w-full px-6 py-4 bg-zinc-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none text-zinc-900 font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-4">City</label>
                    <input
                      type="text"
                      placeholder="City"
                      value={info.city}
                      onChange={(e) => setInfo({ ...info, city: e.target.value })}
                      required
                      className="w-full px-6 py-4 bg-zinc-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none text-zinc-900 font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-4">State</label>
                      <input
                        type="text"
                        placeholder="State"
                        value={info.state}
                        onChange={(e) => setInfo({ ...info, state: e.target.value })}
                        required
                        className="w-full px-6 py-4 bg-zinc-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none text-zinc-900 font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-4">ZIP Code</label>
                      <input
                        type="text"
                        placeholder="ZIP"
                        value={info.zip}
                        onChange={(e) => setInfo({ ...info, zip: e.target.value })}
                        required
                        className="w-full px-6 py-4 bg-zinc-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none text-zinc-900 font-medium"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-12">
                  <button type="button" onClick={() => setStep("cart")} className="flex-1 btn-outline py-4">
                    Back to Cart
                  </button>
                  <button type="submit" className="flex-1 btn-primary py-4">
                    Continue to Payment
                  </button>
                </div>
              </form>
            )}

            {step === "payment" && (
              <form onSubmit={handlePaymentSubmit} className="animate-fade-in">
                <h1 className="text-3xl font-bold text-zinc-900 mb-8 tracking-tight">Payment Method</h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                  {[
                    { id: "card", label: "Credit Card", icon: "💳" },
                    { id: "crypto", label: "Crypto", icon: "🪙" },
                    { id: "cod", label: "Cash on Delivery", icon: "🚚" }
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPayment({ ...payment, method: method.id })}
                      className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${
                        payment.method === method.id 
                        ? "border-black bg-zinc-50 shadow-md shadow-zinc-100" 
                        : "border-zinc-50 hover:border-zinc-200"
                      }`}
                    >
                      <span className="text-2xl mb-2">{method.icon}</span>
                      <span className="text-xs font-bold uppercase tracking-widest">{method.label}</span>
                    </button>
                  ))}
                </div>

                <div className="bg-zinc-50 rounded-3xl p-8 mb-10 border border-zinc-100">
                  {payment.method === "card" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Card Details</p>
                        <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded uppercase font-bold tracking-widest">Secure</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="w-full px-6 py-4 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none text-zinc-900 font-medium"
                      />
                      <div className="grid grid-cols-2 gap-6">
                        <input 
                          type="text" 
                          placeholder="Expiry (MM/YY)" 
                          className="w-full px-6 py-4 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none text-zinc-900 font-medium" 
                        />
                        <input 
                          type="text" 
                          placeholder="CVC" 
                          className="w-full px-6 py-4 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none text-zinc-900 font-medium" 
                        />
                      </div>
                    </div>
                  )}

                  {payment.method === "crypto" && (
                    <div className="space-y-6">
                      <div className="p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">BTC Wallet Address</p>
                        <p className="font-mono text-xs break-all text-zinc-900 bg-zinc-50 p-3 rounded-lg border border-zinc-100">bc1qxy2kgdy6jrsqz7v6n3p7m9sl440x95z8v8p6</p>
                      </div>
                      <input
                        type="text"
                        placeholder="Transaction Hash (Optional)"
                        value={payment.btcAddress}
                        onChange={(e) => setPayment({ ...payment, btcAddress: e.target.value })}
                        className="w-full px-6 py-4 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none text-zinc-900 font-medium"
                      />
                    </div>
                  )}

                  {payment.method === "cod" && (
                    <div className="text-center py-6">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-100">
                        <span className="text-2xl">🚚</span>
                      </div>
                      <p className="text-zinc-600 font-medium">Please have the exact amount ready when your package arrives.</p>
                    </div>
                  )}
                </div>

                <div className="border-t border-zinc-100 pt-8 mt-10 mb-10">
                  <div className="flex justify-between items-center text-2xl font-bold text-zinc-900">
                    <span className="tracking-tight text-zinc-400 uppercase text-sm tracking-widest">Total Payable</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button type="button" onClick={() => setStep("info")} className="flex-1 btn-outline py-4">
                    Back to Shipping
                  </button>
                  <button type="submit" disabled={isProcessing} className="flex-1 btn-primary py-4 disabled:opacity-50">
                    {isProcessing ? "Processing..." : "Confirm & Pay"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}