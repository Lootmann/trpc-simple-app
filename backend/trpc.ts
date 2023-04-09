import { Context } from "./utils/context";
import { getUserByName } from "./apis/users";
import { initTRPC, TRPCError } from "@trpc/server";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const mainRouter = t.mergeRouters;

const isAuthed = middleware(async ({ next, ctx }) => {
  const { req } = ctx;
  const accessToken = req.headers.authorization?.split(" ")[1];

  // TODO: check token is valid
  if (!accessToken)
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Bearer is missing" });

  // TODO: check user is valid
  const user = await getUserByName(accessToken);
  if (!user)
    throw new TRPCError({ code: "UNAUTHORIZED", message: "token is invalid" });

  return next({
    ctx: {
      user: user,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
