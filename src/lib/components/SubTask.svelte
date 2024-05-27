<script lang="ts">
  import Checkbox from "./ui/checkbox/checkbox.svelte";
  import Label from "./ui/label/label.svelte";

    let checked = false;
    export let subTask: {
      id: number,
      done: boolean,
      name: string,
      taskId: number
    };
</script>

<div
  class="flex items-center space-x-3 p-3 hover:bg-purp_manager-def rounded-lg"
>
  <Checkbox bind:checked={subTask.done}/>
  <Label
    for="subtask"
    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 {subTask.done ? "line-through text-gray-500 hover:text-white" : ""}"
  >
    {subTask.name}
  </Label>
</div>
