import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import "../../index.css";

export const Route = createFileRoute("/_authenticated/")({
  component: Homepage,
});

type Notes = {
  id: string;
  title: string;
  content: string;
  date: string;
};
function Homepage() {
  const { getToken } = useKindeAuth();
  const [notes, setNotes] = useState<Notes[]>([]);

  useEffect(() => {
    async function getNotes() {
      try {
        const token = await getToken();
        if (!token) {
          throw new Error("No token found");
        }
        const res = await fetch(import.meta.env.VITE_APP_API_URL + "/notes", {
          headers: {
            Authorization: token,
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log("Fetched data:", data); // Log the fetched data
        if (Array.isArray(data.notes)) {
          setNotes(data.notes);
        } else {
          console.error(
            "Expected data.notes to be an array, received:",
            data.notes
          );
        }
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    }

    getNotes();
  }, [getToken]);

  return (
    <div className="App">
      <h1>My Notes</h1>
      <div className="notes-container">
        {notes.length > 0 ? (
          notes.map((note) => (
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
          ))
        ) : (
          <div className="notes-container">
            No notes available, please create.
          </div>
        )}
      </div>
    </div>
  );
}
