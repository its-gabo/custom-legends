import { Label } from "@radix-ui/react-label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { match } from "ts-pattern";

import { cn } from "@/lib/utils";

import { Button, Input } from "./common";

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
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const isPasswordField = formField.type === "password";

  const inputType = match({ isPasswordField })
    .with({ isPasswordField: true }, () => (isVisible ? "text" : "password"))
    .otherwise(() => formField.type);

  return (
    <Controller
      name={formField.name as Path<T>}
      control={control}
      render={({ field }) => (
        <div>
          <Label htmlFor={field.name} className="mb-3">
            {formField.label}
          </Label>
          <div className={cn(isPasswordField && "relative")}>
            <Input
              className={cn(isPasswordField && "pe-9")}
              placeholder={formField.placeholder}
              type={inputType}
              {...field}
            />
            {isPasswordField && (
              <Button
                variant="ghost"
                className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none hover:bg-transparent focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                onClick={() => setIsVisible((prev) => !prev)}
                aria-label={isVisible ? "Hide password" : "Show password"}
                aria-pressed={isVisible}
                aria-controls={field.name}
              >
                {isVisible ? (
                  <EyeOffIcon size={16} aria-hidden="true" />
                ) : (
                  <EyeIcon size={16} aria-hidden="true" />
                )}
              </Button>
            )}
          </div>
          {error && (
            <span className="text-xs text-red-600">{error.message}</span>
          )}
        </div>
      )}
    />
  );
}
