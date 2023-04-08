import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import {
  createUser,
  getAllUsers,
  getUserById,
  getUserByName,
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
