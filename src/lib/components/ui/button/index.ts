import { type VariantProps, tv } from "tailwind-variants";
import type { Button as ButtonPrimitive } from "bits-ui";
import Root from "./button.svelte";

const buttonVariants = tv({
	base: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
			outline:
				"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline",
			// my custom variants
			active: "bg-purp_manager-def text-white hover:bg-purp_manager-hov",
			side_bar_active: "bg-purp_manager-def font-bold text-white hover:text-purp_manager-def hover:bg-slate-100 dark:bg-purp_manager-def dark:hover:text-purp_manager-def dark:hover:bg-white",
			side_bar_inactive: "bg-whitetext-gray-500 font-bold hover:bg-slate-100 hover:text-purp_manager-def dark:bg-dark_theme-front dark:hover:bg-white dark:hover:text-purp_manager-def",
			minimalAdd: "bg-white hover:bg-slate-100 p-3 dark:bg-dark_theme-back dark:hover:bg-white ",
			taskCard: "bg-slate-100 dark:bg-dark_theme-back text-xl font-semibold"
		},
		size: {
			default: "h-10 px-4 py-2",
			sm: "h-9 rounded-md px-3",
			lg: "h-11 rounded-md px-8",
			icon: "h-10 w-10",
			rounded: "rounded-full",
			sidebar: "rounded-r-full"
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

type Variant = VariantProps<typeof buttonVariants>["variant"];
type Size = VariantProps<typeof buttonVariants>["size"];

type Props = ButtonPrimitive.Props & {
	variant?: Variant;
	size?: Size;
};

type Events = ButtonPrimitive.Events;

export {
	Root,
	type Props,
	type Events,
	//
	Root as Button,
	type Props as ButtonProps,
	type Events as ButtonEvents,
	buttonVariants,
};
