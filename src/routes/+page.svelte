<script lang="ts">
  import { page } from '$app/stores';
  import { base } from '$app/paths';

  import { filteredNamesList } from '$lib/names';
  import { superValidate } from 'sveltekit-superforms';
  import { zod } from 'sveltekit-superforms/adapters';

  import SearchForm from './search-form.svelte';
  import { formSchema } from '$lib/schema';

  const form = $derived(superValidate($page.url, zod(formSchema)));

  const namesList = $derived(form.then((f) => filteredNamesList(f.data)));
</script>

<div class="space-y-8">
  <div class="text-center py-4">
    <h1 class="text-3xl font-bold tracking-tight">Trova il nome</h1>
    <p class="text-muted-foreground mt-2">Cerca e filtra i nomi italiani</p>
  </div>

  {#await form}
    <div class="flex justify-center py-8">
      <p class="text-muted-foreground">Caricamento filtri...</p>
    </div>
  {:then form}
    <SearchForm data={form} />
  {:catch error}
    <p class="text-destructive">{error.message}</p>
  {/await}

  {#await namesList}
    <div class="flex justify-center py-8">
      <p class="text-muted-foreground">Caricamento nomi...</p>
    </div>
  {:then namesList}
    <div class="space-y-4">
      <div class="flex items-center justify-between text-sm text-muted-foreground">
        <span>Trovati {namesList.length} nomi</span>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {#each namesList as name}
          <a
            href={`${base}/${name.gender}/${name.name.toLowerCase()}`}
            class="flex items-center justify-center px-3 py-2 rounded-lg bg-card border hover:bg-accent hover:border-primary/50 transition-all text-sm font-medium text-center"
          >
            {name.name}
          </a>
        {/each}
      </div>
    </div>
  {:catch error}
    <p class="text-destructive">{error.message}</p>
  {/await}
</div>
