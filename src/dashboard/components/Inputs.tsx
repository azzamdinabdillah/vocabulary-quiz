import { ChangeEventHandler } from "react";

export default function InputText({
  placeholder,
  onChange,
  value,
}: {
  placeholder: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}) {
  return (
    <input
      required
      type="text"
      className="input-custom"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}
