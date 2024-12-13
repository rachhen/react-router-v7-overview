import { NavLink } from "react-router";

import { ThemeToggle } from "~/components/theme-toggle";
import { authClient } from "~/lib/auth-client";
import { cn } from "~/lib/utils";
import logoDark from "../assets/logo-dark.svg";
import logoLight from "../assets/logo-light.svg";

function LinkItem({
  className,
  ...props
}: React.ComponentProps<typeof NavLink>) {
  return (
    <NavLink
      className={({ isPending, isActive }) =>
        cn(
          "text-primary hover:underline",
          isActive && "font-bold underline",
          isPending && "opacity-50"
        )
      }
      {...props}
    />
  );
}

function Navbar() {
  const { isPending, data, error } = authClient.useSession();

  return (
    <header className="flex flex-col items-center gap-9">
      <div className="w-[500px] max-w-[100vw] p-4">
        <img
          src={logoLight}
          alt="React Router"
          className="block w-full dark:hidden"
        />
        <img
          src={logoDark}
          alt="React Router"
          className="hidden w-full dark:block"
        />
      </div>
      <nav>
        <ul className="flex items-center justify-center space-x-4">
          <li>
            <LinkItem to="/">Home</LinkItem>
          </li>
          <li>
            <LinkItem to="/about">About</LinkItem>
          </li>
          {data?.user?.email ? (
            <>
              <li>
                <LinkItem to="/admin">Admin</LinkItem>
              </li>
              <li>
                <button
                  className="text-blue-700 hover:underline dark:text-blue-500"
                  onClick={async () => {
                    await authClient.signOut();
                  }}
                >
                  Logout({data?.user?.name})
                </button>
              </li>
            </>
          ) : (
            <li>
              <LinkItem to="/login">Login</LinkItem>
            </li>
          )}
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
