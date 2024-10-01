<script lang="ts">
  import '../app.css';
  import { ModeWatcher } from 'mode-watcher';

  let { children } = $props();
</script>

<ModeWatcher />
<div class="mx-auto max-w-screen-lg">
  {@render children()}
</div>
