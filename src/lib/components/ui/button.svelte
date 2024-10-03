<script lang="ts">
  import { cn } from '$lib/utils';
  import { buttonVariants, type ButtonProps } from './button';

  let {
    variant = 'default',
    size = 'default',
    children,
    class: className,
    ...rest
  }: ButtonProps = $props();
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<button type="button" class={cn(buttonVariants({ variant, size, className }))} {...rest}>
  {@render children()}
</button>
