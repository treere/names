<script lang="ts">
  import { goto } from '$app/navigation';
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

  const { form: formData, enhance, validateForm, errors } = form;
  validateForm({ update: true });
</script>

<form method="POST" use:enhance>
  <div class="flex flex-wrap place-items-center gap-1">
    <label for="contain">Contiene</label>
    <input
      name="contain"
      aria-invalid={$errors.contain ? 'true' : undefined}
      bind:value={$formData.contain}
    />
    {#if $errors.contain}<span class="invalid">{$errors.contain}</span>{/if}

    <label for="notContain">Non contiene</label>
    <input
      name="notContain"
      aria-invalid={$errors.notContain ? 'true' : undefined}
      bind:value={$formData.notContain}
    />
    {#if $errors.notContain}<span class="invalid">{$errors.notContain}</span>{/if}

    <label for="start">Inizia</label>
    <input
      name="start"
      aria-invalid={$errors.start ? 'true' : undefined}
      bind:value={$formData.start}
    />
    {#if $errors.start}<span class="invalid">{$errors.start}</span>{/if}

    <label for="notStart">Non inizia</label>
    <input
      name="notStart"
      aria-invalid={$errors.notStart ? 'true' : undefined}
      bind:value={$formData.notStart}
    />
    {#if $errors.notStart}<span class="invalid">{$errors.notStart}</span>{/if}

    <label for="end">Finisce</label>
    <input name="end" aria-invalid={$errors.end ? 'true' : undefined} bind:value={$formData.end} />
    {#if $errors.end}<span class="invalid">{$errors.end}</span>{/if}

    <label for="notEnd">Non finisce</label>
    <input
      name="notEnd"
      aria-invalid={$errors.notEnd ? 'true' : undefined}
      bind:value={$formData.notEnd}
    />
    {#if $errors.notEnd}<span class="invalid">{$errors.notEnd}</span>{/if}

    <label for="minLength">Lunghezza minima</label>
    <input
      name="minLength"
      type="number"
      aria-invalid={$errors.minLength ? 'true' : undefined}
      bind:value={$formData.minLength}
    />
    {#if $errors.minLength}<span class="invalid">{$errors.minLength}</span>{/if}

    <label for="maxLength">Lunghezza massima</label>
    <input
      name="maxLength"
      type="number"
      aria-invalid={$errors.maxLength ? 'true' : undefined}
      bind:value={$formData.maxLength}
    />
    {#if $errors.maxLength}<span class="invalid">{$errors.maxLength}</span>{/if}

    <label for="sex">Sesso</label>
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
