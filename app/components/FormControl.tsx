import { PropsWithChildren, useId } from "react";

type Props = {
  label: string;
  controlId: string;
};
export default function FormControl({
  label,
  controlId,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="relative items-start gap-2 mb-4">
      <label
        htmlFor={controlId}
        className="absolute -top-3 left-2 bg-white px-1 text-sm font-medium"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
