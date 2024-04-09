import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Homepage,
});

function Homepage() {
  return <div className="p-2">Hello from homepage!</div>;
}
