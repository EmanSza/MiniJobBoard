import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),
  route("careers", "routes/careers.tsx"),
  route("job/:jobId", "routes/job.tsx"),
] satisfies RouteConfig;
