import { z } from 'zod';

export type TCreateProject = z.infer<typeof ZCreateProject>;
export const ZCreateProject = z.object({
  title: z.string().min(1).max(255),
});

export type TProject = z.infer<typeof ZProject>;
export const ZProject = z
  .object({
    id: z.number(),
    title: z.string().min(1).max(255),
  });
