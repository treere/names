import { type SuperValidated, type Infer, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema, type FormSchema } from './schema';
import type { PageLoad } from './$types';
import { filteredNames } from '$lib/names';

export const load: PageLoad = async ({ url }) => {
  const form: SuperValidated<Infer<FormSchema>> = await superValidate(url, zod(formSchema));

  return {
    form,
    names: filteredNames(form.data)
  };
};
