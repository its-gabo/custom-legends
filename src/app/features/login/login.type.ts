import type { LoginUserSchema } from "./login.schema";
import type { z } from "zod";

export type ILoginUser = z.infer<typeof LoginUserSchema>;
