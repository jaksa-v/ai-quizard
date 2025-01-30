"use client";

import { Button } from "@/components/ui/button";
import { quizSchema, prompt } from "@/types/quiz";
import { experimental_useObject as useObject } from "ai/react";

export default function Quiz() {
  const { object, submit, isLoading, stop, error } = useObject({
    api: "/api/quiz",
    schema: quizSchema,
  });
  return (
    <>
      {error && <p>{error?.message}</p>}
      <Button onClick={() => submit(prompt)}>
        {isLoading ? "Generating..." : "Generate Quiz"}
      </Button>
      {isLoading && (
        <button type="button" onClick={() => stop()}>
          Stop
        </button>
      )}
      {object?.questions?.map((question, index) => (
        <div key={index}>
          <p>{question?.question}</p>
          {question?.answers?.map((answer, index) => (
            <p key={index}>{answer}</p>
          ))}
        </div>
      ))}
    </>
  );
}
