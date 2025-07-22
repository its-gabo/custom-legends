import { api } from "@/trpc/react";

export function useGetSession() {
  return api.auth.getSession.useQuery();
}
