"use client";

import React from "react";
import { motion } from "framer-motion";
import { Car, CalendarCheck, CreditCard, Compass } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Car,
      title: "Choose a Vehicle",
      description: "Browse our diverse fleet of economy sedans, family SUVs, and executive cars with verified specs.",
    },
    {
      number: "02",
      icon: CalendarCheck,
      title: "Select Rental Dates",
      description: "Pick your pickup location and preferred trip dates with instant real-time rate calculations.",
    },
    {
      number: "03",
      icon: CreditCard,
      title: "Confirm Booking",
      description: "Review your transparent invoice, verify your contact details, and secure your booking code.",
    },
    {
      number: "04",
      icon: Compass,
      title: "Enjoy Your Journey",
      description: "Pick up your keys at our convenient hubs or airport counters and experience the freedom of the road.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#092328] text-white relative overflow-hidden w-full">
      {/* Background glow */}
      <div className="absolute -top-24 left-1/3 w-96 h-96 bg-[#8BBB92]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8BBB92] mb-2">
            Seamless Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            How It Works
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            Getting behind the wheel of your ideal vehicle takes only four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative bg-[#12544F]/40 border border-[#2A835F]/40 rounded-2xl p-6 backdrop-blur-sm group hover:border-[#8BBB92] hover:bg-[#12544F]/70 transition-all duration-300"
              >
                {/* Step badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#2A835F]/20 text-[#8BBB92] flex items-center justify-center group-hover:bg-[#2A835F] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-[#12544F] group-hover:text-[#8BBB92]/80 transition-colors">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#8BBB92] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
