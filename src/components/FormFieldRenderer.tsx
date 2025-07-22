import FormField from "./FormField";

import type { IFormField } from "@/app/types/shared";
import type {
  Control,
  FieldError,
  FieldErrors,
  FieldValues,
} from "react-hook-form";

interface IFormFieldRendererProps<T extends FieldValues> {
  fields: IFormField[];
  errors?: FieldErrors<T>;
  control: Control<T>;
}

export default function FormFieldRenderer<T extends FieldValues>({
  fields,
  errors,
  control,
}: IFormFieldRendererProps<T>) {
  return (
    <>
      {fields.map((field: IFormField) => (
        <FormField
          key={field.name}
          field={field}
          error={errors && (errors[field.name] as FieldError)}
          control={control}
        />
      ))}
    </>
  );
}
