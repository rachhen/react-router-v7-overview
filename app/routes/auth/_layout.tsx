import { Outlet, redirect } from "react-router";

import { auth } from "~/lib/auth.server";
import type { Route } from "./+types/_layout";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const session = await auth.api.getSession({ headers: request.headers });

  if (session) {
    return redirect("/admin");
  }

  return {};
};

function AuthLayout() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
