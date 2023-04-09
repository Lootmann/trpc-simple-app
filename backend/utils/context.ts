import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { inferAsyncReturnType } from "@trpc/server";

export async function createContext({ req, res }: CreateExpressContextOptions) {
  // TODO: user authentications
  async function getUserFromHeader() {
    return { id: 1, name: "hoge", token: "hogehoge" };
  }

  const user = await getUserFromHeader();
  return { req, res, user };
}

export type Context = inferAsyncReturnType<typeof createContext>;
