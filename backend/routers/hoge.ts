import { publicProcedure, router } from "../trpc";

export const testRouter = router({
  ping: publicProcedure.query(async () => {
    return { msg: "pong" };
  }),
});
