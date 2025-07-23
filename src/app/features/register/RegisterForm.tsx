"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { match } from "ts-pattern";

import { useRegisterUser } from "@/app/hooks";
import { getFormFields } from "@/app/utils";
import { Button } from "@/components/common";
import { FormFieldRenderer } from "@/components/form";

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
        router.push("/auth/login");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <FormFieldRenderer
        fields={registerFormFields}
        errors={errors}
        control={control}
      />
      <Button className="group mt-4 w-full" disabled={isPending}>
        {match(isPending)
          .with(true, () => <Loader2 className="animate-spin" size={16} />)
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
      <div className="mt-5 text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/login" className="underline underline-offset-4">
          Log in
        </Link>
      </div>
    </form>
  );
}
