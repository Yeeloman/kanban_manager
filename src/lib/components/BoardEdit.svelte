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

  const { form, enhance, errors, message } = superForm(boardEditorForm, {
    dataType: "json",
  });

  $: $form.edit_bcolumns = ["", ""];
  $: newBoard = $message;

  function handleInputRemover(index: number) {
    $form.edit_bcolumns = $form.edit_bcolumns.filter(
      (_: string, i: number) => i !== index
    );
  }

  function handleInputAdder() {
    $form.edit_bcolumns = [...$form.edit_bcolumns, ""];
    $form.edit_bcolumns = $form.edit_bcolumns;
    console.log("test:   ", $errors)
  }

  function handleReset() {
    $form.edit_bname = "";
    $form.edit_bcolumns = ["", ""];
    $errors = {};
  }
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
        <Label for="board_name">Board Name</Label>
        <Input type="text" name="board_name" bind:value={$form.edit_bname} />
        {#if $errors.edit_bname}
          <input
            class="text-red-500 w-full bg-transparent border-none p-1"
            bind:value={$errors.edit_bname}
            disabled
          />
        {/if}
      </div>
      <div class="space-y-2">
        <!-- * board column section -->
        <Label for="board_col">Board Columns</Label>
        {#if $errors.edit_bcolumns && $errors.edit_bcolumns[0]}
          <input
            class="text-red-500 w-full bg-transparent border-none p-1 text-sm"
            bind:value={$errors.edit_bcolumns[0]}
            disabled
          />
        {/if}
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
              <Input
                type="text"
                bind:value={input}
                name={`input-${index}`}
              />
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
        <Button variant="active" size="rounded" class="p-3 w-full" type="submit">
          Save changes
        </Button>
        <div class="w-1/6 flex justify-center items-center">
          <DeleteBoardDialog />
        </div>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
