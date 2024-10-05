<script lang="ts">
  import { goto } from '$app/navigation';
  import { formSchema } from './schema';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { type Infer, type SuperValidated } from 'sveltekit-superforms';

  import FormField from '$lib/components/ui/form-field.svelte';
  import FormCheckboxField from '$lib/components/ui/form-checkbox-field.svelte';
  import type { FormSchema } from './schema';
  import qs from 'qs';
  import { Button } from '$lib/components/ui/button';
  let { data }: { data: SuperValidated<Infer<FormSchema>> } = $props();

  const superform = superForm(data, {
    SPA: true,
    validators: zodClient(formSchema),
    async onUpdate({ form, cancel }) {
      const params = qs.stringify(form.data);
      goto(`/?${params}`, { keepFocus: true });
      cancel();
    }
  });

  const { enhance, validateForm } = superform;
  validateForm({ update: true });
</script>

<form method="POST" use:enhance>
  <div class="flex flex-wrap place-items-center gap-1">
    <FormField field="contain" {superform} label="Contiene" />
    <FormField field="notContain" {superform} label="Non contiene" />
    <FormField field="start" {superform} label="Inizia" />
    <FormField field="notStart" {superform} label="Non inizia" />
    <FormField field="end" {superform} label="Finisce" />
    <FormField field="notEnd" {superform} label="Non finisce" />
    <FormField field="minLength" {superform} label="Lunghezza minima" type="number" />
    <FormField field="maxLength" {superform} label="Lunghezza massima" type="number" />

    <FormCheckboxField field="male" {superform} label="Maschio" />
    <FormCheckboxField field="female" {superform} label="Femmina" />
  </div>
  <div class="flex justify-end gap-1">
    <Button type="submit">Cerca</Button>

    <Button onclick={() => goto('/', { keepFocus: true })}>Reset</Button>
  </div>
</form>
