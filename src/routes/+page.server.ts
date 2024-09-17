import type { PageServerLoad } from './$types.js';
import { type SuperValidated, type Infer, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema, type FormSchema } from './schema';

export const load: PageServerLoad = async ({ url }) => {
  const form: SuperValidated<Infer<FormSchema>> = await superValidate(url, zod(formSchema));

  return { form };
};
