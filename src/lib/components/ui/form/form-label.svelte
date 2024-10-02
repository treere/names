<script lang="ts">
  import type { Label as LabelPrimitive } from 'bits-ui';
  import { getFormControl } from 'formsnap';
  import { cn } from '$lib/utils.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import type { Snippet } from 'svelte';

  let {
    class: className,
    children,
    ...rest
  }: { children: Snippet } & LabelPrimitive.Props = $props();

  const { labelAttrs } = getFormControl();
</script>

<Label {...$labelAttrs} class={cn('data-[fs-error]:text-destructive', className)} {...rest}>
  {@render children()}
</Label>
