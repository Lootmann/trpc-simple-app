import { InputForm } from "./InputForm";
import { trpc } from "../trpc";

export function Index() {
  const users = trpc.user.all.useQuery();

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h2>All Users</h2>
      </header>

      <div className="border p-4">
        {users.data?.map((user) => (
          <p key={user.id}>
            {user.id}.{user.name}
          </p>
        ))}
      </div>

      <div className="border p-4">
        <InputForm />
      </div>
    </div>
  );
}
