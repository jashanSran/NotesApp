import { createFileRoute } from "@tanstack/react-router";

import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { logout, user } = useKindeAuth();
  return (
    <div className="auth-msg">
      <h1 className="text-4xl font-bold">Hi {user?.given_name}</h1>
      <div className="text-2xl font-bold">{user?.email}</div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
