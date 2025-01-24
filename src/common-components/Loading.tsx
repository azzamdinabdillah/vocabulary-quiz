type SizeType = "xs" | "sm" | "regular" | "lg";

export default function Loading({ size = "regular" }: { size?: SizeType }) {
  const sizesClass: Record<SizeType, string> = {
    xs: "w-5 h-5 border-[3px] border-t-[3px]",
    sm: "w-7 h-7 border-[5px] border-t-[5px]",
    regular: "w-10 h-10 border-[7px] border-t-[7px]",
    lg: "w-16 h-16 border-[9px] border-t-[9px]",
  };

  return (
    <>
      <div
        className={`loading border-transparent bg-transparent rounded-full border-t-primary-black animate-spin ${sizesClass[size]}`}
      ></div>
    </>
  );
}
