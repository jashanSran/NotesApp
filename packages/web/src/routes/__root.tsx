import { Link, Outlet } from "@tanstack/react-router";
import "../index.css";
import { type QueryClient } from "@tanstack/react-query";

import { createRootRouteWithContext } from "@tanstack/react-router";

import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootLayout,
});

function RootLayout() {
  const { isAuthenticated } = useKindeAuth();
  return (
    <>
      <div className="nav-bar">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        {isAuthenticated && (
          <Link to="/profile" className="[&.active]:font-bold">
            Profile
          </Link>
        )}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/create" className="[&.active]:font-bold">
          Create
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  );
}
