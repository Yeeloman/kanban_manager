<script lang="ts">
  import Button from "@/components/ui/button/button.svelte";
  import Input from "@/components/ui/input/input.svelte";
  import Label from "@/components/ui/label/label.svelte";
  import * as Dialog from "@/components/ui/dialog/index";
  import { bgDialogCss } from "@/stores/bgPageCss";
  import Textarea from "@/components/ui/textarea/textarea.svelte";
  import { X } from "lucide-svelte";

</script>

<Dialog.Root>
  <Dialog.Trigger>
    <Button size="rounded" variant="minimalAdd" class="w-full h-full">
      <div class="px-4 font-bold text-3xl text-gray-400 dark:hover:text-purp_manager-def hover:text-purp_manager-def">+</div>
    </Button>
  </Dialog.Trigger>
  <Dialog.Content class="{$bgDialogCss}">
    <Dialog.Header>Add New Task</Dialog.Header>

    <div class="space-y-5">
      <div class="space-y-2">
        <Label>Task Name</Label>
        <Input placeholder="e.g. drink water" />
      </div>
      <div class="space-y-2">
        <Label>Description</Label>
        <Textarea placeholder="e.g. Be like water my friend" class="w-full focus:border-purp_manager-def border-gray-500" />
      </div>
      <div class="space-y-2">
        <Label>Subtasks</Label>
        <div class="flex justify-center items-center gap-1">
          <Input />
          <Button variant="ghost">
            <X class="text-gray-500" />
          </Button>
        </div>
        <Button
            variant="side_bar_active"
            size="rounded"
            class="w-full p-3"
            >
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
