import { ReactNode } from "react";
import { ToastColorsType } from "../interfaces/Toast";

export default function Toast({
  children,
  toastColor,
  showToast,
}: {
  children: ReactNode;
  toastColor: ToastColorsType | undefined;
  showToast: boolean;
}) {
  const ToastColorClasses: Record<ToastColorsType, string> = {
    success: "bg-[#43DD65]",
    error: "bg-[#E53935]",
    warning: "bg-[#F2CA3C]",
  };

  return (
    <div
      className={`${
        showToast ? "translate-y-0" : "-translate-y-[300%]"
      } fixed top-5 right-0 left-5 mr-5 md:max-w-[665px] md:left-1/2 md:-translate-x-1/2 shadow-option-shadow -translate-y-[180%] transition-transform ease-in-out duration-300 z-10 py-2 px-5 font-medium ${
        ToastColorClasses[toastColor ?? "success"]
      }`}
    >
      <h1 className="capitalize text-xl text-primary-black font-bold">{toastColor}</h1>
      {children}
    </div>
  );
}
