<script lang="ts">
  import { bgPageCss } from "@/stores/bgPageCss";
  import Button from "@/components/ui/button/button.svelte";
</script>

<div class="flex flex-col justify-start space-y-20 items-center {$bgPageCss}">
  <header class="mt-10">
    <p class="text-3xl font-bold">Streamline your <span class="text-purp_manager-def">workflow</span> with an intuitive Kanban tool.</p>
  </header>
  <div class="flex flex-row justify-between w-[90%] mt-10">
    <section class="flex flex-col justify-start items-center w-[40%]">
      <h2 class="text-2xl text-purp_manager-def font-semibold mb-3">Overview</h2>
      <p class="mb-10">
        Kanban Manager is a robust and intuitive tool designed to streamline
        your workflow using the Kanban methodology. Developed to enhance
        productivity by providing an easy-to-use interface for task management.
      </p>
    <Button variant="active" size="lg">
        <a href="/login" class="font-bold">Get started</a>
    </Button>
    </section>
    <section class="flex flex-col justify-center items-center w-[40%]">
      <h2 class="text-2xl text-purp_manager-def font-semibold mb-3">Features</h2>
      <ul>
        <li>Task Management: Create, edit, and delete tasks effortlessly.</li>
        <li>
          Customizable Boards: Organize your tasks on boards that can be
          tailored to your needs.
        </li>
        <li>
          Drag-and-Drop Interface: Move tasks between columns with a simple
          drag-and-drop action.
        </li>
        <li>
          Real-time Updates: Keep your team synchronized with real-time task
          updates.
        </li>
        <li>
          User Permissions: Control who can view or edit tasks within your
          boards.
        </li>
      </ul>
    </section>
  </div>
</div>
