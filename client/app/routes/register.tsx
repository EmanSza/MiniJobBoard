import { redirect } from "react-router";
import type { Route } from "./+types/register";
import AuthCard from "../components/auth/AuthCard";
import RegisterForm from "../components/auth/RegisterForm";
import { API_URL } from "~/lib/api";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Create Account" }];
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) {
    return { error: "Something went wrong. Please try again." };
  }

  return redirect("/login");
}

export default function Register({ actionData }: Route.ComponentProps) {
  return (
    <AuthCard>
      <RegisterForm error={actionData?.error} />
    </AuthCard>
  );
}