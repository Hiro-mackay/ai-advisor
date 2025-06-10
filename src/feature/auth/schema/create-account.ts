import { z } from "zod";

export const CreateAccountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type CreateAccountSchemaType = z.infer<typeof CreateAccountSchema>;
