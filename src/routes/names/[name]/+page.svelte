<script lang="ts">
  import { page } from '$app/state';
  
  const { gender, name } = page.params;
</script>

<h1 class="text-2xl capitalize">{name} {gender}</h1>
