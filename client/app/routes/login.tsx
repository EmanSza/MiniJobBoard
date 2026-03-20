import { redirect } from "react-router";
import type { Route } from "./+types/login";
import AuthCard from "../components/auth/AuthCard";
import LoginForm from "../components/auth/LoginForm";
import { API_URL } from "~/lib/api";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Sign In" }];
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    return { error: "Invalid email or password." };
  }

  return redirect("/");
}

export default function Login({ actionData }: Route.ComponentProps) {
  return (
    <AuthCard>
      <LoginForm error={actionData?.error} />
    </AuthCard>
  );
}
