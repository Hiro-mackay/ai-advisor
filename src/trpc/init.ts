import { auth } from "@/lib/auth/auth.server";
import { initTRPC, TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { cache } from "react";
import superjson from "superjson";

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
export const baseProcedure = t.procedure.use(async ({ ctx, next }) => {
  try {
    const res = await next({ ctx });
    return res;
  } catch (error) {
    if (error instanceof TRPCError) {
      console.error(error.code, error.name, error.message);
    } else if (error instanceof Error) {
      console.error(error.name, error.message);
    } else {
      console.error(error);
    }
    throw error;
  }
});
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
