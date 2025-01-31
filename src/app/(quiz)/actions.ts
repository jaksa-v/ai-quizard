"use server";

import { db } from "@/db";
import { quizzes } from "@/db/schema";
import { Quiz, quizSchema } from "@/types/quiz";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const saveQuiz = async (quiz: Quiz) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const parsedQuiz = quizSchema.safeParse(quiz);

  if (!parsedQuiz.success) {
    throw new Error(parsedQuiz.error.message);
  }

  const [newQuiz] = await db
    .insert(quizzes)
    .values(parsedQuiz.data)
    .returning();

  return newQuiz.id;
};
