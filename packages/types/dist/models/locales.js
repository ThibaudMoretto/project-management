import { z } from 'zod';
export const ZLocales = z.object({
    code: z.string(),
    name: z.string(),
});
