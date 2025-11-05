"use client";
import clsx from "clsx";

type Variant = "default" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  default: "bg-accent text-background hover:shadow-glow-strong",
  outline:
    "border border-border text-text-primary hover:border-accent hover:shadow-glow",
  ghost: "text-text-secondary hover:bg-surface-hover",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3",
  md: "h-10 px-4",
  lg: "h-11 px-6",
};

export function Button({ className, variant = "default", size = "md", ...props }: ButtonProps) {
  return (
    <button className={clsx(base, variants[variant], sizes[size], className)} {...props} />
  );
}
