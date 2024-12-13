import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/_layout.tsx", [
    index("routes/home.tsx"),
    route("/about", "routes/about.tsx"),
  ]),
  layout("routes/auth/_layout.tsx", [
    route("/login", "routes/auth/login.tsx"),
    route("/register", "routes/auth/register.tsx"),
  ]),
  ...prefix("admin", [
    layout("routes/admin/_layout.tsx", [
      route("/", "routes/admin/index.tsx"),
      route("/users", "routes/admin/users.tsx"),
    ]),
  ]),
  ...prefix("resources", [route("/theme", "routes/resources/theme.ts")]),
  ...prefix("api", [route("/auth/*", "routes/api/auth.ts")]),
] satisfies RouteConfig;
