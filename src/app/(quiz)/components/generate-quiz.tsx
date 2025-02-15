"use client";

import { Button } from "@/components/ui/button";
import { quizSchema, prompt } from "@/types/quiz";
import { experimental_useObject as useObject } from "ai/react";
import { useRouter } from "next/navigation";
import { createQuizAttempt, saveQuiz } from "@/app/(quiz)/actions";

interface QuizProps {
  buttonText?: string;
}

export default function Quiz({ buttonText = "Generate Quiz" }: QuizProps) {
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
  return (
    <div className="relative">
      {error && <p>{error?.message}</p>}
      {object ? (
        <span className="text-muted-foreground">Done! Initializing...</span>
      ) : (
        <Button onClick={() => submit(prompt)}>
          {isLoading ? "Generating..." : buttonText}
        </Button>
      )}
      {isLoading && (
        <Button
          className="absolute -right-16 top-0"
          variant="link"
          onClick={() => stop()}
        >
          Stop
        </Button>
      )}
    </div>
  );
}
