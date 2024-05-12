<script>
  import { mode } from "mode-watcher";

	export let progress;
	const angle = 360 * progress;
	let color = "#f1f5f9";
	let backround = "";

	$: color = $mode === "dark" ? "#20212c" : "#f1f5f9";
	// Adapt the logic according to the approach
	$: background = `radial-gradient(${color} 50%, transparent 51%),
    conic-gradient(transparent 0deg ${angle}deg, ${color} ${angle}deg 360deg),
    conic-gradient(${color} 0deg, #635fc7 360deg);`;

	$: cssVarStyles = `--background:${background}`;
</script>

<div id="progress-circle" class="flex items-center justify-center" style={cssVarStyles}>
	<slot name="tasks"/>
</div>

<style>
	#progress-circle {
		background: var(--background);
		border-radius: 50%;
		width: 40px;
		height: 40px;
		transition: all 500ms ease-in;
		will-change: transform;
	}
</style>
