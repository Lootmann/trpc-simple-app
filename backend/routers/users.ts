import { Context } from "../utils/context";
import { createUser, getAllUsers } from "../apis/users";
import { initTRPC } from "@trpc/server";
import { z } from "zod";

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

  createUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(3),
        password: z.string().min(5),
      })
    )
    .output(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return createUser(input.name, input.password);
    }),
});

export type UserRouter = typeof userRouter;
