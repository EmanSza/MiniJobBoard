import { API_URL } from "~/lib/api";
import type { Route } from "./+types/job";

type Job = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
};

export async function clientLoader({ params }: Route.LoaderArgs) {
  const jobId = params.jobId;

  const res = await fetch(`${API_URL}/jobs/${jobId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Response("Job not found", { status: 404 });

  return (await res.json()) as Job;
}

// export async function action() {}

export default function Job({ loaderData }: Route.ComponentProps) {
  const job = (loaderData ?? []) as Job;
  return (
    <>
      <br />
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <h2 className="text-1xl font-bold">{job.category}</h2>
      <br />
      <p>{job.content}</p>
    </>
  );
}

export function ErrorBoundary() {
  return <p>Job not found.</p>;
}
