<script lang="ts" module>
  import type { FormPath, SuperForm } from 'sveltekit-superforms';
  type T = Record<string, unknown>;
  type U = FormPath<T>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>, U extends FormPath<T>">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import Input from './input.svelte';
  import Label from './label.svelte';
  type Props = HTMLInputAttributes & { formData: SuperForm<T>; label: string; name: U };

  let { formData, name, label, ...rest }: Props = $props();
  let { form, errors } = formData;
</script>

<div>
  <Label for={name}>{label}</Label>
  <Input
    {name}
    aria-invalid={$errors[name] ? 'true' : undefined}
    bind:value={$form[name]}
    {...rest}
  />
  {#if $errors[name]}<span class="invalid">{$errors[name]}</span>{/if}
</div>
