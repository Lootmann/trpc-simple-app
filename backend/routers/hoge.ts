import { protectedProcedure, publicProcedure, router } from "../trpc";

export const testRouter = router({
  ping: publicProcedure.query(async () => {
    return { msg: "pong" };
  }),

  admin: router({
    // NOTE: when needs Authorization, use protectedProcedure
    pong: protectedProcedure.query(({ ctx }) => {
      return { auth: ctx.user };
    }),
  }),
});
