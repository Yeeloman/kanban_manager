<script lang="ts">
  import Button from "@/components/ui/button/button.svelte";
  import Input from "@/components/ui/input/input.svelte";
  import Label from "@/components/ui/label/label.svelte";
  import * as Dialog from "@/components/ui/dialog/index";
  import { bgDialogCss } from "@/stores/bgPageCss";
  import Textarea from "@/components/ui/textarea/textarea.svelte";
  import { X } from "lucide-svelte";
  import ScrollArea from "./ui/scroll-area/scroll-area.svelte";
  import { superForm } from "sveltekit-superforms";
  import * as Tooltip from "$lib/components/ui/tooltip";

  export let taskAdderForm;
  const { form, enhance, message } = superForm(taskAdderForm, {
    dataType: "json",
  });
  $: $form.task_name = "";
  $: $form.description = "";
  $: $form.subtasks = ["", ""];

  function handleInputRemover(index: number) {
    $form.subtasks = $form.subtasks.filter(
      (_: string, i: number) => i !== index
    );
  }

  function handleInputAdder() {
    $form.subtasks = [...$form.subtasks, ""];
    $form.subtasks = $form.subtasks;
  }

  function handleReset() {
    $form.task_name = "";
    $form.description = "";
    $form.subtasks = [];
  }
  $: isSubtaskEmpty = () => {
    for (const [key, value] of Object.entries($form.subtasks)) {
      if (!value) {
        return false
      }
    }
    return true
  }
  $: enab = ($form.task_name && $form.subtasks.length == 0) || ($form.task_name && isSubtaskEmpty()) ? false : true;
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
        +
      </div>
    </Button>
  </Dialog.Trigger>
  <Dialog.Content class={$bgDialogCss}>
    <form
      action="?/addTask"
      method="POST"
      use:enhance
      class="w-full h-full space-y-2"
    >
      <Dialog.Header>Add New Task</Dialog.Header>

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
          <Input placeholder="e.g. drink water" bind:value={$form.task_name} />
        </div>
        <div class="space-y-2">
          <Label>Description</Label>
          <Textarea
            placeholder="e.g. Be like water my friend"
            class="w-full focus:border-purp_manager-def border-gray-500"
            bind:value={$form.description}
          />
        </div>
        <div class="space-y-2">
          <Label class="pr-3">Subtasks</Label>
          {#if $form.subtasks.length != 0}
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
            {#if $form.subtasks.length == 0}
              <div
                class="flex justify-center items-center text-gray-300 font-semibold opacity-40"
              >
                No Subtasks are available
              </div>
            {/if}
            {#each $form.subtasks as input, index}
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
        <Button
          variant="active"
          size="rounded"
          class="w-full p-3"
          type="submit"
          disabled={enab}
        >
          Create Task
        </Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
