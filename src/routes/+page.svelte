<script lang="ts">
  import LightDark from '$lib/components/LightDark.svelte';
  import { type Infer, type SuperValidated } from 'sveltekit-superforms';
  import type { FormSchema } from './schema';
  import SearchForm from './search-form.svelte';
  import type { Name } from '$lib/names';

  let { data }: { data: { form: SuperValidated<Infer<FormSchema>>; namesList: Name[] } } = $props();
</script>

<div class="flex justify-end bg-red-700 px-5 py-3">
  <LightDark />
</div>

<div class="flex justify-center bg-red-100 py-2">
  <h1 class="text-2xl">Find the name</h1>
</div>

<SearchForm data={data.form} />

<div class="flex flex-wrap gap-1 bg-red-500 px-10 py-3">
  {#each data.namesList as name}
    <div>{name.name}</div>
  {/each}
</div>
