import type { Quiz } from "@/lib/quiz";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleFadingPlus, HistoryIcon } from "lucide-react";
import Link from "next/link";

type ResultsProps = {
  quiz: Quiz;
  userAnswers: number[];
  // onReset: () => void;
};

export default function Results({ quiz, userAnswers }: ResultsProps) {
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === quiz.questions[index].correctAnswerIndex
  ).length;

  return (
    <div className="flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
          <p className="text-lg text-muted-foreground">
            You got {correctAnswers} out of {quiz.questions.length} questions
            correct.
          </p>
        </CardHeader>
        <CardContent className="h-[55dvh] md:h-[65dvh] overflow-scroll">
          <div className="space-y-4">
            {quiz.questions.map((question, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <h3 className="">{question.question}</h3>
                <p className="text-sm text-muted-foreground">
                  Your answer:{" "}
                  <span
                    className={
                      userAnswers[index] === question.correctAnswerIndex
                        ? "text-green-500 font-semibold"
                        : "text-destructive font-semibold"
                    }
                  >
                    {question.answers[userAnswers[index]]}
                  </span>
                </p>
                {userAnswers[index] !== question.correctAnswerIndex && (
                  <p className="text-sm text-muted-foreground">
                    Correct answer:{" "}
                    <span className="font-semibold text-foreground">
                      {question.answers[question.correctAnswerIndex]}
                    </span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col md:flex-row justify-center items-center gap-2 mt-auto border-t pt-4">
          <div className="flex gap-x-1">
            <Link href="/my">
              <Button variant="link">
                <HistoryIcon />
                My Quizzes
              </Button>
            </Link>
            {/* <Button onClick={onReset} variant="outline">
              Restart Quiz
            </Button> */}
            <Link href="/">
              <Button variant="link">
                <CircleFadingPlus />
                Generate Another
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
