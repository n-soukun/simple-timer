import React from "react";
import clsx from "clsx";

const variants = {
  primary: "bg-blue-600 text-white",
  secondary: "bg-purple-600 text-white",
  inverse: "bg-white text-blue-600",
  danger: "bg-red-600 text-white",
};

const sizes = {
  sm: "py-2 px-4 text-sm",
  md: "py-2 px-6 text-md",
  lg: "py-3 px-8 text-lg",
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
} & IconProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      className = "",
      variant = "primary",
      size = "md",
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          "flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed rounded-lg shadow-lg font-medium focus:outline-none hover:opacity-80",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {startIcon}
        <span className="mx-2">{props.children}</span>
        {endIcon}
      </button>
    );
  }
);
