import { z } from 'zod';

export const formSchema = z.object({
  contain: z.string().toLowerCase(),
  end: z.string().toLowerCase(),
  notContain: z.string().toLowerCase(),
  notStart: z.string().toLowerCase(),
  notEnd: z.string().toLowerCase(),
  sex: z.enum(['M', 'F']).optional(),
  start: z.string().toLowerCase()
});

export type FormSchema = typeof formSchema;
