<script lang="ts">
  import Checkbox from "./ui/checkbox/checkbox.svelte";
  import Label from "./ui/label/label.svelte";

    let checked = false;
    export let task: number;
</script>

<div
  class="flex items-center space-x-3 p-3 hover:bg-purp_manager-def rounded-lg"
>
  <Checkbox id="{String(task)}" bind:checked aria-labelledby="terms-label" />
  <Label
    id="{String(task)}"
    for="terms"
    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  >
    sub task {task}
  </Label>
</div>
