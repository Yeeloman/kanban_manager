<script lang="ts">
    import Button from '@/components/ui/button/button.svelte';
</script>
<div class="w-[250px] p-5 space-y-2">
    <Button variant="active" class="w-full p-2" size="rounded">Active</Button>
    <Button variant="side_bar_active" class="w-full p-2" size="sidebar">side bar active</Button>
    <Button variant="side_bar_inactive" class="w-full p-2" size="sidebar">side bar inactive</Button>
</div>
