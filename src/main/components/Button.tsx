import { ButtonHTMLAttributes, ReactNode } from "react";

export type ColorVariants = "pink" | "green" | "yellow" | "blue";
type SizeVariants = "xs" | "sm" | "regular" | "lg";

function Button({
  children,
  colorVariant,
  sizeVariant = "lg",
  ...props
}: {
  children: ReactNode | string;
  colorVariant: ColorVariants;
  sizeVariant?: SizeVariants;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const colorClasses: Record<ColorVariants, string> = {
    pink: "bg-[#F03986]",
    green: "bg-[#43DD65]",
    yellow: "bg-[#F2CA3C]",
    blue: "bg-[#3C9BF2]",
  };

  const sizeClasses: Record<SizeVariants, string> = {
    xs: "h-[30px] max-w-full px-[10px] text-xs",
    sm: "h-[40px] max-w-full px-[20px] text-sm",
    regular: "h-[50px] max-w-full px-[30px] text-base",
    lg: "h-[60px] max-w-[320px] px-[81px] text-xl",
  };

  return (
    <>
      <button
        {...props}
        className={`disabled:opacity-80 select-none capitalize button-hover-click w-full shadow-option-shadow flex justify-center items-center text-[#3D0F22] font-bold rounded-lg border-[4px] border-solid border-[#571530] whitespace-nowrap ${colorClasses[colorVariant]} ${sizeClasses[sizeVariant]}`}
      >
        {children}
      </button>
    </>
  );
}

export default Button;
