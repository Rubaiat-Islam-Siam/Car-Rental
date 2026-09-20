'use client';

import { useTransition } from 'react';
import { updateBookingStatusAction } from '@/app/actions';
import { Check, X, Loader2 } from 'lucide-react';

interface Props {
  bookingId: number;
  currentStatus: string;
}

export default function AdminBookingActionButtons({ bookingId, currentStatus }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleUpdate = (status: 'APPROVED' | 'REJECTED') => {
    startTransition(async () => {
      await updateBookingStatusAction(bookingId, status);
    });
  };

  return (
    <div className="flex items-center justify-end gap-1.5">
      {currentStatus !== 'APPROVED' && (
        <button
          onClick={() => handleUpdate('APPROVED')}
          disabled={isPending}
          className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 disabled:opacity-50 px-2.5 py-1 rounded-lg text-xs font-semibold transition"
          title="Approve Booking"
        >
          {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
          <span>Approve</span>
        </button>
      )}

      {currentStatus !== 'REJECTED' && (
        <button
          onClick={() => handleUpdate('REJECTED')}
          disabled={isPending}
          className="inline-flex items-center gap-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 disabled:opacity-50 px-2.5 py-1 rounded-lg text-xs font-semibold transition"
          title="Reject Booking"
        >
          {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <X className="w-3 h-3" />}
          <span>Reject</span>
        </button>
      )}
    </div>
  );
}
