import React, { forwardRef, useId } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  /** default = khung viền; underline = chỉ gạch dưới, không ring/outline */
  variant?: "default" | "underline";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      className = "",
      id,
      variant = "default",
      required,
      ...props
    },
    ref
  ) => {
    const reactId = useId();
    const inputId = id || `input-${reactId}`;

    const variants = {
      default:
        // như style ban đầu
        "flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm \
placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 \
disabled:cursor-not-allowed disabled:opacity-50",
      underline:
        // CHỈ GẠCH DƯỚI – không viền khung, không ring/outline, không hover đổi màu
        "h-10 w-full border-0 border-b border-gray-300 bg-transparent px-0 py-2 text-sm " +
        "placeholder:text-gray-400 outline-none ring-0 focus:outline-none focus:ring-0 " +
        "focus:border-gray-300 hover:border-gray-300 rounded-none shadow-none",
    } as const;

    const errorClasses =
      error && variant === "default"
        ? "border-red-500 focus-visible:ring-red-500"
        : error && variant === "underline"
        ? "border-b-red-500"
        : "";

    const classes = twMerge(variants[variant], errorClasses, className);

    return (
      <div className={twMerge(label ? "space-y-2" : "")}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          required={required}
          className={classes}
          {...props}
        />

        {error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : helperText ? (
          <p className="text-sm text-gray-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
