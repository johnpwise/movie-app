import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  route("/", "routes/root.tsx", [
    index("routes/dashboard/dashboard.tsx"),
    route("movies", "routes/movies/movies.tsx"),
    route("actors", "routes/actors/actors.tsx"),
  ]),
] satisfies RouteConfig;
