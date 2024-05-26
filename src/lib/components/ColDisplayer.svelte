<script lang="ts">
  import { ScrollArea } from "@/components/ui/scroll-area/index.js";
  import TaskAdderMinimal from "./TaskAdderMinimal.svelte";
  import Task from "./Task.svelte";
  import stateManager from "@/stores/stateManager";

  export let taskAdderForm;
  export let taskEditorForm;
  export let taskDisplayerForm;
  export let category;
</script>

<div class="flex flex-col items-center space-y-5">
  <div class="flex justify-center">
    <h1 class="text-2xl font-bold text-gray-500 truncate w-[99.99%]">
      {category.categoryName}
    </h1>
  </div>
  <div class="w-[90%]">
    <ScrollArea
      class="h-[250px] dark:bg-dark_theme-front p-3 bg-white rounded-lg"
    >
      <div class="space-y-3 w-full h-full">
        {#each category.tasks as task}
          <div
            class="flex justify-center items-center dark:bg-dark_theme-back p-3 bg-slate-100 rounded-lg"
          >
            <Task {taskDisplayerForm} {taskEditorForm} {task}/>
          </div>
        {/each}
        <div class="flex justify-center items-center rounded-lg w-full">
          <TaskAdderMinimal {taskAdderForm} />
        </div>
      </div>
    </ScrollArea>
  </div>
</div>
