import { z } from "zod"


export const QuestionSchema = z.object({
    title: z.string().min(5).max(50),
    explanation: z.string().min(5),
    tags: z.array(z.string().min(3).max(10)).min(1).max(3)
  })