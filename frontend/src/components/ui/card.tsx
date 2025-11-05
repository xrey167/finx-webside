import clsx from "clsx";
import * as React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-border bg-surface/80 backdrop-blur-xs shadow-glow",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: CardProps) {
  return (
    <div className={clsx("p-4 border-b border-border/60", className)} {...props} />
  );
}

export function CardContent({ className, ...props }: CardProps) {
  return <div className={clsx("p-4", className)} {...props} />;
}
