import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

import "../index.css";
export function Login() {
  const { login, register } = useKindeAuth();
  return (
    <div className="auth-msg">
      <h1 className="text-4xl font-bold">Welcome to Notes App</h1>
      <p className="text-xl">Please login to continue</p>
      <div className="mt-8 flex flex-col gap-y-4">
        <button onClick={() => login()}>Login</button>
        <button onClick={() => register()}>Register</button>
      </div>
    </div>
  );
}

const Component = () => {
  const { isAuthenticated } = useKindeAuth();
  if (!isAuthenticated) {
    return <Login />;
  }
  return <Outlet />;
};

export const Route = createFileRoute("/_authenticated")({
  component: Component,
});

// function Authenticated() {
//   return (
//     <>
//       <div className="p-2">Users must be Authenticated!</div>
//       <Outlet />
//     </>
//   );
// }

// function Login() {
//   return (
//     <div className="App">
//       <h1>Login</h1>
//     </div>
//   );
// }
