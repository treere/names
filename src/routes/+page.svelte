<script lang="ts">
  import LightDark from '$lib/components/LightDark.svelte';
  import { type Infer, type SuperValidated } from 'sveltekit-superforms';
  import type { FormSchema } from './schema';
  import SearchForm from './search-form.svelte';

  let { data }: { data: { form: SuperValidated<Infer<FormSchema>>; names: string[] } } = $props();
</script>

<div class="flex justify-end bg-red-700 px-5 py-3">
  <LightDark />
</div>

<div class="flex justify-center bg-red-100 py-2">
  <h1 class="text-2xl">Find the name</h1>
</div>

<div class="flex items-center justify-between bg-red-300 px-10 py-3">
  <SearchForm data={data.form} />
</div>

<div class="flex items-center justify-between bg-red-500 px-10 py-3">
  <ul>
    {#each data.names as name}
      <li>{name}</li>
    {/each}
  </ul>
</div>
