import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: Authenticated,
});

function Authenticated() {
  return (
    <>
      <div className="p-2">Users must be Authenticated!</div>
      <Outlet />
    </>
  );
}

function Login() {
  return (
    <div className="App">
      <h1>Login</h1>
    </div>
  );
}
