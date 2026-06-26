import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  description: z.string(),

  priority: z.enum([
    "Low",
    "Medium",
    "High",
  ]),

  dueDate: z.string().optional(),

  assignedTo: z.string().optional(),
});

export type CreateTaskForm =
  z.infer<typeof createTaskSchema>;