import { trpc } from "../trpc";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type TUser = {
  name: string;
  password: string;
};

export function Login() {
  const [form, setForm] = useState<TUser>({ name: "", password: "" });
  const loginMutation = trpc.user.login.useMutation();
  const navigate = useNavigate();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    loginMutation.mutate(
      {
        name: form.name,
        password: form.password,
      },
      {
        onSuccess: () => {
          navigate("/users");
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  }

  return (
    <div>
      <div className="p-6">
        <h2 className="text-2xl mb-4">Login</h2>

        <p className="m-2 text-red-600 text-2xl">
          {loginMutation.error?.message}
        </p>

        <form
          method="post"
          className="flex flex-col gap-4"
          onSubmit={(e) => onSubmit(e)}
        >
          <p>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-zinc-900 px-2 rounded-md"
              value={form.name}
              onChange={(e) => onChange(e)}
              autoFocus
            />
          </p>

          <p>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-zinc-900 px-2 rounded-md"
              value={form.password}
              onChange={(e) => onChange(e)}
            />
          </p>

          <p>
            <button type="submit">Login</button>
          </p>
        </form>
      </div>
    </div>
  );
}
