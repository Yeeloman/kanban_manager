<script lang="ts">
  import Button from "./ui/button/button.svelte";
  import Label from "./ui/label/label.svelte";
  import * as Dialog from "$lib/components/ui/dialog/index";
  import { bgDialogCss } from "@/stores/bgPageCss";
  import { Edit, X } from "lucide-svelte";
  import Input from "./ui/input/input.svelte";
  import DeleteBoardDialog from "./DeleteBoardDialog.svelte";
</script>
<Dialog.Root>
  <Dialog.Trigger>
    <Button
      variant="active"
      size="rounded"
      class="px-[12px] py-[12px] font-bold">
        <Edit/>
    </Button>
  </Dialog.Trigger>
  <Dialog.Content class={$bgDialogCss}>
        <Dialog.Header>
          <!-- * header of the diamog-->
      <Dialog.Title>Edit board</Dialog.Title>
      <Dialog.Description>

      </Dialog.Description>
    </Dialog.Header>
    <!-- * Body of the Dialog -->
    <div class="space-y-2">
      <Label for="board_name">Board Name</Label>
      <Input/>
    </div>
    <div class="space-y-2">
      <Label for="board_col">Board Columns</Label>
      <div class="flex justify-center items-center gap-1">
        <Input/>
        <Button
          variant="ghost">
          <X class="text-gray-500"/>
        </Button>
      </div>
    </div>
    <Button
      variant="side_bar_inactive"
      size="rounded"
      class="p-3 w-full">
      Add New Column
    </Button>
    <Dialog.Footer>
      <!-- * footer of the dialog -->
      <Button
        variant="active"
        size="rounded"
        class="p-3 w-full">
        Save changes
      </Button>
      <div class="w-1/6 flex justify-center items-center">
        <DeleteBoardDialog />
      </div>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
