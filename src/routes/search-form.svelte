<script lang="ts">
  import { goto } from '$app/navigation';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { formSchema } from './schema';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { type Infer, type SuperValidated } from 'sveltekit-superforms';
  import type { FormSchema } from './schema';

  let { data }: { data: SuperValidated<Infer<FormSchema>> } = $props();

  const form = superForm(data, {
    validators: zodClient(formSchema),
    async onSubmit({ formData, cancel, action }) {
      formData.forEach((val, key) => {
        const value = val.toString();
        if (value !== '') action.searchParams.set(key, value);
        else action.searchParams.delete(key);
      });

      goto(action, { keepFocus: true });
      cancel();
    }
  });

  const { form: formData, enhance, allErrors } = form;
</script>

<form method="POST" use:enhance>
  <Form.Field {form} name="text">
    <Form.Control let:attrs>
      <Form.Label>Username</Form.Label>
      <Input {...attrs} bind:value={$formData.text} />
    </Form.Control>
    <Form.Description>Cerca nel nome.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button disabled={$allErrors.length !== 0}>Cerca</Form.Button>
</form>
