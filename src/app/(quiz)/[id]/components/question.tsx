import type { QuizQuestion } from "@/lib/quiz";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";

type QuestionProps = {
  question: QuizQuestion;
  onAnswer: (answerIndex: number) => void;
  currentQuestion: number;
  totalQuestions: number;
};

export default function Question({
  question,
  onAnswer,
  currentQuestion,
  totalQuestions,
}: QuestionProps) {
  useEffect(() => {
    // Clear any focused element when the question changes
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [question]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal text-lg">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.answers.map((answer, index) => (
            <Button
              key={index}
              autoFocus={false}
              onClick={() => onAnswer(index)}
              variant="quiz"
            >
              {answer}
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Question {currentQuestion} of {totalQuestions}
        </p>
      </CardFooter>
    </Card>
  );
}
