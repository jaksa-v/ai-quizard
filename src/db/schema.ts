import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { text, sqliteTable, index, integer } from "drizzle-orm/sqlite-core";

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

export const quizAttempt = sqliteTable(
  "quiz_attempts",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    quizId: text("quiz_id").notNull(),
    userId: text("user_id").notNull(),
    currentQuestionIndex: integer("current_question_index")
      .notNull()
      .default(0),
    answers: text("answers", { mode: "json" })
      .$type<
        {
          questionIndex: number;
          selectedAnswerIndex: number;
        }[]
      >()
      .notNull()
      .default([]),
    createdAt: text("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("quiz_progress_user_quiz_idx").on(table.userId, table.quizId),
  ]
);

export type Quiz = typeof quizzes.$inferSelect;
export type QuizAttempt = typeof quizAttempt.$inferSelect;
