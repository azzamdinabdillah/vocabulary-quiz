type SizeType = "sm" | "regular" | "lg";

export default function Loading({ size = "regular" }: { size?: SizeType }) {
  const sizesClass: Record<SizeType, string> = {
    sm: "w-7 h-7 border-[6px] border-t-[6px]",
    regular: "w-10 h-10 border-[8px] border-t-[8px]",
    lg: "w-16 h-16 border-[10px] border-t-[10px]",
  };

  return (
    <>
      <div
        className={`loading border-primary-pink bg-transparent rounded-full border-t-primary-black animate-spin ${sizesClass[size]}`}
      ></div>
    </>
  );
}
