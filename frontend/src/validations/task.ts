import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3),

  description: z.string(),

  priority: z.enum([
    "Low",
    "Medium",
    "High",
  ]),

  status: z
    .enum([
      "Open",
      "In Progress",
      "Testing",
      "Done",
    ])
    .optional(),

  dueDate: z.string().optional(),

  assignedTo: z.string().optional(),
});

export type CreateTaskForm =
  z.infer<typeof createTaskSchema>;