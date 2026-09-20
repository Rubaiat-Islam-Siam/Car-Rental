'use client';

import { useState, useMemo } from 'react';
import { createBookingAction } from '@/app/actions';
import { Vehicle } from '@prisma/client';
import {
  Calendar,
  AlertCircle,
  CheckCircle2,
  Receipt,
  Car,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface Props {
  vehicle: Vehicle;
  customerName: string;
}

export default function RentalBookingForm({ vehicle, customerName }: Props) {
  // Set default dates: tomorrow and 3 days from tomorrow
  const getFormattedDate = (daysAhead: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split('T')[0];
  };

  const [startDate, setStartDate] = useState(getFormattedDate(1));
  const [endDate, setEndDate] = useState(getFormattedDate(3));
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic calculations
  const { rentalDays, totalCost, isValid, errorReason } = useMemo(() => {
    if (!startDate || !endDate) {
      return { rentalDays: 0, totalCost: 0, isValid: false, errorReason: 'Dates cannot be empty.' };
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return { rentalDays: 0, totalCost: 0, isValid: false, errorReason: 'Please enter valid dates.' };
    }

    if (end < start) {
      return {
        rentalDays: 0,
        totalCost: 0,
        isValid: false,
        errorReason: 'End date cannot be before start date.',
      };
    }

    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const days = diffDays === 0 ? 1 : diffDays;

    if (days < 1) {
      return {
        rentalDays: 0,
        totalCost: 0,
        isValid: false,
        errorReason: 'Rental duration must be at least 1 day.',
      };
    }

    if (!vehicle.availability) {
      return {
        rentalDays: days,
        totalCost: days * vehicle.pricePerDay,
        isValid: false,
        errorReason: 'This vehicle is currently unavailable for rent.',
      };
    }

    return {
      rentalDays: days,
      totalCost: days * vehicle.pricePerDay,
      isValid: true,
      errorReason: null,
    };
  }, [startDate, endDate, vehicle]);

  const handleAction = async (formData: FormData) => {
    if (!isValid) {
      setErrorMsg(errorReason || 'Please check your booking dates.');
      return;
    }
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await createBookingAction(formData);
      if (res?.error) {
        setErrorMsg(res.error);
        setIsSubmitting(false);
      }
    } catch (err: any) {
      // In Next.js, redirect() throws a NEXT_REDIRECT error which is caught here if not rethrown
      if (err?.message === 'NEXT_REDIRECT') {
        throw err;
      }
      setErrorMsg(err.message || 'Failed to submit booking');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Form: Date Pickers */}
      <div className="lg:col-span-7 space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span>Select Rental Schedule</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Specify pickup and drop-off dates. Minimum rental period is 1 calendar day.
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-700 text-xs font-medium">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form action={handleAction} className="space-y-5">
          <input type="hidden" name="vehicleId" value={vehicle.id} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Start Date (Pickup)
              </label>
              <input
                type="date"
                name="startDate"
                required
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setErrorMsg(null);
                }}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                End Date (Return)
              </label>
              <input
                type="date"
                name="endDate"
                required
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setErrorMsg(null);
                }}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-1.5">
            <div className="flex justify-between">
              <span>Customer:</span>
              <strong className="text-slate-800 capitalize">{customerName}</strong>
            </div>
            <div className="flex justify-between">
              <span>Vehicle:</span>
              <strong className="text-slate-800">{vehicle.name} ({vehicle.model})</strong>
            </div>
            <div className="flex justify-between">
              <span>Deposit:</span>
              <span className="text-emerald-600 font-semibold">Zero deposit required for demo</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-lg shadow-blue-600/25 transition flex items-center justify-center gap-2 text-sm"
          >
            <span>{isSubmitting ? 'Reserving Vehicle...' : 'Confirm & Request Rental'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Right Box: Live Calculation Breakdown */}
      <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-200 pb-3">
            <Receipt className="w-4 h-4 text-blue-600" />
            <span>Rental Cost Breakdown</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Daily Rate:</span>
              <span className="font-semibold text-slate-900">৳{vehicle.pricePerDay.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Rental Duration:</span>
              <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                {rentalDays} {rentalDays === 1 ? 'Day' : 'Days'}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Calculation:</span>
              <span className="font-mono text-slate-500">
                {rentalDays} × ৳{vehicle.pricePerDay.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="border-t border-dashed border-slate-300 pt-4 mt-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-bold text-slate-800">Total Calculated Cost:</span>
              <div className="text-right">
                <span className="text-2xl font-black text-blue-600">
                  ৳{totalCost.toLocaleString()}
                </span>
                <span className="block text-[10px] text-slate-400 font-medium">Inclusive of all taxes</span>
              </div>
            </div>
          </div>

          {errorReason && (
            <div className="text-[11px] text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
              ⚠️ {errorReason}
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] text-slate-400 flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-400 shrink-0" />
          <span>Your request will be submitted to the Admin for approval.</span>
        </div>
      </div>
    </div>
  );
}
