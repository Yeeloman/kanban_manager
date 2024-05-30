<script lang="ts">
  // @ts-nocheck
  import BoardAdder from "./BoardAdder.svelte";
  import Button from "./ui/button/button.svelte";
  import { PanelsTopLeft } from "lucide-svelte";
  import hideSide from "$assets/icon-hide-sidebar.svg";
  import { sideBarStatus } from "@/stores/Status";
  import stateManager from "@/stores/stateManager";
  import { enhance } from '$app/forms';
  import { crntBoard } from '@/stores/boardsStore';

  export let boardAdderForm;

  function addBoard(event) {
    stateManager.addBoard(event.detail);
  }
</script>

{#if $sideBarStatus}
  <div
    class="bg-white dark:bg-dark_theme-front w-1/5 h-full fixed inset-t-10 left-0 flex flex-col justify-between"
  >
    <div>
      <div class="text-gray-500 font-semilight p-5">
        All Boards ({$stateManager.length})
      </div>
      {#each $stateManager as board}
        <form
          action="?/activateBoard"
          method="POST"
          class="w-full"
          on:submit|preventDefault={()=>{
            stateManager.updateActiveStatus(board.id)
            $crntBoard = stateManager.getActiveBoard()
            }}
          use:enhance
        >
          <input type="hidden" name="board" value={JSON.stringify(board)} />

          <Button
            variant={board.active ? "side_bar_active" : "side_bar_inactive"}
            size="sidebar"
            class="py-3  w-[90%] flex justify-between"
            type="submit"
            on:click={() => ($crntBoard = board)}
          >
            <PanelsTopLeft class="text-gray-400 ml-9" />

            <p
              class="truncate w-[50%]"
            >
              {board.boardName}
            </p>
            <div></div>
          </Button>
        </form>
      {/each}
      <!-- * Button that creates a new board-->
      <BoardAdder on:boardAdded={addBoard} {boardAdderForm} />
    </div>
    <div></div>
    <div></div>
    <div></div>
    <div class="fixed bottom-3 w-1/5">
      <Button
        variant="side_bar_inactive"
        size="sidebar"
        class="py-3  w-[90%] text-purp_manager-def"
        on:click={() => sideBarStatus.set(!$sideBarStatus)}
      >
        <img src={hideSide} alt="eye off" class="mr-5" />
        Hide Sidebar
      </Button>
    </div>
    <div></div>
  </div>
{/if}
