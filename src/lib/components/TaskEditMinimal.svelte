<script lang="ts">
  import Button from "@/components/ui/button/button.svelte";
  import Input from "@/components/ui/input/input.svelte";
  import Label from "@/components/ui/label/label.svelte";
  import * as Dialog from "@/components/ui/dialog/index";
  import { bgDialogCss } from "@/stores/bgPageCss";
  import Textarea from "@/components/ui/textarea/textarea.svelte";
  import { Edit, X } from "lucide-svelte";
  import { superForm } from "sveltekit-superforms";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import ScrollArea from "./ui/scroll-area/scroll-area.svelte";
  import stateManager from "@/stores/stateManager";

  export let taskEditorForm;
  export let task: any;

  const { form, enhance, message } = superForm(taskEditorForm, {
    dataType: "json",
  });

  $: if ($message) {

    if ($message.upTask) {
      stateManager.updateTaskNameAndDesc($message.upTask[0])
    }

    if ($message.nwSub) {
      for (const sub of $message.nwSub) {
        stateManager.addSubTask(sub)
      }
    }

    if ($message.upSub) {
      for (const sub of $message.upSub) {
        stateManager.updateSubTask(sub)
      }
    }

    if ($message.dlSubIds) {
      stateManager.deleteSubTask($message.dlSubIds)
    }
  }

  function handleInputRemover(index: number) {
    if ($form.edit_subtasks.length > 1) {
      $form.edit_subtasks = $form.edit_subtasks.filter(
        (_: string, i: number) => i !== index
      );
      $form.subTaskIds = $form.subTaskIds.filter((id: number, i: number) => {
        if (i === index) {
          if (id !== 0) {
            $form.deletedSubs.push(id);
          }
          return false;
        }
        return true;
      });
    }
  }

  function handleInputAdder() {
    $form.edit_subtasks = [...$form.edit_subtasks, ""];
    $form.edit_subtasks = $form.edit_subtasks;

    $form.subTaskIds = [...$form.subTaskIds, 0];
    $form.subTaskIds = $form.subTaskIds;
  }

  function handleReset() {
    $form.taskId = task.id
    $form.edit_tname = task.name;
    $form.edit_description = task.description;
    task.subtasks.forEach((sub: any) => {
      $form.edit_subtasks.push(sub.name);
    });

    task.subtasks.forEach((sub: any) => {
      $form.subTaskIds.push(sub.id);
    });
  }

  $: isSubtaskEmpty = () => {
    for (const [key, value] of Object.entries($form.edit_subtasks)) {
      if (!value) {
        return false;
      }
    }
    return true;
  };
  $: enab =
    ($form.edit_tname && $form.edit_subtasks.length == 0) ||
    ($form.edit_tname && isSubtaskEmpty())
      ? false
      : true;
</script>

<Dialog.Root>
  <Dialog.Trigger>
    <Button
      size="rounded"
      variant="minimalAdd"
      class="w-full h-full"
      on:click={handleReset}
    >
      <div
        class="px-4 font-bold text-3xl text-gray-400 dark:hover:text-purp_manager-def hover:text-purp_manager-def"
      >
        <Edit />
      </div>
    </Button>
  </Dialog.Trigger>
  <Dialog.Content class={$bgDialogCss}>
    <form
      action="?/editTask"
      method="POST"
      use:enhance
      class="w-full h-full space-y-2"
    >
      <Dialog.Header>Edit Task</Dialog.Header>

      <div class="space-y-5">
        <div class="space-y-2">
          <Label class="pr-3">Task Name</Label>
          <Tooltip.Root>
            <Tooltip.Trigger>
              <span class="text-purp_manager-def font-bold text-lg">*</span>
            </Tooltip.Trigger>
            <Tooltip.Content class="bg-slate-100 dark:bg-dark_theme-back">
              <p>Task name can't be empty</p>
            </Tooltip.Content>
          </Tooltip.Root>
          <Input placeholder="e.g. drink water" bind:value={$form.edit_tname} />
        </div>
        <div class="space-y-2">
          <Label>Description</Label>
          <Textarea
            placeholder="e.g. Be like water my friend"
            class="w-full focus:border-purp_manager-def border-gray-500"
            bind:value={$form.edit_description}
          />
        </div>
        <div class="space-y-2">
          <Label class="mr-3">Subtasks</Label>
          {#if $form.edit_subtasks.length != 0}
            <Tooltip.Root>
              <Tooltip.Trigger>
                <span class="text-purp_manager-def font-bold text-lg">*</span>
              </Tooltip.Trigger>
              <Tooltip.Content class="bg-slate-100 dark:bg-dark_theme-back">
                <p>Subtask can't be empty</p>
              </Tooltip.Content>
            </Tooltip.Root>
          {/if}
          <ScrollArea class="w-full h-[100px]">
            {#each $form.edit_subtasks as input, index}
              <div class="flex justify-center items-center gap-1">
                <Input bind:value={input} name={`input-${index}`} />
                <Button
                  variant="ghost"
                  on:click={() => handleInputRemover(index)}
                >
                  <X class="text-gray-500" />
                </Button>
              </div>
            {/each}
          </ScrollArea>
          <Button
            variant="side_bar_active"
            size="rounded"
            class="w-full p-3"
            on:click={handleInputAdder}
          >
            New Subtask
          </Button>
        </div>
      </div>
      <div></div>
      <Dialog.Footer>
        <Dialog.Close class="w-full" disabled={enab}>
          <Button
            type="submit"
            variant="active"
            size="rounded"
            class="w-full p-3"
            disabled={enab}
          >
            Update Task
          </Button>
        </Dialog.Close>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
