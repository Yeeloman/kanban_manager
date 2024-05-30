<script lang="ts">
  import Input from "./ui/input/input.svelte";
  import { Trash2 } from "lucide-svelte";
  import Button from "./ui/button/button.svelte";
  import * as Dialog from "@/components/ui/dialog/index";
  import { bgDialogCss } from "@/stores/bgPageCss";
  import { getContext } from "svelte";
  import { superForm } from "sveltekit-superforms";
  import stateManager from "@/stores/stateManager";

  export let task: any;
  const deleteTaskForm: any = getContext("deleteTaskForm");

  const { form, enhance, message } = superForm(deleteTaskForm, {
    dataType: "json",
  });

  $: if ($message) {
    stateManager.deleteTask($message);
  }

  function handleClick() {
    $form.id = task.id;
  }
</script>

<Dialog.Root>
  <Dialog.Trigger>
    <Button variant="ghost" size="rounded" class="p-4" on:click={handleClick}>
      <Trash2 class="text-red-500" />
    </Button>
  </Dialog.Trigger>
  <Dialog.Content class={$bgDialogCss}>
    <form action="?/deleteTask" method="POST" use:enhance>
      <Dialog.Header class="space-y-5">
        <Dialog.Title class="text-red-500 font-bold"
          >Delete this task?</Dialog.Title
        >
        <Dialog.Description
          >Are you sure you want to delete the "Plan Product Hunt launch" task
          and its subtasks? This action cannot be reversed.</Dialog.Description
        >
      </Dialog.Header>
      <Dialog.Footer class="mt-5">
        <Dialog.Close class="w-full">
          <Button
            type="submit"
            variant="destructive"
            size="rounded"
            class="w-full p-3">Delete</Button
          >
        </Dialog.Close>
        <Dialog.Close class="w-full">
          <Button variant="side_bar_inactive" size="rounded" class="w-full p-3"
            >Cancel</Button
          >
        </Dialog.Close>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
