<script lang="ts">
	import type { Writable } from 'svelte/store';
  import Button from "./ui/button/button.svelte";
  import Label from "./ui/label/label.svelte";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index";
  import { bgDialogCss } from "@/stores/bgPageCss";
  import { X } from "lucide-svelte";
  import Input from "./ui/input/input.svelte";
  import { PanelsTopLeft } from "lucide-svelte";
  import { superForm } from "sveltekit-superforms";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { createEventDispatcher } from "svelte";

  export let boardAdderForm;
  const dispatch = createEventDispatcher();

  const { form: Aform, enhance, message } = superForm(boardAdderForm, {
    dataType: "json",
  });
  function sendBoard(message: Writable<any>) {
    if (message) {
      dispatch('boardAdded', message)
    }
  }

  $: sendBoard($message)
  $: $Aform.board_columns = ["", ""];

  function handleInputRemover(index: number) {
    if ($Aform.board_columns.length > 1) {
      $Aform.board_columns = $Aform.board_columns.filter(
        (_: string, i: number) => i !== index
      );
    }
  }

  function handleInputAdder() {
    $Aform.board_columns = [...$Aform.board_columns, ""];
    $Aform.board_columns = $Aform.board_columns;
  }

  function handleReset() {
    $Aform.board_name = "";
    $Aform.board_columns = ["", ""];
  }

  $: isTaskEmpty = () => {
    for (const [key, value] of Object.entries($Aform.board_columns)) {
      if (!value) {
        return false;
      }
    }
    return true;
  };
  $: enab =
    ($Aform.board_name && isTaskEmpty() && $Aform.board_columns.length >= 1)
      ? false
      : true;
</script>

<Dialog.Root>
  <Dialog.Trigger class="w-full flex items-start">
    <Button
      variant="side_bar_inactive"
      size="sidebar"
      class="py-3  w-[90%] text-purp_manager-def"
      on:click={handleReset}
    >
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
        <Label for="board_name" class="mr-3">Board Name</Label>
          <Tooltip.Root>
            <Tooltip.Trigger>
              <span class="text-purp_manager-def font-bold text-lg">*</span>
            </Tooltip.Trigger>
            <Tooltip.Content class="bg-slate-100 dark:bg-dark_theme-back">
              <p>Board name can't be empty</p>
            </Tooltip.Content>
          </Tooltip.Root>
        <Input type="text" name="board_name" bind:value={$Aform.board_name} />
      </div>
      <div class="space-y-2">
        <!-- * board column section -->
        <Label for="board_col" class="w-full mr-3">Board Columns</Label>
          <Tooltip.Root>
            <Tooltip.Trigger>
              <span class="text-purp_manager-def font-bold text-lg">*</span>
            </Tooltip.Trigger>
            <Tooltip.Content class="bg-slate-100 dark:bg-dark_theme-back">
              <p>A Category can't be empty</p>
            </Tooltip.Content>
          </Tooltip.Root>
        <ScrollArea class="w-full h-[150px]">
          {#if $Aform.board_columns.length === 0}
            <div
              class="flex justify-center items-center text-gray-300 font-semibold opacity-40"
            >
              No Columns are available
            </div>
          {/if}
          {#each $Aform.board_columns as input, index}
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
          disabled={enab}
        >
          Create New Board
        </Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
