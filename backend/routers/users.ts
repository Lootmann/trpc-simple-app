import { Context } from "../utils/context";
import { createUser, getAllUsers, getUserById } from "../apis/users";
import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.context<Context>().create();
const publicProcedure = t.procedure;

export const userRouter = t.router({
  ping: publicProcedure.query(async () => {
    return { msg: "pong" };
  }),

  user: t.router({
    all: publicProcedure
      .output(z.array(z.object({ id: z.number(), name: z.string() })))
      .query(async () => {
        const users = await getAllUsers();
        return users;
      }),

    byId: publicProcedure.input(z.number()).query(async (req) => {
      const { input } = req;
      const user = await getUserById(input);
      return user;
    }),

    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(3),
          password: z.string().min(5),
        })
      )
      .output(
        z.object({
          id: z.number(),
          name: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        return createUser(input.name, input.password);
      }),
  }),
});

export type UserRouter = typeof userRouter;
