"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { match } from "ts-pattern";

import { useLoginUser } from "@/app/hooks";
import { getFormFields } from "@/app/utils";
import { FormFieldRenderer } from "@/components";
import { Button } from "@/components/common";

import { LoginUserSchema } from "./login.schema";

import type { ILoginUser } from "./login.type";

export default function LoginForm() {
  const router = useRouter();
  const { mutate: loginUser, isPending } = useLoginUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginUser>({
    resolver: zodResolver(LoginUserSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginFormFields = getFormFields(LoginUserSchema);

  const onSubmit = async (data: ILoginUser) => {
    if (!data) return;

    loginUser(data, {
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
        fields={loginFormFields}
        errors={errors}
        control={control}
      />
      <Button className="group mt-5 w-full" disabled={isPending}>
        {match(isPending)
          .with(true, () => <Loader2 className="animate-spin" size={16} />)
          .with(false, () => (
            <LogIn
              className="opacity-60 transition-transform group-hover:scale-120"
              size={16}
              aria-hidden="true"
            />
          ))
          .exhaustive()}
        Login
      </Button>
    </form>
  );
}
