import { API_URL } from "~/lib/api";
import type { Route } from "./+types/careers";
import { Link } from "react-router";

// This will be changed, so we are keeping it here
type Job = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
};
export async function clientLoader() {
  const res = await fetch(`${API_URL}/jobs`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) return [];

  return (await res.json()) as Job[];
}

// export async function action() {}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Careers" }];
}
export default function Careers({ loaderData }: Route.ComponentProps) {
  const jobs = (loaderData ?? []) as Job[];
  return (
    <div>
      {jobs.map((job) => (
        <>
          <Link className="hover:text-blue-400" key={job._id} to={`/job/${job._id}`}>
            {job.title}
          </Link>
          <br />
        </>
      ))}
    </div>
  );
}
