<script lang="ts">
  import ColDisplayer from "@/components/ColDisplayer.svelte";
  import SideBar from "@/components/SideBar.svelte";
  import BoardEdit from "@/components/BoardEdit.svelte";
  import { bgPageCss } from "@/stores/bgPageCss";
  import { sideBarStatus } from "@/stores/Status";
  import showSide from "$assets/icon-show-sidebar.svg";
  import Button from "@/components/ui/button/button.svelte";
  import stateManager from "@/stores/stateManager.js";
  import { onMount, setContext } from "svelte";

  export let data;
  const {
    boardAdderForm,
    boardEditorForm,
    taskAdderForm,
    taskEditorForm,
    taskDisplayerForm,
  } = data.forms;

  const { allBoards } = data;


  onMount(() => stateManager.set(allBoards));

</script>

<div class="flex">
  {#if $sideBarStatus}
    <div class="w-1/5">
      <SideBar {boardAdderForm} />
    </div>
  {:else}
    <div class="fixed bottom-10 z-[420]">
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
    <main class="{$bgPageCss} grid grid-cols-3 gap-4 h-fit min-h-screen p-5">
      {#each $stateManager as board}
        {#if board.active}
          {#each board.category as item}
            <ColDisplayer
              {taskAdderForm}
              {taskEditorForm}
              {taskDisplayerForm}
              boardId={board.id}
              category={item}
            />
          {/each}
        {/if}
      {/each}
    </main>
  </div>
</div>

<form class="z-[69] fixed right-5 bottom-5">
  <BoardEdit {boardEditorForm} />
</form>
