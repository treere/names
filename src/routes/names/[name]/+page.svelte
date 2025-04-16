<script lang="ts">
  import { page } from '$app/state';
  const { name } = page.params;
</script>

<h1 class="text-2xl capitalize">{name}</h1>