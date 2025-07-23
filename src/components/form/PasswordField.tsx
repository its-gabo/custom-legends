import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

import { Button, Input } from "../common";

import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface IPasswordFieldProps<T extends FieldValues> {
  name: string;
  placeholder?: string;
  field: ControllerRenderProps<T, Path<T>>;
}

export default function PasswordField<T extends FieldValues>({
  name,
  placeholder,
  field,
}: IPasswordFieldProps<T>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <div className="relative">
      <Input
        id={name}
        className="pe-9"
        placeholder={placeholder}
        type={isPasswordVisible ? "text" : "password"}
        {...field}
      />
      <Button
        variant="ghost"
        className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none hover:bg-transparent focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        onClick={() => setIsPasswordVisible((prev) => !prev)}
        aria-label={isPasswordVisible ? "Hide password" : "Show password"}
        aria-pressed={isPasswordVisible}
        aria-controls={field.name}
      >
        {isPasswordVisible ? (
          <EyeOffIcon size={16} aria-hidden="true" />
        ) : (
          <EyeIcon size={16} aria-hidden="true" />
        )}
      </Button>
    </div>
  );
}
