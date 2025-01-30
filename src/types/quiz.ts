import { z } from "zod";

// IDEAS
// - True/False
// - Fill-in-the-blank
// - Image-based (describe hypothetical image)
// - Sequential ordering

export const prompt = `
You are a expert quiz creator.

Generate a diverse 5-question quiz that spans at least 4 different subject categories 
(science, history, pop culture, technology, arts, or geography). 

1. Ensure questions cover different difficulty levels (easy, medium, hard)

2. Avoid similar subjects in consecutive questions

3. For each question include:
  - Clear, concise phrasing
  - Specific correct answer

4. Sometimes include surprising, lesser-known facts across different domains,
or include plausible distractors.`;

export const quizQuestionSchema = z.object({
  question: z.string(),
  answers: z.array(z.string()),
  correctAnswerIndex: z.number(),
});

export const quizSchema = z.object({
  questions: z.array(quizQuestionSchema),
});

export type QuizQuestion = z.infer<typeof quizQuestionSchema>;
export type Quiz = z.infer<typeof quizSchema>;
