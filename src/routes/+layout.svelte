<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';
  import LightDark from '$lib/components/LightDark.svelte';
  import { ModeWatcher } from 'mode-watcher';

  let { children } = $props();
</script>

<ModeWatcher />

<div class="min-h-screen bg-background">
  <header class="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
    <div class="mx-auto max-w-screen-lg px-4 py-3 flex items-center gap-6">
      <a href={`${base}/`} class="text-xl font-semibold hover:text-primary/80 transition-colors">
        Trova il nome
      </a>
      <nav class="flex items-center gap-4 text-sm">
        <a href={`${base}/`} class="hover:text-primary transition-colors">Home</a>
        <a href={`${base}/about`} class="hover:text-primary transition-colors">About</a>
      </nav>
      <div class="ml-auto">
        <LightDark />
      </div>
    </div>
  </header>

  <main class="mx-auto max-w-screen-lg px-4 py-6">
    {@render children()}
  </main>
</div>
