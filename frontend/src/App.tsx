import { getToken } from "./apis/tokens";
import { Header } from "./components/Header";
import { httpBatchLink } from "@trpc/client";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./trpc";
import { useState } from "react";

export function App() {
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/trpc",
          headers() {
            const token = getToken();
            return { Authorization: `Bearer ${token}` };
          },
        }),
      ],
    })
  );

  return (
    <div className="min-h-screen text-zinc-200 bg-zinc-800">
      <Header />

      <div className="text-xl p-4">
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </trpc.Provider>
      </div>
    </div>
  );
}
