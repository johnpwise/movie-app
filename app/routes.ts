import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/dashboard.tsx"),
    route("movies", "routes/movies.tsx"),
    route("actors", "routes/actors.tsx"),
] satisfies RouteConfig;
