import { Label } from "@radix-ui/react-label";
import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { match } from "ts-pattern";

import PasswordField from "./PasswordField";
import TextField from "./TextField";

import type { IFormField } from "@/app/types/shared";

interface IFormFieldProps<T extends FieldValues> {
  field: IFormField;
  error?: FieldError;
  control: Control<T>;
}
export default function FormField<T extends FieldValues>({
  field: formField,
  error,
  control,
}: IFormFieldProps<T>) {
  const isPasswordField = formField.type === "password";

  return (
    <Controller
      name={formField.name as Path<T>}
      control={control}
      render={({ field }) => {
        return (
          <div className="space-y-1">
            <Label htmlFor={formField.name} className="block">
              {formField.label}
            </Label>
            {match(isPasswordField)
              .with(true, () => (
                <PasswordField
                  name={formField.name}
                  placeholder={formField.placeholder}
                  field={field}
                />
              ))
              .with(false, () => (
                <TextField
                  name={formField.name}
                  placeholder={formField.placeholder}
                  field={field}
                />
              ))
              .exhaustive()}
            {error && (
              <span className="text-xs text-red-600">{error.message}</span>
            )}
          </div>
        );
      }}
    />
  );
}
