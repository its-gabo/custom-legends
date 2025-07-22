"use client";

import { Swords } from "lucide-react";

import { LoginForm } from "@/app/features/login";
import { Card, CardContent, CardHeader } from "@/components/common";

export default function LoginPage() {
  return (
    <section className="grid h-full place-items-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="mb-6 text-center">
          <Swords className="mx-auto my-5 size-9" />
          <h1 className="text-2xl font-bold">Login to Custom Legends</h1>
          <p className="text-muted-foreground">Welcome back! Please log in.</p>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </section>
  );
}
