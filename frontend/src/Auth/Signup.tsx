import { trpc } from "../trpc";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Signup() {
  const [form, setForm] = useState<TUser>({ name: "", password: "" });
  const signupMutation = trpc.user.create.useMutation();
  const navigate = useNavigate();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    signupMutation.mutate(
      { name: form.name, password: form.password },
      {
        onSuccess: () => {
          navigate("/auth/login");
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
          {signupMutation.error?.message}
        </p>

        <form
          method="post"
          className="flex flex-col"
          onSubmit={(e) => onSubmit(e)}
        >
          <div className="w-1/2 flex flex-col gap-4">
            <input
              type="text"
              name="name"
              id="name"
              className="bg-zinc-900 px-2 rounded-md"
              value={form.name}
              onChange={(e) => onChange(e)}
              autoFocus
            />
            <input
              type="password"
              name="password"
              id="password"
              className="bg-zinc-900 px-2 rounded-md"
              value={form.password}
              onChange={(e) => onChange(e)}
            />

            <button
              type="submit"
              className="bg-zinc-900 rounded-md hover:bg-green-800 focus:bg-green-800 transition-all duration-200"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
