import { trpc } from "../trpc";

export function Index() {
  const { data } = trpc.test.ping.useQuery();
  const pong = trpc.test.admin.pong.useQuery();

  return (
    <div className="text-xl">
      <h2 className="text-2xl">TopIndex</h2>

      <hr className="my-4" />

      <div className="flex flex-col gap-6 text-2xl">
        <p>Server is running ...?</p>

        {pong.data ? (
          <p>
            <span className="bg-yellow-600 text-black p-2 rounded-md">
              Login As {pong.data.auth.name}
            </span>
          </p>
        ) : (
          <p>Not Logged In D:</p>
        )}

        {data ? (
          <p>
            <span className="bg-zinc-200 text-zinc-900 mr-2 p-2 rounded-md">
              Ping [:^)]
            </span>

            <span className="bg-green-800 text-zinc-200 p-2 rounded-md">
              &lt; {data.msg}
            </span>
          </p>
        ) : (
          <p>
            <span className="bg-red-800 text-zinc-200 p-2 rounded-md">D:</span>
            <span className="bg-zinc-900 text-zinc-200 p-2 rounded-md">
              &lt; nah
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
