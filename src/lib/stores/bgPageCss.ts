import { readable } from "svelte/store";

export const bgPageCss = readable("bg-slate-100 dark:bg-dark_theme-back w-full h-screen");
export const bgTaskCss = readable("bg-slate-100 dark:bg-dark_theme-back w-full h-[75%]");
export const bgDialogCss = readable('dark:bg-dark_theme-front')
