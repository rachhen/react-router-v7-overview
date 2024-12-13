import { Outlet } from "react-router";
import Navbar from "~/features/landing/components/navbar";

function Layout() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <Navbar />
        <Outlet />
      </div>
    </main>
  );
}

export default Layout;
