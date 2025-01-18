import { ButtonHTMLAttributes, ReactNode } from "react";

export type ColorVariants = "pink" | "green" | "yellow" | "blue";
// type SizeVariants = "sm" | "regular" | "lg"

function Button({
  children,
  colorVariant,
  ...props
}: {
  children: ReactNode | string;
  colorVariant: ColorVariants;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const colorClasses: Record<ColorVariants, string> = {
    pink: "bg-[#F03986]",
    green: "bg-[#43DD65]",
    yellow: "bg-[#F2CA3C]",
    blue: "bg-[#3C9BF2]",
  };

  return (
    <>
      <button
        {...props}
        className={`h-[60px] button-hover-click max-w-[320px] w-full px-[81px] shadow-option-shadow flex justify-center items-center text-xl text-[#3D0F22] font-bold rounded-lg border-[4px] border-solid border-[#571530] whitespace-nowrap ${colorClasses[colorVariant]}`}
      >
        {children}
      </button>
    </>
  );
}

export default Button;
