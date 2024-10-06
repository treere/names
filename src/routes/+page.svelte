<script lang="ts">
  import { page } from '$app/stores';
  import LightDark from '$lib/components/LightDark.svelte';
  import { filteredNamesList } from '$lib/names';
  import { superValidate } from 'sveltekit-superforms';
  import { zod } from 'sveltekit-superforms/adapters';

  import SearchForm from './search-form.svelte';
  import { formSchema } from '$lib/schema';

  const form = $derived(superValidate($page.url, zod(formSchema)));

  const namesList = $derived(form.then((f) => filteredNamesList(f.data)));
</script>

<div class="flex justify-end px-5 py-3">
  <LightDark />
</div>

<div class="flex justify-center py-2">
  <h1 class="text-2xl">Trova il nome</h1>
</div>

{#await form}
  <p>...Caricamento filtri</p>
{:then form}
  <SearchForm data={form} />
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

{#await namesList}
  <p>...Caricamento nomi</p>
{:then namesList}
  <p>Totale nomi filtrati: {namesList.length}</p>
  <div class="flex flex-wrap gap-1 px-10 py-3">
    {#each namesList as name}
      <div>{name.name}</div>
    {/each}
  </div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
