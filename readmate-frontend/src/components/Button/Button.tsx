import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  textColor?: string;
  backgroundColor?: string;
  hoverColor?: string;
  activeColor?: string;
  className?: string;
  fullWidth?: boolean;
}

export const Button = ({
  children,
  textColor = "text-white",
  backgroundColor = "bg-purple-400",
  hoverColor = "hover:bg-purple-500",
  activeColor = "active:bg-purple-600",
  className = "",
  fullWidth = false,
  ...props
}: ButtonProps) => {
  const buttonClasses = [
    "cursor-pointer py-3 rounded-full text-sm font-medium transition-all duration-200 shadow-md",
    textColor,
    backgroundColor,
    hoverColor,
    activeColor,
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400",
    fullWidth ? "w-full" : "",
    className,
  ].join(" ");

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};
