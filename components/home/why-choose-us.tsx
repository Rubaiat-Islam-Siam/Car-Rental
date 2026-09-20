import React from "react";
import { ShieldCheck, Tag, Zap, Headphones } from "lucide-react";

export function WhyChooseUs() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Verified Vehicles",
      description:
        "Every vehicle in our fleet undergoes a rigorous 150-point safety and mechanical inspection before each trip.",
    },
    {
      icon: Tag,
      title: "Transparent Pricing",
      description:
        "No hidden fees or unexpected deposit shocks. What you see during reservation is precisely what you pay.",
    },
    {
      icon: Zap,
      title: "Easy Booking",
      description:
        "Seamless 4-step reservation wizard. Choose your vehicle, pick dates, confirm, and pick up your keys instantly.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description:
        "Dedicated roadside assistance and customer care agents available around the clock wherever your road trip takes you.",
    },
  ];

  return (
    <section className="py-20 bg-[#F8FAFC] border-y border-slate-200/80 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#2A835F] mb-2">
            The RideNest Difference
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#092328] tracking-tight">
            Why Choose RideNest?
          </h2>
          <p className="text-[#12544F] text-sm sm:text-base mt-3 leading-relaxed">
            We are redefining the vehicle rental standard with reliability, honesty, and technology tailored for modern drivers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="group relative p-8 rounded-2xl bg-white border border-slate-200/80 hover:border-[#2A835F]/40 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#2A835F]/10 text-[#2A835F] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#2A835F] group-hover:text-white transition-all duration-300 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#092328] mb-2.5">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#12544F]/80 leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
