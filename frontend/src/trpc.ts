import { createTRPCReact } from "@trpc/react-query";
import type { UserRouter } from "../../backend/routers/users";

export const trpc = createTRPCReact<UserRouter>();
