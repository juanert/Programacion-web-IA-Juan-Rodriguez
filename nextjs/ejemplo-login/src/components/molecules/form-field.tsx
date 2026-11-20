import type { ComponentProps } from "react";
import { Input } from "@/components/atoms/input";

type FormFieldProps = ComponentProps<"input"> & {
  name: string;
  label: string;
  hint?: string;
};

export function FormField({ name, label, hint, ...props }: FormFieldProps) {
  const hintId = hint ? `${name}-hint` : undefined;

  return (
    <div className="grid gap-1.5">
      <label className="text-sm font-semibold" htmlFor={name}>
        {label}
      </label>
      <Input {...props} name={name} id={name} aria-describedby={hintId} />
      {hint && (
        <p id={hintId} className="text-sm text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}
