import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const quizzes = sqliteTable("quizzes", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  questions: text("questions", { mode: "json" }).notNull().$type<
    {
      question: string;
      answers: string[];
      correctAnswerIndex: number;
    }[]
  >(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Types generated from the table
export type Quiz = typeof quizzes.$inferSelect;
