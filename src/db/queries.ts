import { auth } from "@clerk/nextjs/server";
import { db } from ".";
import { quizzes } from "./schema";
import { eq } from "drizzle-orm";

export const getQuizById = async (id: string) => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  return await db.query.quizzes.findFirst({ where: eq(quizzes.id, id) });
};
