//lambda.ts
import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

import { notes as notesTable } from "@my-sst-app/core/db/schema/notes";
import { db } from "@my-sst-app/core/db";
import { authMiddleware } from "@my-sst-app/core/auth";
import { sum, eq, desc } from "drizzle-orm";

const app = new Hono();

app.get("/notes", authMiddleware, async (c) => {
  const userId = c.var.userId;
  console.log(userId);
  const notes = await db
    .select()
    .from(notesTable)
    .where(eq(notesTable.userId, userId))
    .orderBy(desc(notesTable.date));
  return c.json({ notes });
});

app.post("/notes", authMiddleware, async (c) => {
  const userId = c.var.userId;
  const body = await c.req.json();
  const note = {
    ...body.note,
    userId: userId,
  };
  const newNote = await db.insert(notesTable).values(note).returning();
  return c.json({ notes: newNote });
});

export const handler = handle(app);
