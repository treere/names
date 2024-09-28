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

<form method="POST" use:enhance>
  <div class="flex flex-wrap place-items-center gap-1">
    <Form.Field {form} name="contain">
      <Form.Control let:attrs>
        <Form.Label>Contiene</Form.Label>
        <Input {...attrs} bind:value={$formData.contain} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="notContain">
      <Form.Control let:attrs>
        <Form.Label>Non contiene</Form.Label>
        <Input {...attrs} bind:value={$formData.notContain} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="start">
      <Form.Control let:attrs>
        <Form.Label>Inizia con</Form.Label>
        <Input {...attrs} bind:value={$formData.start} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="notStart">
      <Form.Control let:attrs>
        <Form.Label>Non inizia con</Form.Label>
        <Input {...attrs} bind:value={$formData.notStart} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="end">
      <Form.Control let:attrs>
        <Form.Label>Finisce con</Form.Label>
        <Input {...attrs} bind:value={$formData.end} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="notEnd">
      <Form.Control let:attrs>
        <Form.Label>Non finisce con</Form.Label>
        <Input {...attrs} bind:value={$formData.notEnd} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="minLength">
      <Form.Control let:attrs>
        <Form.Label>Lunghezza minima</Form.Label>
        <Input type="number" {...attrs} bind:value={$formData.minLength} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="maxLength">
      <Form.Control let:attrs>
        <Form.Label>Lunghezza massima</Form.Label>
        <Input type="number" {...attrs} bind:value={$formData.maxLength} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="sex">
      <Form.Control let:attrs>
        <Form.Label>Sesso</Form.Label>
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
      <Form.FieldErrors />
    </Form.Field>
  </div>
  <div class="flex justify-end gap-1">
    <Form.Button>Cerca</Form.Button>

    <Button onclick={() => goto('/', { keepFocus: true })}>Reset</Button>
  </div>
</form>
