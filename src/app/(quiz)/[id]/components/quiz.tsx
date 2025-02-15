"use client";

import { useState } from "react";
import type { Quiz, QuizAttempt } from "@/db/schema";
import Question from "./question";
import Results from "./results";
import { updateQuizAttempt } from "../../actions";

export default function Quiz({
  quiz,
  attempt,
}: {
  quiz: Quiz;
  attempt: QuizAttempt;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(
    attempt.currentQuestionIndex
  );
  const [answers, setAnswers] = useState(attempt.answers);

  const handleAnswer = async (answerIndex: number) => {
    const newAnswers = [...answers];

    newAnswers.push({
      questionIndex: currentQuestion,
      selectedAnswerIndex: answerIndex,
    });

    setAnswers(newAnswers);
    setCurrentQuestion(currentQuestion + 1);

    await updateQuizAttempt(attempt.id, {
      answers: newAnswers,
      currentQuestionIndex: currentQuestion + 1,
    });
  };

  // NOTE: hiding this for now
  // const resetQuiz = () => {
  //   setCurrentQuestion(0);
  //   setUserAnswers([]);
  // };

  if (currentQuestion >= quiz.questions.length) {
    return (
      <Results
        quiz={quiz}
        userAnswers={answers.map((a) => a.selectedAnswerIndex)}
        // onReset={resetQuiz}
      />
    );
  }

  return (
    <div className="">
      <Question
        question={quiz.questions[currentQuestion]}
        onAnswer={handleAnswer}
        currentQuestion={currentQuestion + 1}
        totalQuestions={quiz.questions.length}
      />
    </div>
  );
}
