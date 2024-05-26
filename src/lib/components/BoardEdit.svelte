<script lang="ts">
  import Button from "./ui/button/button.svelte";
  import Label from "./ui/label/label.svelte";
  import * as Dialog from "$lib/components/ui/dialog/index";
  import { bgDialogCss } from "@/stores/bgPageCss";
  import { Edit, X } from "lucide-svelte";
  import Input from "./ui/input/input.svelte";
  import DeleteBoardDialog from "./DeleteBoardDialog.svelte";
  import ScrollArea from "./ui/scroll-area/scroll-area.svelte";
  import { superForm } from "sveltekit-superforms";
  export let boardEditorForm;
  import * as Tooltip from "$lib/components/ui/tooltip";

  const { form, enhance, errors } = superForm(boardEditorForm, {
    dataType: "json",
  });

  $: $form.edit_bcolumns = ["", ""];

  function handleInputRemover(index: number) {
    if ($form.edit_bcolumns.length > 1) {
      $form.edit_bcolumns = $form.edit_bcolumns.filter(
        (_: string, i: number) => i !== index
      );
    }
  }

  function handleInputAdder() {
    $form.edit_bcolumns = [...$form.edit_bcolumns, ""];
    $form.edit_bcolumns = $form.edit_bcolumns;
  }

  $: isTaskEmpty = () => {
    for (const [key, value] of Object.entries($form.edit_bcolumns)) {
      if (!value) {
        return false;
      }
    }
    return true;
  };
  $: enab =
    ($form.edit_bname && $form.edit_bcolumns.length == 0) ||
    ($form.edit_bname && isTaskEmpty())
      ? false
      : true;
</script>

<Dialog.Root>
  <Dialog.Trigger>
    <Button
      variant="active"
      size="rounded"
      class="px-[12px] py-[12px] font-bold"
    >
      <Edit />
    </Button>
  </Dialog.Trigger>
  <Dialog.Content class={$bgDialogCss}>
    <form
      action="?/edit"
      method="POST"
      use:enhance
      class="w-full h-full space-y-2"
    >
      <Dialog.Header>
        <!-- * header of the diamog-->
        <Dialog.Title>Edit board</Dialog.Title>
        <Dialog.Description></Dialog.Description>
      </Dialog.Header>
      <!-- * Body of the Dialog -->
      <div class="space-y-2">
        <Label for="board_name" class="mr-3">Board Name</Label>
        <Tooltip.Root>
          <Tooltip.Trigger>
            <span class="text-purp_manager-def font-bold text-lg">*</span>
          </Tooltip.Trigger>
          <Tooltip.Content class="bg-slate-100 dark:bg-dark_theme-back">
            <p>Board name can't be empty</p>
          </Tooltip.Content>
        </Tooltip.Root>
        <Input type="text" name="board_name" bind:value={$form.edit_bname} />
      </div>
      <div class="space-y-2">
        <!-- * board column section -->
        <Label for="board_col" class="mr-2">Board Columns</Label>
        <Tooltip.Root>
          <Tooltip.Trigger>
            <span class="text-purp_manager-def font-bold text-lg">*</span>
          </Tooltip.Trigger>
          <Tooltip.Content class="bg-slate-100 dark:bg-dark_theme-back">
            <p>A task can't be empty</p>
          </Tooltip.Content>
        </Tooltip.Root>
        <ScrollArea class="w-full h-[150px]">
          {#if $form.edit_bcolumns.length === 0}
            <div
              class="flex justify-center items-center text-gray-300 font-semibold opacity-40"
            >
              No Columns are available
            </div>
          {/if}
          {#each $form.edit_bcolumns as input, index}
            <div class="flex justify-center items-center gap-1">
              <Input type="text" bind:value={input} name={`input-${index}`} />
              <Button
                variant="ghost"
                on:click={() => handleInputRemover(index)}
              >
                <X class="text-gray-500" />
              </Button>
            </div>
          {/each}
        </ScrollArea>
      </div>
      <Button
        variant="side_bar_inactive"
        size="rounded"
        class="p-3 w-full"
        on:click={handleInputAdder}
      >
        Add New Column
      </Button>
      <Dialog.Footer>
        <!-- * footer of the dialog -->
        <Dialog.Close
          class="w-full"
          disabled={enab}
          >
          <Button
            variant="active"
            size="rounded"
            class="p-3 w-full"
            type="submit"
            disabled={enab}
          >
            Save changes
          </Button>
        </Dialog.Close>
        <div class="w-1/6 flex justify-center items-center">
          <DeleteBoardDialog />
        </div>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
