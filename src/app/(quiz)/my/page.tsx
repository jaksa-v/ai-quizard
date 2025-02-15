import { QUERIES } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function MyQuizzesPage() {
  const session = await auth();
  if (!session.userId) {
    return redirect("/sign-in");
  }

  const quizzes = await QUERIES.getQuizzesByUserId(session.userId);
  if (!quizzes) {
    return notFound();
  }

  return (
    <div className="min-h-[calc(100vh-68px)] py-4 flex flex-col gap-y-4">
      <h1 className="text-2xl font-bold">My Quizzes</h1>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="line-clamp-1">
                  Quiz #{quiz.id.slice(-4)}
                </CardTitle>
                <CardDescription>
                  {quiz.questions.length} questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Created {new Date(quiz.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter>
                <Link href={`/${quiz.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Quiz
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
