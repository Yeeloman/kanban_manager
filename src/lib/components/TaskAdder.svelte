<script lang="ts">
  import Button from "@/components/ui/button/button.svelte";
  import Input from "@/components/ui/input/input.svelte";
  import Label from "@/components/ui/label/label.svelte";
  import * as Select from "$lib/components/ui/select/index.js";
  import * as Dialog from "@/components/ui/dialog/index";
  import { bgDialogCss } from "@/stores/bgPageCss";
  import Textarea from "@/components/ui/textarea/textarea.svelte";
  import { X } from "lucide-svelte";

</script>

<Dialog.Root>
  <Dialog.Trigger>
    <Button size="rounded" variant="active">
      <div class="py-4 px-6 font-bold">+ Add New Task</div>
    </Button>
  </Dialog.Trigger>
  <Dialog.Content class="{$bgDialogCss} font-bold text-xl">
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
      <div>
        <Select.Root>
          <Select.Trigger class="dark:bg-dark_theme-back rounded-full focus:border-purp_manager-def bg-slate-100 border-gray-500">
            <Select.Value placeholder="Current Status"/>
          </Select.Trigger>
          <Select.Content class="dark:bg-dark_theme-back rounded-lg border-gray-500">
            <Select.Group>
              <Select.Label>testing select</Select.Label>
              <Select.Item value='test1' label='test1'>test 1</Select.Item>
              <Select.Item value='test2' label='test2'>test 2</Select.Item>
              <Select.Item value='test3' label='test3'>test 3</Select.Item>
              <Select.Item value='test4' label='test4'>test 4</Select.Item>
            </Select.Group>
            <Select.Input name="test" />
            <div class="w-full h-2"></div>
          </Select.Content>
        </Select.Root>
      </div>
    </div>
    <Dialog.Footer>
      <Button variant="active" size="rounded" class="w-full p-3">
        Create Task
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
