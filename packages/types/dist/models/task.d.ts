import { z } from 'zod';
export type TTask = z.infer<typeof ZTask>;
export declare const ZTask: z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodString;
    description: z.ZodString;
    status: z.ZodString;
    priority: z.ZodString;
    projectId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    description: string;
    status: string;
    title: string;
    id: number;
    priority: string;
    projectId: string;
}, {
    description: string;
    status: string;
    title: string;
    id: number;
    priority: string;
    projectId: string;
}>;
export type TCreateTaskData = z.infer<typeof ZCreateTaskData>;
export declare const ZCreateTaskData: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    priority: z.ZodString;
    projectId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    description: string;
    title: string;
    priority: string;
    projectId: string;
}, {
    description: string;
    title: string;
    priority: string;
    projectId: string;
}>;
