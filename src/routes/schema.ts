import { z } from 'zod';

export const formSchema = z.object({
  text: z.string().toLowerCase(),
  start: z.string().toLowerCase(),
  end: z.string().toLowerCase()
});

export type FormSchema = typeof formSchema;
