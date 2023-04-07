import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { createContext } from "./utils/context";
import { userRouter } from "./routers/users";

// express settings
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// tRPC settings
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: userRouter,
    createContext,
  })
);

app.listen(PORT, () => console.log(`🌞🌞🌞 Listening on ${PORT} 🌞🌞🌞`));
