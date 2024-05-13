<script lang="ts">
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  import StickyHeader from "@/components/StickyHeader.svelte";
</script>

<ModeWatcher />
<div class="sticky z-50 top-0">
  <StickyHeader />
</div>

<slot></slot>
