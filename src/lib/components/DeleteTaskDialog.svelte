<script lang="ts">
  import { Trash2 } from "lucide-svelte";
  import Button from "./ui/button/button.svelte";
  import * as Dialog from "@/components/ui/dialog/index";
  import { bgDialogCss } from "@/stores/bgPageCss";
</script>

<Dialog.Root>
  <Dialog.Trigger>
    <Button
      variant='ghost'
      size="rounded"
      class="p-4">
      <Trash2 class="text-red-500"/>
    </Button>
  </Dialog.Trigger>
  <Dialog.Content class="{$bgDialogCss}">
    <Dialog.Header class="space-y-5">
      <Dialog.Title class="text-red-500 font-bold">Delete this task?</Dialog.Title>
      <Dialog.Description>Are you sure you want to delete the "Plan Product Hunt launch" task and its subtasks? This action cannot be reversed.</Dialog.Description>
    </Dialog.Header>
    <Dialog.Footer>
      <Button
        variant="destructive"
        size="rounded"
        class="w-full p-3"
      >Delete</Button>
      <Dialog.Close class="w-full">
        <Button
          variant="side_bar_inactive"
          size="rounded"
          class="w-full p-3"
        >Cancel</Button>
      </Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
