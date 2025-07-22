import z from "zod";

export const RegisterUserSchema = z
  .object({
    name: z.string().min(4, "Name must be at least 4 characters long").meta({
      label: "Name",
      placeholder: "Enter your name",
      type: "text",
    }),
    email: z.email("Invalid email address").meta({
      label: "Email",
      placeholder: "Enter your email",
      type: "text",
    }),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{10,}$/,
        "Password must be at least 10 characters long and include uppercase letter, lowercase letter, number, and special character",
      )
      .meta({
        label: "Password",
        placeholder: "Enter your password",
        type: "password",
      }),
    passwordConfirmation: z.string().meta({
      label: "Confirm Password",
      placeholder: "Enter your password again",
      type: "password",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "Passwords do not match",
  });
