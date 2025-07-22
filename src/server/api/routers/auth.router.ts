import { TRPCError } from "@trpc/server";

import { LoginUserSchema } from "@/app/features/login";
import { RegisterUserSchema } from "@/app/features/register";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { auth } from "@/server/lib/auth";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(RegisterUserSchema)
    .mutation(async ({ ctx: _, input }) => {
      try {
        const { name, email, password } = input;

        const { user } = await auth.api.signUpEmail({
          body: {
            name,
            email,
            password,
          },
        });

        const { id, name: createdUserName, email: createdUserEmail } = user;

        return { id, name: createdUserName, email: createdUserEmail };
      } catch {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Unexpected error during registration, please try again later.",
        });
      }
    }),

  login: publicProcedure
    .input(LoginUserSchema)
    .mutation(async ({ ctx: _, input }) => {
      try {
        const { email, password } = input;

        const { user } = await auth.api.signInEmail({
          body: {
            email,
            password,
          },
        });

        if (!user) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid email or password.",
          });
        }

        const { id, name: createdUserName, email: createdUserEmail } = user;

        return { id, name: createdUserName, email: createdUserEmail };
      } catch {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unexpected error during login, please try again later.",
        });
      }
    }),
});
