import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { inferAsyncReturnType } from "@trpc/server";

export const createContext = ({ req, res }: CreateExpressContextOptions) => ({
  req,
  res,
});

export type Context = inferAsyncReturnType<typeof createContext>;

export async function createAuthContext({
  req,
  res,
}: CreateExpressContextOptions) {
  // TODO: get cookie token
  async function getUserFromHeader() {}
  const user = await getUserFromHeader();

  return { user };
}

export type AuthContext = inferAsyncReturnType<typeof createAuthContext>;
