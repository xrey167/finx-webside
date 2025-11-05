import clsx from "clsx";
import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          "w-full h-10 rounded-md bg-surface text-text-primary placeholder:text-text-muted",
          "border border-border focus:outline-none focus:ring-2 focus:ring-accent/50 px-3",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
