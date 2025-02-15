import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import GenerateQuiz from "./components/generate-quiz";

export default async function Home() {
  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }

  return (
    <div className="min-h-[calc(100vh-68px)] flex justify-center items-center">
      <GenerateQuiz />
    </div>
  );
}
