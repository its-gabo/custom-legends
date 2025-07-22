"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { match } from "ts-pattern";

import { useRegisterUser } from "@/app/hooks";
import { getFormFields } from "@/app/utils";
import { FormFieldRenderer } from "@/components";
import { Button } from "@/components/common";

import { RegisterUserSchema } from "./register.schema";

import type { IRegisterUser } from "./register.type";

export default function RegisterForm() {
  const router = useRouter();
  const { mutate: registerUser, isPending } = useRegisterUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterUser>({
    resolver: zodResolver(RegisterUserSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const registerFormFields = getFormFields(RegisterUserSchema);

  const onSubmit = async (data: IRegisterUser) => {
    if (!data) return;

    registerUser(data, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      autoComplete="off"
    >
      <FormFieldRenderer
        fields={registerFormFields}
        errors={errors}
        control={control}
      />
      <Button className="group mt-5 w-full" disabled={isPending}>
        {match(isPending)
          .with(true, () => <Loader2 className="mr-2 animate-spin" size={16} />)
          .with(false, () => (
            <UserPlus
              className="opacity-60 transition-transform group-hover:scale-120"
              size={16}
              aria-hidden="true"
            />
          ))
          .exhaustive()}
        Register
      </Button>
    </form>
  );
}
