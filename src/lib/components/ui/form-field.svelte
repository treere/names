<script lang="ts" module>
  type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { formFieldProxy, type SuperForm, type FormPathLeaves } from 'sveltekit-superforms';
  import Label from './label.svelte';
  import Input from './input.svelte';

  let {
    superform,
    field,
    label,
    ...rest
  }: { label: string, superform: SuperForm<T>; field: FormPathLeaves<T> } & HTMLInputAttributes = $props();

  const { value, errors, constraints } = formFieldProxy(superform, field);
</script>

<Label>
  {label}
  <Input
    class="mt-2"
    name={field}
    type="text"
    aria-invalid={$errors ? 'true' : undefined}
    bind:value={$value}
    {...$constraints}
    {...rest}
    />
</Label>

{#if $errors}<span class="invalid">{$errors}</span>{/if}
