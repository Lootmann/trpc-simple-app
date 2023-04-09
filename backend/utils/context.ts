import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { inferAsyncReturnType } from "@trpc/server";

export async function createContext({ req, res }: CreateExpressContextOptions) {
  return { req, res };
}

export type Context = inferAsyncReturnType<typeof createContext>;
