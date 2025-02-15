import { Quiz } from "@/lib/quiz";
import { db } from ".";
import { quizAttempt, quizzes } from "./schema";
import { eq, and } from "drizzle-orm";

export const QUERIES = {
  getQuizById: async function (id: string) {
    const quiz = await db.select().from(quizzes).where(eq(quizzes.id, id));
    return quiz[0];
  },
  getQuizAttempt: async function (quizId: string, userId: string) {
    const attempt = await db
      .select()
      .from(quizAttempt)
      .where(
        and(eq(quizAttempt.userId, userId), eq(quizAttempt.quizId, quizId))
      );
    return attempt[0];
  },
  getQuizzesByUserId: async function (userId: string) {
    const quizzesDB = await db.query.quizzes.findMany({
      with: {
        attempts: true,
      },
      where: eq(quizzes.userId, userId),
    });
    return quizzesDB;
  },
};

export const MUTATIONS = {
  createQuiz: async function (quiz: Quiz & { userId: string }) {
    const [newQuiz] = await db.insert(quizzes).values(quiz).returning();

    return newQuiz.id;
  },
  createQuizAttempt: async function (attempt: {
    quizId: string;
    userId: string;
  }) {
    const [newAttempt] = await db
      .insert(quizAttempt)
      .values(attempt)
      .returning();

    return newAttempt.id;
  },
  updateQuizAttempt: async function (
    id: string,
    update: {
      answers: { questionIndex: number; selectedAnswerIndex: number }[];
      currentQuestionIndex: number;
    }
  ) {
    const [updatedAttempt] = await db
      .update(quizAttempt)
      .set(update)
      .where(eq(quizAttempt.id, id))
      .returning();

    return updatedAttempt.id;
  },
};
