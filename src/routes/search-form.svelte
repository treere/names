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
      const result = await form.validateForm();
      console.info('RESULT', result);
      if (result.valid) {
        formData.forEach((val, key) => {
          const value = val.toString();
          if (value !== '') action.searchParams.set(key, value);
          else action.searchParams.delete(key);
        });

        goto(action, { keepFocus: true });
      }
      cancel();
    }
  });

  const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
  <Form.Field {form} name="text">
    <Form.Control let:attrs>
      <Form.Label>Contiene</Form.Label>
      <Input {...attrs} bind:value={$formData.text} />
    </Form.Control>
    <Form.Description>Cerca nel nome.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="start">
    <Form.Control let:attrs>
      <Form.Label>Start</Form.Label>
      <Input {...attrs} bind:value={$formData.start} />
    </Form.Control>
    <Form.Description>Inizia con.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="end">
    <Form.Control let:attrs>
      <Form.Label>End</Form.Label>
      <Input {...attrs} bind:value={$formData.end} />
    </Form.Control>
    <Form.Description>Finisce con.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button>Cerca</Form.Button>
</form>
