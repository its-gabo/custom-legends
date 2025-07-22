import z from "zod";

export const LoginUserSchema = z.object({
  email: z.email("Invalid email address").meta({
    label: "Email",
    placeholder: "Enter your email",
    type: "text",
  }),
  password: z.string().nonempty("Password is required").meta({
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
  }),
});
