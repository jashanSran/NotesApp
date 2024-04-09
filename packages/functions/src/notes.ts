//lambda.ts
import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

const app = new Hono();

const fakeNotes = [
  {
    id: "1",
    title: "First Note",
    content: "This is the first note",
    date: "2021-09-01",
  },
  {
    id: "2",
    title: "Second Note",
    content: "This is the second note",
    date: "2021-09-02",
  },
];
app.get("/notes", (c) => {
  return c.json({ notes: fakeNotes });
});

app.post("/notes", async (c) => {
  const body = await c.req.json();

  fakeNotes.push({
    ...body,
    id: (fakeNotes.length + 1).toString(),
  });
  return c.json({ note: fakeNotes });
});

export const handler = handle(app);
