import { z } from 'zod';
export const ZTask = z.object({
    id: z.number(),
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    status: z.string().min(1).max(255),
    priority: z.string().min(1).max(255),
    projectId: z.string().min(1).max(255),
});
export const ZCreateTaskData = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    priority: z.string().min(1).max(255),
    projectId: z.string().min(1).max(255),
});
