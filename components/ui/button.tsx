import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "accent";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A835F] disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]";

    const variantStyles = {
      default: "bg-[#2A835F] text-white hover:bg-[#20694B] shadow-md shadow-[#2A835F]/25",
      accent: "bg-[#8BBB92] text-[#092328] font-bold hover:bg-[#77A97E] shadow-md shadow-[#8BBB92]/25",
      destructive: "bg-[#EF4444] text-white hover:bg-[#DC2626]",
      outline: "border border-[#2A835F]/40 bg-[#092328]/80 text-white hover:bg-[#12544F] hover:border-[#8BBB92]/50",
      secondary: "bg-[#12544F] text-white hover:bg-[#092328]",
      ghost: "text-[#12544F] hover:bg-slate-100 hover:text-[#092328]",
      link: "text-[#2A835F] underline-offset-4 hover:underline",
    };

    const sizeStyles = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-8 rounded-lg px-3 text-xs",
      lg: "h-12 rounded-xl px-7 text-base",
      icon: "h-10 w-10",
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant] || variantStyles.default} ${sizeStyles[size] || sizeStyles.default} ${className}`.trim();

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
