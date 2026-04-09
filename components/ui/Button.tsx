"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, disabled, onClick, type, ...props }, ref) => {
    const variants: Record<ButtonVariant, string> = {
      primary: "bg-primary text-white saffron-gradient font-semibold hover:brightness-110 shadow-warm-sm hover:shadow-warm",
      secondary: "bg-surface text-text border border-primary/20 hover:bg-surface-hover",
      outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary/10",
      ghost: "bg-transparent text-text-muted hover:bg-surface hover:text-text",
      whatsapp: "bg-whatsapp text-white font-semibold hover:brightness-110 shadow-lg",
    };

    const sizes: Record<ButtonSize, string> = {
      sm: "px-4 py-2 text-sm rounded-lg",
      md: "px-6 py-3 text-base rounded-lg",
      lg: "px-10 py-4 text-lg rounded-xl",
      xl: "px-12 py-5 text-xl tracking-wide uppercase font-serif rounded-xl",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={disabled}
        onClick={onClick}
        type={type}
        className={cn(
          "relative inline-flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
          variants[variant],
          sizes[size],
          className
        )}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
