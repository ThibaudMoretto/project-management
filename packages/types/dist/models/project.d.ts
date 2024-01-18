import { z } from 'zod';
export type TCreateProject = z.infer<typeof ZCreateProject>;
export declare const ZCreateProject: z.ZodObject<{
    title: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
}, {
    title: string;
}>;
export type TProject = z.infer<typeof ZProject>;
export declare const ZProject: z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    id: number;
}, {
    title: string;
    id: number;
}>;
