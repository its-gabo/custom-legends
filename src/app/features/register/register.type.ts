import type { RegisterUserSchema } from "./register.schema";
import type { z } from "zod";

export type IRegisterUser = z.infer<typeof RegisterUserSchema>;
