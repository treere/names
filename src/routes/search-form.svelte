<script lang="ts">
  import { goto } from '$app/navigation';
  import * as Form from '$lib/components/ui/form';
  import * as Select from '$lib/components/ui/select';
  import { Input } from '$lib/components/ui/input';
  import { formSchema } from './schema';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { type Infer, type SuperValidated } from 'sveltekit-superforms';
  import type { FormSchema } from './schema';

  let { data }: { data: SuperValidated<Infer<FormSchema>> } = $props();
  console.info(data);

  const form = superForm(data, {
    validators: zodClient(formSchema),
    async onSubmit({ formData, cancel, action }) {
      const { valid, data } = await form.validateForm();

      if (valid) {
        if (data.contain !== '') action.searchParams.set('contain', data.contain);
        else action.searchParams.delete('contain');

        if (data.start !== '') action.searchParams.set('start', data.start);
        else action.searchParams.delete('start');

        if (data.end !== '') action.searchParams.set('end', data.end);
        else action.searchParams.delete('end');

        if (data.sex !== undefined) action.searchParams.set('sex', data.sex);
        else action.searchParams.delete('sex');

        goto(action, { keepFocus: true });
      }
      cancel();
    }
  });

  const { form: formData, enhance } = form;

  const selectedSex = $derived(
    $formData.sex
      ? {
          label: $formData.sex,
          value: $formData.sex
        }
      : undefined
  );
</script>

<form method="POST" use:enhance>
  <Form.Field {form} name="contain">
    <Form.Control let:attrs>
      <Form.Label>Contiene</Form.Label>
      <Input {...attrs} bind:value={$formData.contain} />
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
  <Form.Field {form} name="sex">
    <Form.Control let:attrs>
      <Form.Label>Sex</Form.Label>
      <Select.Root
        selected={selectedSex}
        onSelectedChange={(v) => {
          v && ($formData.sex = v.value);
        }}
      >
        <Select.Trigger class="w-[180px]" {...attrs}>
          <Select.Value placeholder="" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value={'M'}>Maschio</Select.Item>
          <Select.Item value={'F'}>Femmina</Select.Item>
        </Select.Content>
      </Select.Root>
    </Form.Control>
  </Form.Field>
  <Form.Button>Cerca</Form.Button>
</form>
