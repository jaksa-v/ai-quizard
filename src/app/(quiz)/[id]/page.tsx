import { QUERIES } from "@/db/queries";
import Quiz from "./components/quiz";
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth();
  if (!session.userId) {
    return redirect("/sign-in");
  }

  const quiz = await QUERIES.getQuizById(id);
  if (!quiz || quiz.userId !== session.userId) {
    return notFound();
  }

  const attempt = await QUERIES.getQuizAttempt(id, session.userId);
  if (!attempt) {
    return notFound();
  }

  return (
    <div className="min-h-[calc(100vh-68px)] flex justify-center items-center">
      <Quiz quiz={quiz} attempt={attempt} />
    </div>
  );
}
