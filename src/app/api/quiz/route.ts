"use server";

import { quizSchema } from "@/types/quiz";
import { anthropic } from "@ai-sdk/anthropic";
import { auth } from "@clerk/nextjs/server";
import { generateObject } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const prompt = await req.json();
  const verifiedPrompt = z.string().safeParse(prompt);

  if (!verifiedPrompt.success) {
    return new Response(verifiedPrompt.error.message, { status: 400 });
  }

  const result = await generateObject({
    model: anthropic("claude-3-5-sonnet-latest"),
    schema: quizSchema,
    temperature: 1.0,
    prompt: verifiedPrompt.data,
  });

  return result.toJsonResponse();
}
