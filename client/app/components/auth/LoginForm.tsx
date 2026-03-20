import { Form, Link } from "react-router";

type LoginFormProps = {
  error?: string;
};

export default function LoginForm({ error }: LoginFormProps) {
  return (
    <Form method="post" className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-sm text-gray-500">Sign in to your account</p>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="you@example.com"
          required
          className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="••••••••"
          required
          className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <a href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</a>

      <button
        type="submit"
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:bg-blue-800"
      >
        Sign in
      </button>

      <p className="text-sm text-gray-500">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">Create one</Link>
      </p>
    </Form>
  );
}