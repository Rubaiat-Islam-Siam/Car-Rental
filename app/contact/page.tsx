import { Phone, Mail, MapPin, Clock, HelpCircle, ShieldCheck, Headphones } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact & Support | RideNest Vehicle Rentals',
  description: 'Get in touch with RideNest support team for vehicle inquiries, reservation help, and customer support.',
};

export default function ContactPage() {
  const faqs = [
    {
      q: 'How do I complete a vehicle booking?',
      a: 'Browse our fleet on the vehicles page, choose your desired model, select your pickup and return dates, and click Reserve. Once signed in, your booking is confirmed instantly!',
    },
    {
      q: 'What credentials or documents are required at pickup?',
      a: 'You will need a valid national driver’s license, government-issued photo ID, and your booking confirmation email upon pickup at our hub.',
    },
    {
      q: 'Can I view or manage my existing reservations?',
      a: 'Yes! Sign in to your customer account and navigate to "My Bookings" in the header to view status, booking details, and total rental costs.',
    },
    {
      q: 'How does admin vehicle management work in this prototype?',
      a: 'Log in with the admin credentials (admin@ridenest.com) to access the Admin Dashboard. From there, administrators can add new vehicles, update daily pricing, modify specs, and approve customer bookings.',
    },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen py-12 space-y-16">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12544F]/10 border border-[#2A835F]/20 text-xs font-semibold uppercase tracking-wider text-[#12544F]">
          <Headphones className="w-3.5 h-3.5 text-[#2A835F]" />
          <span>Customer Support & Assistance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#092328] tracking-tight">
          We’re Here to Help You Drive Smoothly
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Have questions about reserving a car, rental guidelines, or platform features? Reach out to our dedicated support team.
        </p>
      </section>

      {/* Info Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-[#2A835F]/40 transition">
            <div className="w-10 h-10 rounded-xl bg-[#12544F]/10 text-[#12544F] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#092328] text-base">Phone Hotline</h3>
            <p className="text-xs text-slate-600">24/7 Customer Care & Support</p>
            <div className="text-sm font-semibold text-[#2A835F] pt-1">
              +880 1700-000000
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-[#2A835F]/40 transition">
            <div className="w-10 h-10 rounded-xl bg-[#12544F]/10 text-[#12544F] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#092328] text-base">Email Support</h3>
            <p className="text-xs text-slate-600">Response within 24 hours</p>
            <div className="text-sm font-semibold text-[#2A835F] pt-1">
              support@ridenest.com
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-[#2A835F]/40 transition">
            <div className="w-10 h-10 rounded-xl bg-[#12544F]/10 text-[#12544F] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#092328] text-base">Main Pickup Hub</h3>
            <p className="text-xs text-slate-600">Downtown HQ & Airport Terminal</p>
            <div className="text-sm font-semibold text-[#092328] pt-1">
              Dhaka, Bangladesh
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-[#2A835F]/40 transition">
            <div className="w-10 h-10 rounded-xl bg-[#12544F]/10 text-[#12544F] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#092328] text-base">Working Hours</h3>
            <p className="text-xs text-slate-600">Vehicle Pickup & Drop-off</p>
            <div className="text-sm font-semibold text-[#092328] pt-1">
              Mon – Sun: 24/7 Open
            </div>
          </div>
        </div>
      </section>

      {/* Main Section: Contact Form + Project Context */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#092328] text-white rounded-3xl p-8 border border-[#12544F] shadow-lg space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#12544F] text-[#8BBB92]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Academic Support Hub</h3>
                <p className="text-xs text-slate-300">CSE 3206 – Software Engineering</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              RideNest is engineered by <strong>Group #04 (Section A)</strong> as a Prototype Model demonstration. Feedback from testing helps iterate booking requirements and fleet management features.
            </p>

            <div className="space-y-3 pt-2 text-xs border-t border-[#12544F]">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Course Code:</span>
                <span className="font-semibold text-white">CSE 3206 (Sessional)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Lab Assignment:</span>
                <span className="font-semibold text-white">Lab 2 MVP Development</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Process Model:</span>
                <span className="font-semibold text-[#8BBB92]">Prototype Model</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-[#092328] text-sm">Need Instant Credentials for Evaluation?</h4>
            <div className="space-y-2 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <span className="font-semibold text-[#12544F] block">Customer Login:</span>
                <code className="text-slate-800">customer@ridenest.com</code> (pw: password123)
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="font-semibold text-amber-700 block">Admin Login:</span>
                <code className="text-slate-800">admin@ridenest.com</code> (pw: password123)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#2A835F]">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#092328]">Common Questions & Answers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <h3 className="font-bold text-[#092328] text-base flex items-start gap-2">
                <span className="text-[#2A835F] font-black">Q.</span>
                <span>{faq.q}</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
