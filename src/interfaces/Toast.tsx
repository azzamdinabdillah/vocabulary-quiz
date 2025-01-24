export interface ToastState {
  message?: string;
  toastColor?: ToastColorsType;
  isShow: boolean;
}

export type ToastColorsType = "success" | "warning" | "error";
