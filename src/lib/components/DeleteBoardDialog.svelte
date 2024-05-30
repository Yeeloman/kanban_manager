<script lang="ts">
  import { Trash2 } from "lucide-svelte";
  import Button from "./ui/button/button.svelte";
  import * as Dialog from "@/components/ui/dialog/index";
  import { bgDialogCss } from "@/stores/bgPageCss";
  import { getContext } from "svelte";
  import { superForm } from "sveltekit-superforms";
  import stateManager from "@/stores/stateManager";

  const deleteBoardForm: any = getContext("deleteBoardForm");
  const { form, enhance, message } = superForm(deleteBoardForm, {
    dataType: "json",
  });

  function handleClick() {
    const board = stateManager.getActiveBoard()
    $form.id = board?.id
  }

  $: if ($message) {
    console.log("🚀 ~ $message:", $message)
    stateManager.deleteBoard($message)
  }
</script>

<Dialog.Root>
  <Dialog.Trigger>
    <Button variant="ghost" size="rounded" class="p-4">
      <Trash2 class="text-red-500" />
    </Button>
  </Dialog.Trigger>
  <Dialog.Content class={$bgDialogCss}>
    <form action="?/deleteBoard" method="post" use:enhance>
      <Dialog.Header class="space-y-5">
        <Dialog.Title class="text-red-500 font-bold"
          >Delete this board?</Dialog.Title
        >
        <Dialog.Description
          >Are you sure you want to delete the "Platform Launch" board? This
          action will remove all columns and tasks and cannot be reversed.</Dialog.Description
        >
      </Dialog.Header>
      <Dialog.Footer>
        <Dialog.Close class="w-full">
          <Button type="submit" variant="destructive" size="rounded" class="w-full p-3" on:click={handleClick}
            >Delete</Button
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
