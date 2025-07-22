import { api } from "@/trpc/react";

export function useLoginUser() {
  return api.auth.login.useMutation();
}
