"use server";

import { MUTATIONS } from "@/db/queries";
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

  const newQuizId = MUTATIONS.createQuiz({ ...parsedQuiz.data, userId });

  return newQuizId;
};
