<script lang="ts">
	import NewColumn from '@/components/BoardEdit.svelte';
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  import StickyHeader from "@/components/StickyHeader.svelte";
  import SideBar from "@/components/SideBar.svelte";
  import showSide from "$assets/icon-show-sidebar.svg";
  import Button from "@/components/ui/button/button.svelte";
  import { sideBarStatus } from "@/stores/SideBarStatus";

</script>

<ModeWatcher />
<div class="sticky z-50 top-0">
  <StickyHeader />
</div>
<div class="flex">
  {#if $sideBarStatus}
    <div class="w-1/5">
      <SideBar />
    </div>
  {:else}
    <div class="fixed bottom-10">
      <Button
        variant="active"
        size="sidebar"
        on:click={() => sideBarStatus.set(!$sideBarStatus)}
      >
        <img src={showSide} alt="eye" class="p-5" />
      </Button>
    </div>
  {/if}
  <div class="flex-grow">
    <slot></slot>
  </div>
</div>
<div class="z-[69] fixed right-5 bottom-5">
  <NewColumn/>
</div>
