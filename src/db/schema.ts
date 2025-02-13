import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { text, sqliteTable, index } from "drizzle-orm/sqlite-core";

export const quizzes = sqliteTable(
  "quizzes",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: text("user_id").notNull(),
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
  },
  (table) => [index("user_id_idx").on(table.userId)]
);
