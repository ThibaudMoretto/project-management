import zod from 'zod';

export const projectSchema = zod.object({
  title: zod.string().min(1, { message: 'Title is required' }),
});
