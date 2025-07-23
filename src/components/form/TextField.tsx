import { Input } from "../common";

import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface ITextFieldProps<T extends FieldValues> {
  name: string;
  placeholder?: string;
  field: ControllerRenderProps<T, Path<T>>;
}

export default function TextField<T extends FieldValues>({
  name,
  placeholder,
  field,
}: ITextFieldProps<T>) {
  return <Input id={name} placeholder={placeholder} type="text" {...field} />;
}
