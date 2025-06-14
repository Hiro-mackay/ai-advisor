import { auth } from "@/lib/auth/auth.server";
import { initTRPC, TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { cache } from "react";
import superjson from "superjson";

// Create a custom transformer
const dateTransformer = {
  input: (data: unknown) => data,
  output: (data: unknown) => {
    if (data && typeof data === "object") {
      const transformDates = (
        obj: Record<string, unknown>
      ): Record<string, unknown> => {
        if (obj === null || typeof obj !== "object") return obj;

        if (Array.isArray(obj)) {
          return obj.map(transformDates);
        }

        const result: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(obj)) {
          if (key === "createdAt" || key === "updatedAt") {
            result[key] = new Date(value as string);
          } else {
            result[key] = transformDates(value as Record<string, unknown>);
          }
        }
        return result;
      };

      return transformDates(data as Record<string, unknown>);
    }
    return data;
  },
};

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: "user_123" };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }

  return next({ ctx: { ...ctx, auth: session } });
});
