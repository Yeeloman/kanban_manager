<script lang="ts">
  import Button from "./ui/button/button.svelte";
  import Label from "./ui/label/label.svelte";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index";
  import { bgDialogCss } from "@/stores/bgPageCss";
  import { X } from "lucide-svelte";
  import Input from "./ui/input/input.svelte";
  import { PanelsTopLeft } from "lucide-svelte";
  import InputArray from "@/reusableFuncs/inputAddRemove";

  let inputs = new InputArray();

  function handleInputRemover(index: number) {
    inputs.inputRemover(index);
    inputs = inputs;
  }

  function handleInputAdder() {
    inputs.inputAdder();
    inputs = inputs;
  }
</script>

<Dialog.Root>
  <Dialog.Trigger class="w-full flex items-start">
    <Button
      variant="side_bar_inactive"
      size="sidebar"
      class="py-3  w-[90%] text-purp_manager-def"
    >
      <PanelsTopLeft class="text-purp_manager-def" />
      <p class="ml-3">+Create New Board</p>
    </Button>
  </Dialog.Trigger>
  <Dialog.Content class={$bgDialogCss}>
    <Dialog.Header>
      <!-- * header of the diamog-->
      <Dialog.Title>Add New board</Dialog.Title>
      <Dialog.Description></Dialog.Description>
    </Dialog.Header>
    <!-- * Body of the Dialog -->
    <div class="space-y-2">
      <Label for="board_name">Board Name</Label>
      <Input />
    </div>
    <div class="space-y-2">
      <!-- * board column section -->
      <Label for="board_col">Board Columns</Label>
      <ScrollArea class="w-full h-[150px]">
        {#each inputs.inputs as input, index}
          <div class="flex justify-center items-center gap-1">
            <Input bind:value={input.value} name={`input-${index}`} />
            <Button variant="ghost" on:click={() => handleInputRemover(index)}>
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
      <Button variant="active" size="rounded" class="p-3 w-full">
        Create New Board
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
