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

    // Simulate order
    await new Promise((r) => setTimeout(r, 1500));

    setStep("done");
    clearCart();
    setIsProcessing(false);
  };

  if (items.length === 0 && step !== "done") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/products" className="text-gray-600 underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (step === "done") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Order received!</h1>
        <p className="text-gray-600 mb-6">We'll contact you shortly.</p>
        <Link href="/products" className="underline text-gray-600">
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <span className={`text-sm ${step === "cart" ? "font-semibold" : "text-gray-400"}`}>Cart</span>
        <span className="text-gray-300">→</span>
        <span className={`text-sm ${step === "info" ? "font-semibold" : "text-gray-400"}`}>Info</span>
        <span className="text-gray-300">→</span>
        <span className={`text-sm ${step === "payment" ? "font-semibold" : "text-gray-400"}`}>Pay</span>
      </div>

      {step === "cart" && (
        <div>
          <h1 className="text-2xl font-bold mb-6">Your cart</h1>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden relative">
                  <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button onClick={() => setStep("info")} className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium">
            Continue
          </button>
        </div>
      )}

      {step === "info" && (
        <form onSubmit={handleInfoSubmit}>
          <h1 className="text-2xl font-bold mb-6">Your details</h1>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full name"
              value={info.name}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
              required
              className="w-full p-3 border border-gray-200 rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              value={info.email}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
              required
              className="w-full p-3 border border-gray-200 rounded-lg"
            />
            <input
              type="text"
              placeholder="Address"
              value={info.address}
              onChange={(e) => setInfo({ ...info, address: e.target.value })}
              required
              className="w-full p-3 border border-gray-200 rounded-lg"
            />
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="City"
                value={info.city}
                onChange={(e) => setInfo({ ...info, city: e.target.value })}
                required
                className="w-full p-3 border border-gray-200 rounded-lg"
              />
              <input
                type="text"
                placeholder="State"
                value={info.state}
                onChange={(e) => setInfo({ ...info, state: e.target.value })}
                required
                className="w-full p-3 border border-gray-200 rounded-lg"
              />
              <input
                type="text"
                placeholder="ZIP"
                value={info.zip}
                onChange={(e) => setInfo({ ...info, zip: e.target.value })}
                required
                className="w-full p-3 border border-gray-200 rounded-lg"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button type="button" onClick={() => setStep("cart")} className="flex-1 py-3 border border-gray-200 rounded-lg">
              Back
            </button>
            <button type="submit" className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-medium">
              Continue to payment
            </button>
          </div>
        </form>
      )}

      {step === "payment" && (
        <form onSubmit={handlePaymentSubmit}>
          <h1 className="text-2xl font-bold mb-6">Payment</h1>
          
          {/* Payment Method Selection */}
          <div className="flex gap-3 mb-6">
            <button
              type="button"
              onClick={() => setPayment({ ...payment, method: "card" })}
              className={`flex-1 p-4 border rounded-lg ${payment.method === "card" ? "border-gray-900 bg-gray-50" : "border-gray-200"}`}
            >
              Card
            </button>
            <button
              type="button"
              onClick={() => setPayment({ ...payment, method: "crypto" })}
              className={`flex-1 p-4 border rounded-lg ${payment.method === "crypto" ? "border-gray-900 bg-gray-50" : "border-gray-200"}`}
            >
              Crypto
            </button>
            <button
              type="button"
              onClick={() => setPayment({ ...payment, method: "cod" })}
              className={`flex-1 p-4 border rounded-lg ${payment.method === "cod" ? "border-gray-900 bg-gray-50" : "border-gray-200"}`}
            >
              COD
            </button>
          </div>

          {payment.method === "card" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500 mb-4">Demo only. No real payment.</p>
              <input
                type="text"
                placeholder="Card number"
                className="w-full p-3 border border-gray-200 rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM/YY" className="w-full p-3 border border-gray-200 rounded-lg" />
                <input type="text" placeholder="CVC" className="w-full p-3 border border-gray-200 rounded-lg" />
              </div>
            </div>
          )}

          {payment.method === "crypto" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500 mb-4">Send payment and include order details.</p>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-2">BTC Address</p>
                <p className="font-mono text-sm">your-btc-address-here</p>
              </div>
              <input
                type="text"
                placeholder="Transaction ID (optional)"
                value={payment.btcAddress}
                onChange={(e) => setPayment({ ...payment, btcAddress: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-lg"
              />
            </div>
          )}

          {payment.method === "cod" && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Pay when you receive the package.</p>
            </div>
          )}

          <textarea
            placeholder="Notes (optional)"
            value={payment.notes}
            onChange={(e) => setPayment({ ...payment, notes: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg mt-4"
            rows={2}
          />

          <div className="border-t pt-4 mt-6 mb-6">
            <div className="flex justify-between font-bold">
              <span>Amount</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button type="button" onClick={() => setStep("info")} className="flex-1 py-3 border border-gray-200 rounded-lg">
              Back
            </button>
            <button type="submit" disabled={isProcessing} className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-medium disabled:opacity-50">
              {isProcessing ? "Processing..." : "Place Order"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}