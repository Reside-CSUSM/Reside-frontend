"use client";

import React from "react";
import { IconType } from "react-icons/lib";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg
      hover:opacity-80 transition w-full ${className}
      ${outline ? "bg-transparent" : "bg-[#4189e8]"}
      ${outline ? "border-neutral-300" : "border-[#4189e8]"}
      ${outline ? "text-neutral-300" : "text-white"}
      ${small ? "py-1" : "py-3"}
      ${small ? "text-sm" : "text-base"}
      ${small ? "font-light" : "font-semibold"}
      ${small ? "border-[1px]" : "border-2"}
  `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;
