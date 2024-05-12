<script lang="ts">
	import ColDisplayer from '@/components/ColDisplayer.svelte';
  import { bgPageCss } from "@/stores/bgPageCss";
  // export let data;
</script>

<main class="{$bgPageCss} grid grid-cols-3 gap-4  h-auto p-5">
  <ColDisplayer/>
  <ColDisplayer/>
  <ColDisplayer/>
  <ColDisplayer/>
  <ColDisplayer/>
  <ColDisplayer/>
  <ColDisplayer/>
  <ColDisplayer/>
  <ColDisplayer/>
  <ColDisplayer/>
</main>
