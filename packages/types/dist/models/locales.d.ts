import { z } from 'zod';
export declare const ZLocales: z.ZodObject<{
    code: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
    name: string;
}, {
    code: string;
    name: string;
}>;
export type TLocales = z.infer<typeof ZLocales>;
