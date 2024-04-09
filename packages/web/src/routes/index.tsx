import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import "../index.css";

export const Route = createFileRoute("/")({
  component: Homepage,
});

type Notes = {
  id: string;
  title: string;
  content: string;
  date: string;
};
function Homepage() {
  const [notes, setNotes] = useState<Notes[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

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
    const res = await fetch(import.meta.env.VITE_APP_API_URL + "/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        date,
      }),
    });
    const data = await res.json();
    setNotes(data.note);
    setTitle("");
    setContent("");
    setDate("");
  };

  return (
    <div className="App">
      <h1>My Notes</h1>
      <div className="notes-container">
        {notes.map((note) => (
          <div className="note-card" key={note.id}>
            <div className="note-title">
              <strong>Title:</strong> {note.title}
            </div>
            <div className="note-content">
              <strong>Content:</strong> {note.content}
            </div>
            <div className="note-date">
              <strong>Date:</strong> {note.date}
            </div>
          </div>
        ))}
      </div>

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
