import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { QuizList } from "./components/quiz-list";
import { QuizListSkeleton } from "./components/quiz-list-skeleton";

export default async function MyQuizzesPage() {
  const session = await auth();
  if (!session.userId) {
    return redirect("/sign-in");
  }

  return (
    <div className="min-h-[calc(100vh-68px)] py-4 flex flex-col gap-y-4">
      <h1 className="text-2xl font-bold">My Quizzes</h1>
      <Suspense fallback={<QuizListSkeleton />}>
        <QuizList userId={session.userId} />
      </Suspense>
    </div>
  );
}
