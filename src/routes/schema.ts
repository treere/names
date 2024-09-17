import { z } from 'zod';

export const formSchema = z.object({
  text: z.string().max(10)
});

export type FormSchema = typeof formSchema;
