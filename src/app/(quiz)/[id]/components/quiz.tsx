"use client";

import { useState } from "react";
import type { Quiz } from "@/db/schema";
import Question from "./question";
import Results from "./results";

export default function Quiz({ quiz }: { quiz: Quiz }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    setUserAnswers([...userAnswers, answerIndex]);

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <Results quiz={quiz} userAnswers={userAnswers} onReset={resetQuiz} />
    );
  }

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <Question
          question={quiz.questions[currentQuestion]}
          onAnswer={handleAnswer}
          currentQuestion={currentQuestion + 1}
          totalQuestions={quiz.questions.length}
        />
      </div>
    </div>
  );
}
