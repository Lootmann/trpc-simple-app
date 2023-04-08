import { publicProcedure, router } from "../trpc";
import { setToken } from "../apis/auths";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createUser,
  getAllUsers,
  getUserById,
  getUserByName,
  getUserByPassword,
} from "../apis/users";

export const userRouter = router({
  user: router({
    all: publicProcedure
      .output(
        z.array(
          z.object({
            id: z.number(),
            name: z.string(),
          })
        )
      )
      .query(async () => {
        const users = await getAllUsers();
        return users;
      }),

    byId: publicProcedure.input(z.number()).query(async (req) => {
      const { input } = req;
      const user = await getUserById(input);
      return user;
    }),

    byName: publicProcedure.input(z.string()).query(async (req) => {
      const { input } = req;
      const user = await getUserByName(input);
      return user;
    }),

    login: publicProcedure
      .input(
        z.object({
          name: z.string().min(3, "short name"),
          password: z.string().min(3, "short name"),
        })
      )
      .output(z.object({ msg: z.string(), name: z.string() }))
      .mutation(async ({ input }) => {
        const user = await getUserByPassword(input.name, input.password);

        if (user === null)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "username or password is invalid",
          });

        setToken(user.name);
        return { msg: "success", name: user.name };
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
