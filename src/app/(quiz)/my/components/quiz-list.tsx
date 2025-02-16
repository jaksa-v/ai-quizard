import { QUERIES } from "@/db/queries";
import { notFound } from "next/navigation";
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
import { BrainIcon, CircleFadingPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QuizListProps {
  userId: string;
}

export async function QuizList({ userId }: QuizListProps) {
  const quizzes = await QUERIES.getQuizzesByUserId(userId);
  if (!quizzes) {
    return notFound();
  }

  if (quizzes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8">
        <div className="rounded-full bg-muted p-3">
          <BrainIcon className="h-6 w-6" />
        </div>
        <h2 className="text-lg font-semibold">No quizzes yet</h2>
        <p className="text-center text-sm text-muted-foreground">
          You haven&apos;t created any quizzes yet. Generate your first quiz to
          get started!
        </p>
        <Link href="/">
          <Button variant="default">
            <CircleFadingPlus />
            Generate Quiz
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {quizzes.map((quiz) => (
        <li key={quiz.id}>
          <Card className="h-full flex flex-col justify-between">
            <div>
              <CardHeader>
                <CardTitle className="line-clamp-1">
                  Quiz #{quiz.id.slice(-4)}
                </CardTitle>
                <CardDescription>
                  {quiz.questions.length} questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Created {new Date(quiz.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {quiz.categories.map((category) => (
                      <Badge key={category} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </div>
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
  );
}
