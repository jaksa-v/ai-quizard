"use client";

import { Button } from "@/components/ui/button";
import { quizSchema, prompt } from "@/types/quiz";
import { experimental_useObject as useObject } from "ai/react";
import { useRouter } from "next/navigation";
import { saveQuiz } from "../actions";

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
      router.push(`/${quizId}`);
    },
  });
  return (
    <>
      {error && <p>{error?.message}</p>}
      {object ? (
        <span>Done! Initializing...</span>
      ) : (
        <Button onClick={() => submit(prompt)}>
          {isLoading ? "Generating..." : "Generate Quiz"}
        </Button>
      )}
      {isLoading && (
        <button type="button" onClick={() => stop()}>
          Stop
        </button>
      )}
    </>
  );
}
