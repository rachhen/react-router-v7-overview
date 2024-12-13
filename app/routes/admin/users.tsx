import type { Route } from "./+types";

export const loader = async ({ context }: Route.LoaderArgs) => {
  console.log("users", context);
  context.whatever = "whatever users";
  return {
    whatever: context.whatever,
  };
};

function Users({ loaderData }: Route.ComponentProps) {
  return <div>Users {loaderData.whatever}</div>;
}

export default Users;
