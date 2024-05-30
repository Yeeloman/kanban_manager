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
  import stateManager from "@/stores/stateManager";

  export let taskDisplayerForm;
  export let taskEditorForm;
  export let task;
  export let boardId;

  const { form, enhance, message } = superForm(taskDisplayerForm, {
    dataType: "json",
    warnings: {
      duplicateId: false,
    },
  });

  $form.taskId = task.id
  const statss = ["TODO", "DOING", "DONE"];

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
  //@ts-ignore
  let crnt_status = STATUS[task.status]


  const changeStatus = (stat: { name: string; color: string }) => {
    crnt_status = stat;
    $form.status = stat.name
  };

  $: if ($message) {
    stateManager.updateTask($message[0].id, $message[0].categoryId, $message[0].status)
  }


let progress = 0;

$: progress = calculateProgress(task.subtasks);

function calculateProgress(subtasks: SubTask[]) {
    const total = subtasks.length;
    const completed = subtasks.filter(subtask => subtask.done).length;
    return total === 0 ? 0 : (completed / total) * 100;
}

</script>
<div class="w-full h-full">
  <Dialog.Root>
    <div class="flex justify-center items-center hover:text-purp_manager-def ">
      <Dialog.Trigger class="w-full">
        <Button
          variant="taskCard"
          class="flex flex-col items-start max-w-[75%]"
        >
          <h2 class="truncate w-full">{task.name}</h2>
        </Button>
      </Dialog.Trigger>
      <div class="w-1/4">
        <CercleProgressBar progress={progress/100}>
          <h1 slot="tasks" class="text-dark_theme-text font-bold text-[10px]">
            {progress.toFixed(0)}%
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
            {task.name}
            <Popover.Root>
              <Popover.Trigger>
                {#each statss as status}
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
                    on:click={() => changeStatus(STATUS.TODO)}
                  >
                    <div class="w-5 h-5 {STATUS.TODO.color}"></div>
                    <p>TODO</p>
                  </Button>
                  <Button
                    variant="ghost"
                    class="flex justify-between w-28"
                    on:click={() => changeStatus(STATUS.DOING)}
                  >
                    <div class="w-5 h-5 {STATUS.DOING.color}"></div>
                    <p>DOING</p>
                  </Button>
                  <Button
                    variant="ghost"
                    class="flex justify-between w-28"
                    on:click={() => changeStatus(STATUS.DONE)}
                  >
                    <div class="w-5 h-5 {STATUS.DONE.color}"></div>
                    <p>DONE</p>
                  </Button>
                </Popover.Close>
              </Popover.Content>
            </Popover.Root>
          </Dialog.Title>
          <Dialog.Description>{task.description}</Dialog.Description>
        </Dialog.Header>
        <ScrollArea
          class="w-full h-[50%] bg-white rounded-lg p-2 dark:bg-dark_theme-front"
        >
          {#each task.subtasks as subTask}
            <SubTask {subTask} formSub={$form.subtasks}/>
          {/each}
        </ScrollArea>
        <div class="h-1"></div>
        <div class="w-full">
          <Select.Root
            onSelectedChange={(v) => {
              $form.categoryId = v?.value;
            }}
          >
            <Select.Trigger
              class="dark:bg-dark_theme-back rounded-full focus:border-purp_manager-def bg-slate-100 border-gray-500"
            >
              <Select.Value placeholder="Categories" />
            </Select.Trigger>
            <Select.Content
              class="dark:bg-dark_theme-back rounded-lg border-gray-500"
            >
              <Select.Group>
                <Select.Label>Categories</Select.Label>
                {#each $stateManager as board}
                  {#if board.id === boardId}
                    {#each board.category as cat}
                      <Select.Item bind:value={cat.id}>
                        {cat.categoryName}
                      </Select.Item>
                    {/each}
                  {/if}
                {/each}
              </Select.Group>
              <Select.Input hidden bind:value={$form.categoryId} />
              <div class="w-full h-2"></div>
            </Select.Content>
          </Select.Root>
        </div>
        <Dialog.Footer class="flex items-center justify-between">
          <Dialog.Close disabled={$form.categoryId ? false : true}>
            <Button
              type="submit"
              variant="ghost"
              size="rounded"
              class="hover:text-purp_manager-def p-4 font-bold"
              disabled={$form.categoryId ? false : true}
            >
              Save
            </Button>
          </Dialog.Close>
          <TaskEditMinimal {taskEditorForm} {task} />
          <DeleteTaskDialog />
        </Dialog.Footer>
      </form>
    </Dialog.Content>
  </Dialog.Root>
</div>
