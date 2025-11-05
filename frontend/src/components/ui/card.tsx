import * as React from "react";
import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "glass";
};

export function Card({ className, variant = "default", ...props }: CardProps) {
  const variants = {
    default: "bg-surface border border-border rounded-lg p-6 shadow-lg transition-all duration-200",
    glass: "glassmorphism rounded-lg p-6 shadow-lg transition-all duration-200",
  } as const;
  return <div className={cn(variants[variant], className)} {...props} />;
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4 border-b border-border/60", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4", className)} {...props} />;
}
