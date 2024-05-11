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
    <Dialog.Header class="space-y-3">
      <Dialog.Title class="text-red-500 font-bold">Delete this board?</Dialog.Title>
      <Dialog.Description>Are you sure you want to delete the "Platform Launch" board? This action will remove all columns and tasks and cannot be reversed.</Dialog.Description>
    </Dialog.Header>
    <Dialog.Footer>
      <Button
        variant="destructive"
        size="rounded"
        class="w-full p-3"
      >Delete</Button>
      <Button
        variant="side_bar_inactive"
        size="rounded"
        class="w-full p-3"
      >Cancel</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
