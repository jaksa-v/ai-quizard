import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import GenerateQuiz from "./components/generate-quiz";

export default async function Home() {
  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-[calc(100vh-68px)] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <GenerateQuiz />
      </main>
    </div>
  );
}
