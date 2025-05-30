import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/dashboard/dashboard.tsx"),
    route("movies", "routes/movies/movies.tsx"),
    route("actors", "routes/actors/actors.tsx"),
] satisfies RouteConfig;
