import React from "react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <div className="flex gap-4 text-2xl bg-zinc-900 p-4">
      <h1>tRPC React</h1>

      <Link
        to={`/`}
        className="hover:bg-slate-300 hover:text-zinc-900 px-2 rounded-md"
      >
        Top
      </Link>

      <Link
        to={`/users`}
        className="hover:bg-slate-300 hover:text-zinc-900 px-2 rounded-md"
      >
        Users
      </Link>
    </div>
  );
}
