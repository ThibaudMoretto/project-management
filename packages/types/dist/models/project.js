import { z } from 'zod';
export const ZCreateProject = z.object({
    title: z.string().min(1).max(255),
});
export const ZProject = z
    .object({
    id: z.number(),
    title: z.string().min(1).max(255),
});
