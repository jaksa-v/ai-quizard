"use client";

import { quizSchema, generatePrompt, Category } from "@/lib/quiz";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { useRouter } from "next/navigation";
import { createQuizAttempt, saveQuiz } from "@/app/(quiz)/actions";
import CategoryForm from "./category-form";

export default function Quiz() {
  const router = useRouter();
  const { object, submit, isLoading, stop, error } = useObject({
    api: "/api/quiz",
    schema: quizSchema,
    async onFinish({ object, error }) {
      if (error || !object) {
        console.error(error);
        return;
      }
      const quizId = await saveQuiz(object);
      await createQuizAttempt(quizId);
      router.push(`/${quizId}`);
    },
  });

  const handleSubmit = (categories: Category[]) => {
    const prompt = generatePrompt(categories);
    submit(prompt);
  };

  return (
    <div className="relative w-full max-w-2xl">
      {error && <p className="text-red-500 mb-4">{error?.message}</p>}
      {object ? (
        <span className="text-muted-foreground">Done! Initializing...</span>
      ) : (
        <CategoryForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          stop={stop}
        />
      )}
    </div>
  );
}
