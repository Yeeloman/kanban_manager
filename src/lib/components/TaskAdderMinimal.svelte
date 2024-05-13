<script lang="ts">
  import Button from "@/components/ui/button/button.svelte";
  import Input from "@/components/ui/input/input.svelte";
  import Label from "@/components/ui/label/label.svelte";
  import * as Dialog from "@/components/ui/dialog/index";
  import { bgDialogCss } from "@/stores/bgPageCss";
  import Textarea from "@/components/ui/textarea/textarea.svelte";
  import { X } from "lucide-svelte";
  import ScrollArea from "./ui/scroll-area/scroll-area.svelte";
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
  <Dialog.Trigger>
    <Button size="rounded" variant="minimalAdd" class="w-full h-full">
      <div
        class="px-4 font-bold text-3xl text-gray-400 dark:hover:text-purp_manager-def hover:text-purp_manager-def"
      >
        +
      </div>
    </Button>
  </Dialog.Trigger>
  <Dialog.Content class={$bgDialogCss}>
    <Dialog.Header>Add New Task</Dialog.Header>

    <div class="space-y-5">
      <div class="space-y-2">
        <Label>Task Name</Label>
        <Input placeholder="e.g. drink water" />
      </div>
      <div class="space-y-2">
        <Label>Description</Label>
        <Textarea
          placeholder="e.g. Be like water my friend"
          class="w-full focus:border-purp_manager-def border-gray-500"
        />
      </div>
      <div class="space-y-2">
        <Label>Subtasks</Label>

        <ScrollArea class="w-full h-[100px]">
          {#if inputs.inputs.length === 0}
            <div class="flex justify-center items-center text-gray-300 font-semibold opacity-40">
              No Subtasks are available
            </div>
          {/if}
          {#each inputs.inputs as input, index}
            <div class="flex justify-center items-center gap-1">
              <Input bind:value={input.value} name={`input-${index}`} />
              <Button variant="ghost"
                on:click={() => handleInputRemover(index)}>
                <X class="text-gray-500" />
              </Button>
            </div>
          {/each}
        </ScrollArea>
        <Button variant="side_bar_active" size="rounded" class="w-full p-3"
          on:click={handleInputAdder}>
          New Subtask
        </Button>
      </div>
    </div>
    <div></div>
    <Dialog.Footer>
      <Button variant="active" size="rounded" class="w-full p-3">
        Create Task
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
