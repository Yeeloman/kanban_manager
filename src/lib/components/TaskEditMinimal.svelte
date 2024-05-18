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

  export let taskEditorForm;
  const { form, enhance, message, errors } = superForm(taskEditorForm, {
    dataType: "json",
  });
  $: $form.edit_tname = "";
  $: $form.edit_description = "";
  $: $form.edit_subtasks = ["", ""];

  function handleInputRemover(index: number) {
    $form.edit_subtasks = $form.edit_subtasks.filter(
      (_: string, i: number) => i !== index
    );
  }

  function handleInputAdder() {
    $form.edit_subtasks = [...$form.edit_subtasks, ""];
    $form.edit_subtasks = $form.edit_subtasks;
  }

  function handleReset() {
    $form.edit_tname = "";
    $form.edit_description = "";
    $form.edit_subtasks = [];
  }
  $: isSubtaskEmpty = () => {
    for (const [key, value] of Object.entries($form.edit_subtasks)) {
      if (!value) {
        return false
      }
    }
    return true
  }
  $: enab = ($form.edit_tname && $form.edit_subtasks.length == 0) || ($form.edit_tname && isSubtaskEmpty()) ? false : true;
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
            bind:value={$form.description}
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
            {#if $form.edit_subtasks.length == 0}
              <div
                class="flex justify-center items-center text-gray-300 font-semibold opacity-40"
              >
                No Subtasks are available
              </div>
            {/if}
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
            Create Task
          </Button>
        </Dialog.Close>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
