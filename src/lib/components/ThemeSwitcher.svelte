<script lang="ts">
  import { toggleMode } from "mode-watcher";
  import Switch from "./ui/switch/switch.svelte";
  import Sun from "$assets/icon-light-theme.svg";
  import Moon from "$assets/icon-dark-theme.svg";
</script>

<div class="flex space-x-3">
  <img src={Sun} alt="light theme" class="w-5 h-5" />
      <Switch on:click={toggleMode} />
      <img src={Moon} alt="dark theme" class="w-5 h-5" />
</div>
