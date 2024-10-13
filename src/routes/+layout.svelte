<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';
  import LightDark from '$lib/components/LightDark.svelte';
  import { ModeWatcher } from 'mode-watcher';

  let { children } = $props();
</script>

<ModeWatcher />

<div class="mb-5 flex items-center gap-5 border-b px-5 py-3">
  <a href={`${base}/`}>Home</a>
  <a href={`${base}/about`}>About</a>
  <div class="ml-auto">
    <LightDark />
  </div>
</div>

<div class="mx-auto max-w-screen-lg px-2">
  {@render children()}
</div>
