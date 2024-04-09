import {
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  index,
  varchar,
} from "drizzle-orm/pg-core";

export const notes = pgTable(
  "notes",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    title: varchar("title", { length: 256 }),
    content: text("content"),
    date: date("date", { mode: "string" }).notNull(),
  },
  (notes) => {
    return {
      nameIndex: index("userId_idx").on(notes.userId),
    };
  }
);
