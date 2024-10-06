import { z } from 'zod';

export const formSchema = z.object({
  contain: z.string().toLowerCase().default(''),
  end: z.string().toLowerCase().default(''),
  notContain: z.string().toLowerCase().default(''),
  notStart: z.string().toLowerCase().default(''),
  notEnd: z.string().toLowerCase().default(''),
  start: z.string().toLowerCase().default(''),
  minLength: z.number().nonnegative().default(0),
  maxLength: z.number().nonnegative().default(0),
  male: z.preprocess((x) => x !== false, z.boolean()),
  female: z.preprocess((x) => x !== false, z.boolean())
});

export type FormSchema = typeof formSchema;

export type FormType = z.infer<typeof formSchema>;
