import { z } from "zod"


export const QuestionSchema = z.object({
    title: z.string().min(5).max(150),
    explanation: z.string().min(20),
    tags: z.array(z.string().min(2).max(10)).min(1).max(3)
  })