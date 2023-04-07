import { trpc } from "../trpc";

export function Index() {
  const users = trpc.getUsers.useQuery();

  return (
    <div>
      {users.data?.map((user) => (
        <p>
          {user.id}.{user.name}
        </p>
      ))}
    </div>
  );
}
