"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { useGetSession } from "../hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { data: session, isLoading } = useGetSession();

  useEffect(() => {
    if (!isLoading && !session) {
      router.push("/auth/login");
    }
  }, [isLoading, session, router]);

  if (isLoading) {
    return (
      <div className="grid h-full w-full place-items-center">
        <Loader2 className="animate-spin" size={24} />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}
