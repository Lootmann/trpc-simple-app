import { trpc } from "../trpc";
import { useState } from "react";

type TUserForm = {
  name: string;
  password: string;
};

export function InputForm() {
  const utils = trpc.useContext();
  const userMutation = trpc.user.create.useMutation({
    onSuccess: () => {
      utils.user.all.invalidate();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [form, setForm] = useState<TUserForm>({ name: "", password: "" });

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    userMutation.mutate({ name: form.name, password: form.password });
    setForm({ ...form, name: "", password: "" });
  }

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h2>Input Form</h2>
      </header>

      <form
        action=""
        method="post"
        className="w-1/2 flex flex-col gap-4"
        onSubmit={(e) => onSubmit(e)}
      >
        <input
          type="text"
          name="name"
          id="name"
          className="bg-zinc-900 text-zinc-200 rounded-md px-2 border-2 border-zinc-500 outline-none"
          onChange={(e) => onChange(e)}
          value={form.name}
          autoFocus
        />

        <input
          type="password"
          name="password"
          id="password"
          className="bg-zinc-900 text-zinc-200 rounded-md px-2 border-2 border-zinc-500 outline-none"
          onChange={(e) => onChange(e)}
          value={form.password}
        />

        <input
          type="submit"
          value="Create"
          className="bg-zinc-900 hover:text-zinc-900 rounded-md px-2 border-2 border-zinc-600 focus:bg-green-600 focus:text-zinc-900 outline-none"
        />
      </form>
    </div>
  );
}
