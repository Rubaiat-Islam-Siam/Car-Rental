import Link from 'next/link';
import { Check, X, ArrowRight } from 'lucide-react';

export interface VehicleType {
  id: number;
  name: string;
  type: string;
  model: string;
  year: number;
  pricePerDay: number;
  availability: boolean;
  image: string;
  description: string;
}

interface Props {
  vehicle: VehicleType;
}

export default function VehicleCard({ vehicle }: Props) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image & Badges */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          {vehicle.availability ? (
            <span className="inline-flex items-center gap-1 bg-[#2A835F]/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm">
              <Check className="w-3 h-3" /> Available
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-rose-500/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm">
              <X className="w-3 h-3" /> Unavailable
            </span>
          )}
        </div>
        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-[#092328]/90 backdrop-blur-md text-[#8BBB92] px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wide">
            {vehicle.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-[#092328] text-lg group-hover:text-[#2A835F] transition leading-tight">
                {vehicle.name}
              </h3>
              <p className="text-xs font-medium text-[#12544F]/80 mt-0.5">
                {vehicle.model} &bull; {vehicle.year}
              </p>
            </div>
            <div className="text-right">
              <div className="text-lg font-black text-[#2A835F]">
                ৳{vehicle.pricePerDay.toLocaleString()}
              </div>
              <div className="text-[11px] text-[#12544F]/70 font-medium">per day</div>
            </div>
          </div>

          <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
            {vehicle.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2">
          <Link
            href={`/vehicles/${vehicle.id}`}
            className="flex-1 text-center py-2 px-3 text-xs font-semibold text-[#092328] bg-[#F8FAFC] hover:bg-slate-200 rounded-xl transition"
          >
            View Details
          </Link>

          {vehicle.availability ? (
            <Link
              href={`/vehicles/${vehicle.id}/rent`}
              className="flex-1 flex items-center justify-center gap-1 py-2 px-3 text-xs font-semibold text-white bg-[#2A835F] hover:bg-[#20694B] rounded-xl shadow-sm transition"
            >
              <span>Rent Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <button
              disabled
              className="flex-1 py-2 px-3 text-xs font-semibold text-slate-400 bg-slate-100 rounded-xl cursor-not-allowed"
            >
              Booked
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
