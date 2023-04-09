import { protectedProceduer, publicProcedure, router } from "../trpc";

export const testRouter = router({
  ping: publicProcedure.query(async () => {
    return { msg: "pong" };
  }),

  admin: router({
    pong: protectedProceduer.query(({ ctx }) => {
      return { secret: ctx.user };
    }),
  }),
});
