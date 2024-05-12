<script lang="ts">
  import DeleteTaskDialog from "./DeleteTaskDialog.svelte";
  import SubTask from "./SubTask.svelte";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { bgTaskCss } from "@/stores/bgPageCss";
  import Button from "./ui/button/button.svelte";
  import CercleProgressBar from "./CercleProgressBar.svelte";
  import ScrollArea from "./ui/scroll-area/scroll-area.svelte";
  import TaskEditMinimal from "./TaskEditMinimal.svelte";
  import * as Select from "$lib/components/ui/select/index.js";
  const numbers = Array.from({ length: 11 }, (_, i) => i);
</script>

<div class="w-full h-full">
  <Dialog.Root>
    <div class="flex justify-center items-center hover:text-purp_manager-def">
      <Dialog.Trigger class="w-full">
        <Button
          variant="taskCard"
          class="flex flex-col items-start max-w-[75%]"
        >
          <h2 class="truncate w-full">Task Title</h2>
        </Button>
      </Dialog.Trigger>
      <div class="ml-2">
        <CercleProgressBar progress={0.9}>
          <h1 slot="tasks" class="text-dark_theme-text font-bold text-[12px]">
            6/7
          </h1>
        </CercleProgressBar>
      </div>
    </div>
    <Dialog.Content class={$bgTaskCss}>
      <Dialog.Header>
        <Dialog.Title class="font-semibold text-[30px]">Task Title</Dialog.Title
        >
        <Dialog.Description>SubTasks:</Dialog.Description>
      </Dialog.Header>
      <ScrollArea
        class="w-full h-full bg-white rounded-lg p-2 dark:bg-dark_theme-front"
      >
        {#each numbers as number}
          <SubTask task={number} />
        {/each}
      </ScrollArea>
      <div></div>
      <div class="w-full">
        <Select.Root>
          <Select.Trigger
            class="dark:bg-dark_theme-back rounded-full focus:border-purp_manager-def bg-slate-100 border-gray-500"
          >
            <Select.Value placeholder="Current Status" />
          </Select.Trigger>
          <Select.Content
            class="dark:bg-dark_theme-back rounded-lg border-gray-500"
          >
            <Select.Group>
              <Select.Label>testing select</Select.Label>
              <Select.Item value="test1" label="test1">test 1</Select.Item>
              <Select.Item value="test2" label="test2">test 2</Select.Item>
              <Select.Item value="test3" label="test3">test 3</Select.Item>
              <Select.Item value="test4" label="test4">test 4</Select.Item>
            </Select.Group>
            <Select.Input name="test" />
            <div class="w-full h-2"></div>
          </Select.Content>
        </Select.Root>
      </div>
      <Dialog.Footer class="flex items-center justify-between">
        <Button
          variant="ghost"
          size="rounded"
          class="hover:text-purp_manager-def p-4 font-bold">
          Save
        </Button>
        <TaskEditMinimal />
        <DeleteTaskDialog />
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
</div>
