<script lang="ts">
	import { Switch as SwitchPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	type $$Props = SwitchPrimitive.Props;
	type $$Events = SwitchPrimitive.Events;

	let className: $$Props["class"] = undefined;
	export let checked: $$Props["checked"] = undefined;
	export { className as class };

	let isHovered = false;

</script>

<SwitchPrimitive.Root
	bind:checked
	class={cn(
		"peer inline-flex h-[22px] w-[40px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-purp_manager-def data-[state=unchecked]:bg-purp_manager-def",
		className
	)}
	{...$$restProps}
	on:click
	on:keydown
>
	<SwitchPrimitive.Thumb
		class={cn(
			"pointer-events-none block h-[17px] w-[17px] rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
		)}
	/>
</SwitchPrimitive.Root>
