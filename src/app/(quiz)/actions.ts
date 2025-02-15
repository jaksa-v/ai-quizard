"use server";

import { MUTATIONS } from "@/db/queries";
import { Quiz, quizSchema } from "@/types/quiz";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";

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

export const createQuizAttempt = async (quizId: string) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const parsedQuizId = z.string().cuid2().safeParse(quizId);

  if (!parsedQuizId.success) {
    throw new Error(parsedQuizId.error.message);
  }

  const attemptId = MUTATIONS.createQuizAttempt({
    quizId: parsedQuizId.data,
    userId,
  });

  return attemptId;
};

export const updateQuizAttempt = async (
  id: string,
  update: {
    answers: { questionIndex: number; selectedAnswerIndex: number }[];
    currentQuestionIndex: number;
  }
) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const parsedId = z.string().cuid2().safeParse(id);

  if (!parsedId.success) {
    throw new Error(parsedId.error.message);
  }

  const parsedUpdate = z
    .object({
      answers: z.array(
        z.object({
          questionIndex: z.number().int(),
          selectedAnswerIndex: z.number().int(),
        })
      ),
      currentQuestionIndex: z.number().int(),
    })
    .safeParse(update);

  if (!parsedUpdate.success) {
    throw new Error(parsedUpdate.error.message);
  }

  const updatedAttemptId = await MUTATIONS.updateQuizAttempt(
    parsedId.data,
    parsedUpdate.data
  );

  return updatedAttemptId;
};
