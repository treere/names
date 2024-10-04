<script lang="ts" module>
  type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import {
    formFieldProxy,
    type SuperForm,
    type FormPathLeaves,
    type FormFieldProxy
  } from 'sveltekit-superforms';
  import Label from './label.svelte';
  import InputCheckbox from './input-checkbox.svelte';

  let {
    superform,
    field,
    label,
    ...rest
  }: {
    label: string;
    superform: SuperForm<T>;
    field: FormPathLeaves<T, boolean>;
  } & HTMLInputAttributes = $props();

  const { value, errors, constraints } = formFieldProxy(
    superform,
    field
  ) satisfies FormFieldProxy<boolean>;
</script>

<Label>
  {label}
  <InputCheckbox
    class="mt-2"
    name={field}
    aria-invalid={$errors ? 'true' : undefined}
    bind:checked={$value}
    {...$constraints}
    {...rest}
  />
</Label>

{#if $errors}<span class="invalid">{$errors}</span>{/if}
