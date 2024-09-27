<script lang="ts">
  import LightDark from '$lib/components/LightDark.svelte';
  import { type Infer, type SuperValidated } from 'sveltekit-superforms';
  import type { FormSchema } from './schema';
  import SearchForm from './search-form.svelte';
  import type { Name } from '$lib/names';

  let { data }: { data: { form: SuperValidated<Infer<FormSchema>>; namesList: Name[] } } = $props();
</script>

<div class="flex justify-end px-5 py-3">
  <LightDark />
</div>

<div class="flex justify-center py-2">
  <h1 class="text-2xl">Find the name</h1>
</div>

<SearchForm data={data.form} />

<div class="grid grid-cols-5 gap-1 px-10 py-3">
  {#each data.namesList as name}
    <div>{name.name}</div>
  {/each}
</div>
