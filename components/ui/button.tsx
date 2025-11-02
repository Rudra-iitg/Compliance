"use client";

import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "default" | "outline";
};

export const Button: React.FC<ButtonProps> = ({ asChild, variant = "default", className = "", children, ...props }) => {
  const base = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants: Record<string, string> = {
    default: "bg-white/10 hover:bg-white/20 text-white border border-white/15",
    outline: "bg-transparent border border-white/20 hover:bg-white/10 text-white",
  };
  const classes = `${base} ${variants[variant] ?? variants.default} ${className}`.trim();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      className: `${classes} ${(children as any).props?.className ?? ""}`.trim(),
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
