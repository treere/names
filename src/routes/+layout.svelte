<script lang="ts">
  import '../app.css';
  import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />
<div class="max-w-screen-lg mx-auto">
  <slot />
</div>
