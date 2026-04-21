import { RefreshCcw, ShieldCheck, Mail, MessageSquare } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl mb-4 uppercase italic">
            Return <span className="text-zinc-400">Centre</span>
          </h1>
          <p className="text-zinc-500 max-w-2xl mx-auto font-medium">
            Not perfectly satisfied? Our hassle-free return process ensures your experience remains premium from start to finish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center mb-4">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-900 mb-2 italic uppercase text-sm tracking-tight">30-Day Guarantee</h3>
            <p className="text-zinc-500 text-xs leading-relaxed">
              We offer a 30-day return window for all unused items in their original packaging.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center mb-4">
              <RefreshCcw className="text-white w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-900 mb-2 italic uppercase text-sm tracking-tight">Easy Exchange</h3>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Ordered the wrong size? Exchange it for the correct model within 14 days of receipt.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center mb-4">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-900 mb-2 italic uppercase text-sm tracking-tight">Full Refund</h3>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Once inspected, refunds are processed back to your original payment method within 5 days.
            </p>
          </div>
        </div>

        <div className="bg-zinc-50 rounded-3xl p-8 md:p-12 border border-zinc-100 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-2xl font-bold text-zinc-900 mb-8 uppercase italic tracking-tight">Start a Return</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Order Number</label>
                <input 
                  type="text" 
                  placeholder="e.g. #12345" 
                  className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Reason for Return</label>
              <select className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all appearance-none">
                <option>Select a reason...</option>
                <option>Ordered wrong model</option>
                <option>Damaged on arrival</option>
                <option>Changed my mind</option>
                <option>Defective product</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Additional Comments</label>
              <textarea 
                rows={4} 
                placeholder="Tell us more about the issue..." 
                className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all resize-none"
              ></textarea>
            </div>
            <button className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase text-xs tracking-[0.2em] hover:bg-zinc-800 transition-all transform hover:scale-[1.01] active:scale-[0.99]">
              Submit Inquiry
            </button>
          </form>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-zinc-900" />
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 text-sm uppercase italic mb-1">Email Us</h4>
              <p className="text-zinc-500 text-xs mb-1">Typical response time: 2-4 hours</p>
              <span className="text-black font-bold text-xs underline cursor-pointer hover:text-zinc-600 transition-colors">returns@velvetvue.com</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 text-zinc-900" />
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 text-sm uppercase italic mb-1">Live Chat</h4>
              <p className="text-zinc-500 text-xs mb-1">Available Mon-Fri, 9am - 6pm EST</p>
              <span className="text-black font-bold text-xs underline cursor-pointer hover:text-zinc-600 transition-colors">Start a conversation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
