<script lang="ts">
  import { goto } from '$app/navigation';
  import { formSchema } from './schema';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { type Infer, type SuperValidated } from 'sveltekit-superforms';
  import Label from '$lib/components/ui/label.svelte';
  import FormField from '$lib/components/ui/form-field.svelte';
  import type { FormSchema } from './schema';
  import qs from 'qs';
  import { Button } from '$lib/components/ui/button';

  let { data }: { data: SuperValidated<Infer<FormSchema>> } = $props();

  const form = superForm(data, {
    SPA: true,
    validators: zodClient(formSchema),
    async onUpdate({ form, cancel }) {
      const params = qs.stringify(form.data);
      goto(`/?${params}`, { keepFocus: true });
      cancel();
    }
  });

  const { form: formData, enhance, validateForm, errors } = form;
  validateForm({ update: true });
</script>

<form method="POST" use:enhance>
  <div class="flex flex-wrap place-items-center gap-1">
    <FormField name="contain" formData={form} label="Contiene" />
    <FormField name="notContain" formData={form} label="Non contiene" />
    <FormField name="start" formData={form} label="Inizia" />
    <FormField name="notStart" formData={form} label="Non inizia" />
    <FormField name="end" formData={form} label="Finisce" />
    <FormField name="notEnd" formData={form} label="Non finisce" />
    <FormField name="minLength" formData={form} label="Lunghezza minima" type="number" />
    <FormField name="maxLength" formData={form} label="Lunghezza massima" type="number" />

    <Label for="sex">Sesso</Label>
    <select name="sex" bind:value={$formData.sex}>
      <option value={'M'}>M</option>
      <option value={'F'}>F</option>
    </select>
  </div>
  <div class="flex justify-end gap-1">
    <Button type="submit">Cerca</Button>

    <Button onclick={() => goto('/', { keepFocus: true })}>Reset</Button>
  </div>
</form>
