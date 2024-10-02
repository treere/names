<script lang="ts">
  import { Toggle as TogglePrimitive } from 'bits-ui';
  import { type Size, type Variant, toggleVariants } from './index.js';
  import { cn } from '$lib/utils.js';
  import type { Snippet } from 'svelte';

  type $$Props = TogglePrimitive.Props & {
    variant?: Variant;
    size?: Size;
    children: Snippet;
  };

  let {
    class: className,
    variant = 'default',
    size = 'default',
    pressed,
    children,
    ...rest
  }: $$Props = $props();
</script>

<TogglePrimitive.Root
  bind:pressed
  class={cn(toggleVariants({ variant, size, className }))}
  {...rest}
  on:click
>
  {@render children()}
</TogglePrimitive.Root>
