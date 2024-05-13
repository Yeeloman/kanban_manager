<script lang="ts">
  import Button from "./ui/button/button.svelte";
  import Label from "./ui/label/label.svelte";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index";
  import { bgDialogCss } from "@/stores/bgPageCss";
  import { X } from "lucide-svelte";
  import Input from "./ui/input/input.svelte";
  import { PanelsTopLeft } from "lucide-svelte";
  import { superForm } from "sveltekit-superforms";

  export let boardAdderForm;

  const { form, enhance, errors, message } = superForm(boardAdderForm, {
    dataType: "json",
  });

  $: $form.board_columns = ["", ""];
  $: newBoard = $message;

  function handleInputRemover(index: number) {
    $form.board_columns = $form.board_columns.filter(
      (_: string, i: number) => i !== index
    );
  }

  function handleInputAdder() {
    $form.board_columns = [...$form.board_columns, ""];
    $form.board_columns = $form.board_columns;
  }

  function handleReset() {
    $form.board_name = "";
    $form.board_columns = ["", ""];
    $errors = {};
  }
</script>

<Dialog.Root>
  <Dialog.Trigger class="w-full flex items-start">
    <Button
      variant="side_bar_inactive"
      size="sidebar"
      class="py-3  w-[90%] text-purp_manager-def"
      on:click={handleReset}>
      <PanelsTopLeft class="text-purp_manager-def" />
      <p class="ml-3">+Create New Board</p>
    </Button>
  </Dialog.Trigger>
  <Dialog.Content class={$bgDialogCss}>
    <form
      action="?/add"
      method="POST"
      class="w-full h-full space-y-2"
      use:enhance
      >
      <Dialog.Header>
        <!-- * header of the diamog-->
        <Dialog.Title>Add New board</Dialog.Title>
      </Dialog.Header>
      <!-- * Body of the Dialog -->
      <div class="space-y-2">
        <Label for="board_name">Board Name</Label>
        <Input type="text" name="board_name" bind:value={$form.board_name} />
        {#if $errors.board_name}
          <input
            class="text-red-500 w-full bg-transparent border-none p-1"
            bind:value={$errors.board_name}
            disabled
          />
        {/if}
      </div>
      <div class="space-y-2">
        <!-- * board column section -->
          <Label for="board_col" class="w-full">Board Columns</Label>
          {#if $errors.board_columns && $errors.board_columns[0]}
            <input
              class="text-red-500 w-full bg-transparent border-none p-1 text-sm "
              bind:value={$errors.board_columns[0]}
              disabled
            />
          {/if}
        <ScrollArea class="w-full h-[150px]">
          {#if $form.board_columns.length === 0}
            <div
              class="flex justify-center items-center text-gray-300 font-semibold opacity-40"
            >
              No Columns are available
            </div>
          {/if}
          {#each $form.board_columns as input, index}
            <div class="flex justify-center items-center gap-1">
              <Input bind:value={input} name={`input-${index}`}/>
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
        <Button
          type="submit"
          variant="active"
          size="rounded"
          class="p-3 w-full"
        >
          Create New Board
        </Button>
        {#if $message}
          <Dialog.Close class="w-full" on:click={() => ($message = undefined)}>
            <Button
              variant="side_bar_inactive"
              size="rounded"
              class="w-full"
            >
              <a href={`/${newBoard}`} class="w-full h-full p-3 rounded-full"> Nav to {newBoard}</a>
            </Button>
          </Dialog.Close>
        {/if}
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
