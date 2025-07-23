"use client";

import { Swords } from "lucide-react";

import { RegisterForm } from "@/app/features/register";
import { Card, CardContent, CardHeader } from "@/components/common";

export default function RegisterPage() {
  return (
    <section className="grid h-full place-items-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader className="mb-4 text-center">
          <Swords className="mx-auto my-5 size-10" />
          <h1 className="text-2xl font-bold">Register to Custom Legends</h1>
          <p className="text-muted-foreground">Create a new account today!</p>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </section>
  );
}
