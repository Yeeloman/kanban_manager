<script lang="ts">
    import Button from "@/components/ui/button/button.svelte";
    import * as Dialog from "@/components/ui/dialog/index";
    import { bgDialogCss } from "@/stores/bgPageCss";


</script>
<Dialog.Root>
    <Dialog.Trigger>
        <Button size="rounded" variant="active">
            <div class="py-4 px-6 font-bold">+ Add New Task</div>
        </Button>
    </Dialog.Trigger>
    <Dialog.Content class="{$bgDialogCss} font-bold text-xl">
        <Dialog.Header>
            Add New Task
        </Dialog.Header>
        <Dialog.Footer>
            <Button
                variant="active"
                size="rounded"
                class="w-full p-3">
                Create Task
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
