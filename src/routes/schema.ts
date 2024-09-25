import { z } from 'zod';

export const formSchema = z.object({
  text: z.string().toLowerCase(),
  start: z.string().toLowerCase(),
  end: z.string().toLowerCase(),
  sex: z.enum(['M', 'F']).optional()
});

export type FormSchema = typeof formSchema;
