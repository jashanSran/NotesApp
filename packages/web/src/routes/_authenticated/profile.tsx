import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/profile")({
  component: () => <div className="profile-content">Hello from profile!</div>,
});
