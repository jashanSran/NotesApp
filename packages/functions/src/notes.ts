//lambda.ts
import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

import { notes as notesTable } from "@my-sst-app/core/db/schema/notes";
import { db } from "@my-sst-app/core/db";
const app = new Hono();

app.get("/notes", async (c) => {
  const notes = await db.select().from(notesTable);
  return c.json({ notes });
});

app.post("/notes", async (c) => {
  const body = await c.req.json();
  const note = {
    ...body.note,
    userId: "user-1",
  };
  const newNote = await db.insert(notesTable).values(note).returning();
  return c.json({ notes: newNote });
});

export const handler = handle(app);
