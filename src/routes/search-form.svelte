<script lang="ts">
  import { goto } from '$app/navigation';
  import { formSchema } from './schema';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { type Infer, type SuperValidated } from 'sveltekit-superforms';
  import Input from '$lib/components/ui/input.svelte';
    import Label from '$lib/components/ui/label.svelte';
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
    <Label for="contain">Contiene</Label>
    <Input
      name="contain"
      aria-invalid={$errors.contain ? 'true' : undefined}
      bind:value={$formData.contain}
    />
    {#if $errors.contain}<span class="invalid">{$errors.contain}</span>{/if}

    <Label for="notContain">Non contiene</Label>
    <Input
      name="notContain"
      aria-invalid={$errors.notContain ? 'true' : undefined}
      bind:value={$formData.notContain}
    />
    {#if $errors.notContain}<span class="invalid">{$errors.notContain}</span>{/if}

    <Label for="start">Inizia</Label>
    <Input
      name="start"
      aria-invalid={$errors.start ? 'true' : undefined}
      bind:value={$formData.start}
    />
    {#if $errors.start}<span class="invalid">{$errors.start}</span>{/if}

    <Label for="notStart">Non inizia</Label>
    <Input
      name="notStart"
      aria-invalid={$errors.notStart ? 'true' : undefined}
      bind:value={$formData.notStart}
    />
    {#if $errors.notStart}<span class="invalid">{$errors.notStart}</span>{/if}

    <Label for="end">Finisce</Label>
    <Input name="end" aria-invalid={$errors.end ? 'true' : undefined} bind:value={$formData.end} />
    {#if $errors.end}<span class="invalid">{$errors.end}</span>{/if}

    <Label for="notEnd">Non finisce</Label>
    <Input
      name="notEnd"
      aria-invalid={$errors.notEnd ? 'true' : undefined}
      bind:value={$formData.notEnd}
    />
    {#if $errors.notEnd}<span class="invalid">{$errors.notEnd}</span>{/if}

    <Label for="minLength">Lunghezza minima</Label>
    <Input
      name="minLength"
      type="number"
      aria-invalid={$errors.minLength ? 'true' : undefined}
      bind:value={$formData.minLength}
    />
    {#if $errors.minLength}<span class="invalid">{$errors.minLength}</span>{/if}

    <Label for="maxLength">Lunghezza massima</Label>
    <Input
      name="maxLength"
      type="number"
      aria-invalid={$errors.maxLength ? 'true' : undefined}
      bind:value={$formData.maxLength}
    />
    {#if $errors.maxLength}<span class="invalid">{$errors.maxLength}</span>{/if}

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
