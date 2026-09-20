'use client';

import { useState } from 'react';
import { Send, CheckCircle, MessageSquare, Sparkles } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General Inquiry',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        category: 'General Inquiry',
        subject: '',
        message: '',
      });
    }, 800);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm relative overflow-hidden">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-9 h-9 rounded-xl bg-[#12544F]/10 text-[#12544F] flex items-center justify-center">
          <MessageSquare className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold text-[#092328]">Send Us a Message</h2>
      </div>

      {status === 'success' && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-900 animate-in fade-in duration-300">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-bold block">Thank you! Your message has been received.</span>
            Our support team will respond to your email within 24 hours.
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Alex Morgan"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2A835F] focus:ring-2 focus:ring-[#2A835F]/20 text-slate-900 text-sm outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="alex@example.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2A835F] focus:ring-2 focus:ring-[#2A835F]/20 text-slate-900 text-sm outline-none transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Inquiry Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2A835F] focus:ring-2 focus:ring-[#2A835F]/20 text-slate-900 text-sm outline-none transition bg-white"
            >
              <option value="General Inquiry">General Inquiry</option>
              <option value="Booking Assistance">Booking Assistance</option>
              <option value="Fleet & Vehicles">Fleet & Vehicles</option>
              <option value="Technical Support">Technical Support</option>
              <option value="Feedback / Academic">Feedback / Academic</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Subject *
            </label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="How can we help?"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2A835F] focus:ring-2 focus:ring-[#2A835F]/20 text-slate-900 text-sm outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Message *
          </label>
          <textarea
            rows={4}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Type your message or inquiry here..."
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2A835F] focus:ring-2 focus:ring-[#2A835F]/20 text-slate-900 text-sm outline-none transition resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#2A835F] hover:bg-[#20694B] text-white font-semibold text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {status === 'submitting' ? (
            <span>Sending...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Inquiry</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
