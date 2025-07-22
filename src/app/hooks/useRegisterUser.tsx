import { api } from "@/trpc/react";

export function useRegisterUser() {
  return api.auth.register.useMutation();
}
