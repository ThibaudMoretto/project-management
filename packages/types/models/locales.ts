import {z} from 'zod';

export const ZLocales = z.object({
  code: z.string(),
  name: z.string(),
});

export type TLocales = z.infer<typeof ZLocales>;