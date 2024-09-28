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
  import qs from 'qs';

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

  const { form: formData, enhance, validateForm } = form;
  validateForm({ update: true });

  const selectedSex = $derived(
    $formData.sex
      ? {
          label: $formData.sex,
          value: $formData.sex
        }
      : undefined
  );
</script>

<form
  method="POST"
  use:enhance
  class="flex flex-wrap items-center justify-between gap-10 px-10 py-3"
>
  <Form.Field {form} name="contain">
    <Form.Control let:attrs>
      <Form.Label>Contiene</Form.Label>
      <Input {...attrs} bind:value={$formData.contain} />
    </Form.Control>
    <Form.Description>Il nome non contiene.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="notContain">
    <Form.Control let:attrs>
      <Form.Label>Non Contiene</Form.Label>
      <Input {...attrs} bind:value={$formData.notContain} />
    </Form.Control>
    <Form.Description>Il nome non contiene.</Form.Description>
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

  <Form.Field {form} name="notStart">
    <Form.Control let:attrs>
      <Form.Label>NotStart</Form.Label>
      <Input {...attrs} bind:value={$formData.notStart} />
    </Form.Control>
    <Form.Description>Non nizia con.</Form.Description>
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

  <Form.Field {form} name="notEnd">
    <Form.Control let:attrs>
      <Form.Label>NotEnd</Form.Label>
      <Input {...attrs} bind:value={$formData.notEnd} />
    </Form.Control>
    <Form.Description>Non finisce con.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="minLength">
    <Form.Control let:attrs>
      <Form.Label>Min</Form.Label>
      <Input type="number" {...attrs} bind:value={$formData.minLength} />
    </Form.Control>
    <Form.Description>Minimo caratteri.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="maxLength">
    <Form.Control let:attrs>
      <Form.Label>Max</Form.Label>
      <Input type="number" {...attrs} bind:value={$formData.maxLength} />
    </Form.Control>
    <Form.Description>Massimo caratteri.</Form.Description>
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
    <Form.Description>Sesso.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Button>Cerca</Form.Button>
</form>
