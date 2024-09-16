<script lang="ts">
  import LightDark from '$lib/components/LightDark.svelte';
  import { Button } from '$lib/components/ui/button/index.js';
  import SearchForm from './search-form.svelte';
  export let data: PageData;
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
