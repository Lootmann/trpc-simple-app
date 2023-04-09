import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { getUserByName } from "../apis/users";
import { inferAsyncReturnType } from "@trpc/server";

export async function createContext({ req, res }: CreateExpressContextOptions) {
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      const username = req.headers.authorization;
      const user = getUserByName(username);
      return user;
    }
    return null;
  }

  // NOTE: when Authorization header is valid, returns username
  // NOTE: when not, returns null
  const user = await getUserFromHeader();
  return { req, res, user };
}

export type Context = inferAsyncReturnType<typeof createContext>;
