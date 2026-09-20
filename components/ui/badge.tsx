import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "secondary" | "primary";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-[#F8FAFC] text-[#111827] border-slate-200",
    primary: "bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20",
    success: "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20",
    warning: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20",
    danger: "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20",
    info: "bg-[#22D3EE]/10 text-[#2563EB] border-[#22D3EE]/30",
    secondary: "bg-[#0B132B] text-white border-slate-700",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-semibold rounded-full border shadow-sm",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const normalized = status.toUpperCase();
  switch (normalized) {
    case "CONFIRMED":
    case "AVAILABLE":
      return <Badge variant="success">Confirmed</Badge>;
    case "ACTIVE":
      return <Badge variant="info">Active</Badge>;
    case "PENDING":
      return <Badge variant="warning">Pending</Badge>;
    case "COMPLETED":
      return <Badge variant="default">Completed</Badge>;
    case "CANCELLED":
    case "UNAVAILABLE":
      return <Badge variant="danger">Cancelled</Badge>;
    default:
      return <Badge variant="default">{status}</Badge>;
  }
}
