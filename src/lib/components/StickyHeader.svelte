<script lang="ts">
	import TaskAdder from './TaskAdder.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
  import logolight from "$assets/logo-light.svg";
  import logodark from "$assets/logo-dark.svg";
  import { mode } from "mode-watcher";
  import Button from "@/components/ui/button/button.svelte";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { EllipsisVertical } from "lucide-svelte";
</script>

<header class="bg-white dark:bg-dark_theme-front w-full py-4">
  <div class="flex">
    <div class="relative flex items-center p-2 w-1/5 ml-5">
      <img src={$mode === "dark" ? logodark : logolight} alt="logo" />
      <p class="font-bold text-3xl absolute left-[47px]">kanban</p>
    </div>
    <div class="p-2 flex-grow">
      <p class="text-2xl font-semibold">Platform Launch</p>
    </div>
    <div class="flex items-center space-x-4">
      <div>
        <TaskAdder/>
      </div>
      <ThemeSwitcher/>
    </div>
  </div>
</header>
