import { z } from "zod";

export const categories = [
  "Science",
  "History",
  "Pop Culture",
  "Technology",
  "Arts",
  "Geography",
  "Sports",
  "Literature",
] as const;

export const MAX_CATEGORIES = 5;

export type Category = (typeof categories)[number];

export const categorySchema = z.enum(categories);

export function generatePrompt(selectedCategories: Category[]) {
  return `You are an expert quiz creator.

Generate a diverse 5-question quiz focusing on the following categories:
${selectedCategories.join(", ")}.

1. Ensure questions cover different difficulty levels (easy, medium, hard)

2. Avoid similar subjects in consecutive questions

3. For each question include:
  - Clear, concise phrasing
  - Specific correct answer

4. Sometimes include surprising, lesser-known facts across different domains,
or include plausible distractors.`;
}

export const quizQuestionSchema = z.object({
  question: z.string(),
  answers: z.array(z.string()),
  correctAnswerIndex: z.number(),
});

export const quizSchema = z.object({
  questions: z.array(quizQuestionSchema),
  categories: z.array(categorySchema).default([]),
});

export type QuizQuestion = z.infer<typeof quizQuestionSchema>;
export type Quiz = z.infer<typeof quizSchema>;
