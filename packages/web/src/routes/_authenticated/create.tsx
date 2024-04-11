import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

import "../../index.css";

export const Route = createFileRoute("/_authenticated/create")({
  component: Create,
});

type Notes = {
  id: string;
  title: string;
  content: string;
  date: string;
};
function Create() {
  // const navigate = useNavigate();
  const { getToken } = useKindeAuth();
  const [notes, setNotes] = useState<Notes[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate({ from: "/create" });

  useEffect(() => {
    async function getNotes() {
      const res = await fetch(import.meta.env.VITE_APP_API_URL + "/notes");
      const data = await res.json();
      setNotes(data.notes);
    }
    getNotes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get the authorization token
    const token = await getToken();
    if (!token) {
      console.error("No token found. Unable to submit the form.");
      return; // Exit the function if no token is found
    }

    // Perform the POST request with the Authorization header
    const res = await fetch(import.meta.env.VITE_APP_API_URL + "/notes", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        note: {
          title,
          content,
          date,
        },
      }),
    });

    const data = await res.json();
    if (data.note && data.note.title) {
      setNotes([...notes, data.note]);
    } else {
      // Handle unexpected response structure
      console.error("Unexpected response structure:", data);
    }

    // Reset form fields
    setTitle("");
    setContent("");
    setDate("");

    navigate({ to: "/" });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h2>Add Note</h2>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="content">Content</label>
        <input
          id="content"
          type="text"
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
        />

        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          required
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
