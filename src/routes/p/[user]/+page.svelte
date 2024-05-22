<script lang="ts">
  import Button from "@/components/ui/button/button.svelte";
  import { bgPageCss, center } from "@/stores/bgPageCss";

  export let data;
</script>

<main class={$bgPageCss}>
  <div class="w-full h-full {$center}">
    <a href="/p/{data.user}/dashboards">
      go to dashboards
    </a>
    <form action="?/logout" method="post">
      <Button
        variant="destructive"
        size="rounded"
        class="p-3"
        type="submit"
      >
        Logout
      </Button>
    </form>
  </div>
</main>
