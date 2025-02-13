import { Quiz } from "@/types/quiz";
import { db } from ".";
import { quizzes } from "./schema";
import { eq } from "drizzle-orm";

export const QUERIES = {
  getQuizById: async function (id: string) {
    const quiz = await db.select().from(quizzes).where(eq(quizzes.id, id));
    return quiz[0];
  },
};

export const MUTATIONS = {
  createQuiz: async function (quiz: Quiz & { userId: string }) {
    const [newQuiz] = await db.insert(quizzes).values(quiz).returning();

    return newQuiz.id;
  },
};
