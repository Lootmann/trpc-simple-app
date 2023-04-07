import { Context } from "../utils/context";
import { getAllUsers } from "../apis/users";
import { initTRPC } from "@trpc/server";

const t = initTRPC.context<Context>().create();
const publicProcedure = t.procedure;

export const userRouter = t.router({
  ping: publicProcedure.query(async () => {
    return { msg: "pong" };
  }),

  users: publicProcedure.query(async () => {
    const users = await getAllUsers();
    return users;
  }),
});

export type UserRouter = typeof userRouter;
