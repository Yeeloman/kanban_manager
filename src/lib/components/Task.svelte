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
  import { superForm } from "sveltekit-superforms";
  import * as Popover from "$lib/components/ui/popover";

  export let taskDisplayerForm;
  export let taskEditorForm;

  const { form, enhance } = superForm(taskDisplayerForm, {
    dataType: "json",
  });

  const statss = ["todo", "doing", "done"];
  $form.subtasks = [true];

const STATUS = {
  TODO: {
    name: "TODO",
    color: "bg-red-500",
  },
  DOING: {
    name: "DOING",
    color: "bg-orange-500",
  },
  DONE: {
    name: "DONE",
    color: "bg-green-500",
  },
};
  let crnt_status = STATUS.TODO;

  const changeStatus = (stat: {name: string, color: string}) => {
    crnt_status = stat
  }
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
          <h1 slot="tasks" class="text-dark_theme-text font-bold text-[10px]">
            90%
          </h1>
        </CercleProgressBar>
      </div>
    </div>
    <Dialog.Content class={$bgTaskCss}>
      <form
        action="?/displayTask"
        method="POST"
        class="w-full h-full space-y-2"
        use:enhance
      >
        <Dialog.Header>
          <Dialog.Title class="font-semibold text-[30px] flex justify-between">
            Task Title
            <Popover.Root>
              <Popover.Trigger>
                {#each $form.status as status}
                  {#if status == crnt_status.name}
                    <div class="w-5 h-5 {crnt_status.color}"></div>
                  {/if}
                {/each}
              </Popover.Trigger>
              <Popover.Content
                class="flex flex-col text-sm w-36 dark:bg-dark_theme-back"
              >
                <Popover.Close>
                  <Button
                    variant="ghost"
                    class="flex justify-between w-28"
                    on:click={()=>changeStatus(STATUS.TODO)}
                  >
                    <div class="w-5 h-5 bg-red-500"></div>
                    <p>TODO</p>
                  </Button>
                  <Button variant="ghost" class="flex justify-between w-28"
                    on:click={()=>changeStatus(STATUS.DOING)}
                  >
                    <div class="w-5 h-5 bg-orange-500"></div>
                    <p>DOING</p>
                  </Button>
                  <Button variant="ghost" class="flex justify-between w-28"
                    on:click={()=>changeStatus(STATUS.DONE)}
                  >
                    <div class="w-5 h-5 bg-green-500"></div>
                    <p>DONE</p>
                  </Button>
                </Popover.Close>
              </Popover.Content>
            </Popover.Root>
          </Dialog.Title>
          <Dialog.Description>SubTasks:</Dialog.Description>
        </Dialog.Header>
        <ScrollArea
          class="w-full h-[50%] bg-white rounded-lg p-2 dark:bg-dark_theme-front"
        >
          {#each $form.subtasks as subT}
            <SubTask {subT} />
          {/each}
        </ScrollArea>
        <div class="h-1"></div>
        <div class="w-full">
          <Select.Root
            onSelectedChange={(v) => {
              $form.crnt_status = v?.value;
            }}
          >
            <Select.Trigger
              class="dark:bg-dark_theme-back rounded-full focus:border-purp_manager-def bg-slate-100 border-gray-500"
            >
              <Select.Value placeholder="Current Category" />
            </Select.Trigger>
            <Select.Content
              class="dark:bg-dark_theme-back rounded-lg border-gray-500"
            >
              <Select.Group>
                <Select.Label>Categories</Select.Label>
                {#each statss as stat}
                  <Select.Item bind:value={stat}>{stat}</Select.Item>
                {/each}
              </Select.Group>
              <Select.Input hidden bind:value={$form.crnt_status} />
              <div class="w-full h-2"></div>
            </Select.Content>
          </Select.Root>
        </div>
        <Dialog.Footer class="flex items-center justify-between">
          <Dialog.Close disabled={$form.crnt_status ? false : true}>
            <Button
              type="submit"
              variant="ghost"
              size="rounded"
              class="hover:text-purp_manager-def p-4 font-bold"
              disabled={$form.crnt_status ? false : true}
            >
              Save
            </Button>
          </Dialog.Close>
          <TaskEditMinimal {taskEditorForm} />
          <DeleteTaskDialog />
        </Dialog.Footer>
      </form>
    </Dialog.Content>
  </Dialog.Root>
</div>
