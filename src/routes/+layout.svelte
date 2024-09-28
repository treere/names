<script lang="ts">
  import '../app.css';
  import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />
<div class="mx-auto max-w-screen-lg">
  <slot />
</div>
