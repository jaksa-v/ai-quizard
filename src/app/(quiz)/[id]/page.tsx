import { getQuizById } from "@/db/queries";
import Quiz from "./components/quiz";
import { notFound } from "next/navigation";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quiz = await getQuizById(id);

  if (!quiz) {
    return notFound();
  }

  return <Quiz quiz={quiz} />;
}
