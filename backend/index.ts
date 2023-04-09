import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { createContext } from "./utils/context";
import { router } from "./trpc";
import { testRouter } from "./routers/hoge";
import { userRouter } from "./routers/users";

// express settings
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Merging router and set these to express
const appRouter = router({
  user: userRouter,
  test: testRouter,
});
export type AppRouter = typeof appRouter;

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(PORT, () => console.log(`🌞🌞🌞 Listening on ${PORT} 🌞🌞🌞`));
