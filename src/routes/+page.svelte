<script lang="ts">
  import type { PageData } from "./$types";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import Label from "@/components/ui/label/label.svelte";
  import Input from "@/components/ui/input/input.svelte";
  import Button from "@/components/ui/button/button.svelte";
  import { superForm } from "sveltekit-superforms";
  import { toast } from "svelte-sonner";

  export let data: PageData;

  const { signInForm } = data.form;

  const { form, enhance, errors } = superForm(signInForm, {
    dataType: 'json',
  });

  function showErrors() {
    if ($errors.username) {
      toast($errors.username[0])
    }
    if ($errors.password) {
      toast($errors.password[0])
    }


  }
</script>

<main
  class="h-full w-full flex justify-center items-center p-5 bg-slate-100 dark:bg-dark_theme-back"
>
  <div class="bg-slate-100 dark:bg-dark_theme-back">
    <Tabs.Root value="signin" class="">
      <Tabs.List class="grid w-full grid-cols-2 dark:bg-dark_theme-back">
        <Tabs.Trigger value="signin" class="">
          <div class="w-full">Sign In</div>
        </Tabs.Trigger>
        <Tabs.Trigger value="signup">
          <div class="w-full">Sign Up</div>
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="signin" class="">
        <Card.Root class="dark:bg-dark_theme-front">
          <form
            action="?/signIn"
            method="post"
            use:enhance
          >
            <Card.Header>
              <Card.Title>Sign In</Card.Title>
              <Card.Description>
                Sign in with your account and start organizing your projects.
              </Card.Description>
            </Card.Header>
            <Card.Content class="space-y-2">
              <div class="space-y-1">
                <Label for="name">Username</Label>
                <Input
                  id="username"
                  placeholder="username"
                  bind:value={$form.username}/>
              </div>
              <div class="space-y-1">
                <Label for="username">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="*********"
                  bind:value={$form.password}
                />
              </div>
            </Card.Content>
            <Card.Footer class="flex justify-center items-center">
              <Button
                variant="side_bar_active"
                size="lg"
                class="rounded-lg"
                type="submit"
                on:click={showErrors}
              >
                Sign In
              </Button>
            </Card.Footer>
          </form>
        </Card.Root>
      </Tabs.Content>
      <Tabs.Content value="signup">
        <Card.Root class="dark:bg-dark_theme-front">
          <Card.Header>
            <Card.Title>Sign Up</Card.Title>
            <Card.Description>
              Create your account and start organizing your projects.
            </Card.Description>
          </Card.Header>
          <Card.Content class="space-y-2">
            <div class="space-y-1">
              <Label for="username">Username</Label>
              <Input id="username" type="email" />
            </div>
            <div class="space-y-1">
              <Label for="email">Email</Label>
              <Input id="email" type="email" />
            </div>
            <div class="space-y-1">
              <Label for="new">New password</Label>
              <Input id="new" type="password" />
            </div>
            <div class="space-y-1">
              <Label for="confirm">confirm password</Label>
              <Input id="confirm" type="password" />
            </div>
          </Card.Content>
          <Card.Footer class="flex justify-center items-center">
            <Button
              variant="side_bar_active"
              size="lg"
              class="rounded-lg"
              type="submit">Sign Up</Button
            >
          </Card.Footer>
        </Card.Root>
      </Tabs.Content>
    </Tabs.Root>
  </div>
</main>
