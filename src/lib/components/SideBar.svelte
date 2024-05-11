<script lang="ts">
  import Button from "./ui/button/button.svelte";
  import { PanelsTopLeft } from "lucide-svelte";
  import hideSide from "$assets/icon-hide-sidebar.svg";
  import { sideBarStatus } from "@/stores/SideBarStatus";


</script>

{#if $sideBarStatus}
  <div
    class="bg-white dark:bg-dark_theme-front w-1/5 h-full fixed inset-t-10 left-0 flex flex-col justify-between"
  >
    <div>
      <div class="text-gray-500 font-semilight p-5">All Boards (3)</div>
      <!-- TODO create an loop that creates each button -->
      <Button variant="side_bar_active" size="sidebar" class="py-3  w-[90%]">
        <PanelsTopLeft class="text-gray-400" />
        <p class="ml-3">Platform Launcher</p>
      </Button>

      <!-- * Button that creates a new board-->
      <Button
        variant="side_bar_inactive"
        size="sidebar"
        class="py-3  w-[90%] text-purp_manager-def"
      >
        <PanelsTopLeft class="text-purp_manager-def" />
        <p class="ml-3">+Create New Board</p>
      </Button>
    </div>
    <div></div>
    <div></div>
    <div></div>
    <div>
      <Button
        variant="side_bar_inactive"
        size="sidebar"
        class="py-3  w-[90%] text-purp_manager-def"
        on:click={() => sideBarStatus.set(!$sideBarStatus)}
      >
        <img src={hideSide} alt="eye off" />
        Hide Sidebar
      </Button>
    </div>
    <div></div>
  </div>
{/if}
