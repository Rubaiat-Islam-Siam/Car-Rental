import { CheckCircle2, Clock, XCircle } from 'lucide-react';

interface Props {
  status: string;
}

export default function BookingStatusBadge({ status }: Props) {
  const upper = status.toUpperCase();

  if (upper === 'APPROVED') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        Approved
      </span>
    );
  }

  if (upper === 'REJECTED') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
        <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
        Rejected
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
      <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-spin" />
      Pending
    </span>
  );
}
