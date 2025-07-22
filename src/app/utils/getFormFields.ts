import type { IFormField } from "../types/shared";
import type { ZodObject, ZodRawShape, ZodType } from "zod";

export const getFormFields = <T extends ZodRawShape>(
  schema: ZodObject<T>,
): IFormField[] => {
  return Object.entries(schema.shape).map(([name, value]) => {
    const meta = (value as ZodType<unknown>).meta?.() as Omit<
      IFormField,
      "name"
    >;

    return {
      name,
      label: meta?.label,
      placeholder: meta?.placeholder,
      type: meta?.type,
    };
  });
};
