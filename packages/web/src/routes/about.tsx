import { createFileRoute } from "@tanstack/react-router";
import "../index.css";
export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return <div className="about-content">Hello from About!</div>;
}
