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

  const { signInForm, signUpForm } = data.form;

  const {
    form: Iform,
    enhance: Ienhance,
    errors: Ierrors,
  } = superForm(signInForm, {
    dataType: "json",
  });

  const {
    form: Uform,
    enhance: Uenhance,
    errors: Uerrors,
  } = superForm(signUpForm, {
    dataType: "json",
  });

  function IshowErrors() {
    if ($Ierrors.username) {
      toast($Ierrors.username[0]);
    }
    if ($Ierrors.password) {
      toast($Ierrors.password[0]);
    }

    // * reset errors
    // $Ierrors.username = [];
    // $Ierrors.password = [];
  }

  function UshowErrors() {
    if ($Uerrors.username) {
      for (const err of $Uerrors.username) {
        toast(err)
      }

    }
    if ($Uerrors.email) {
      for (const err of $Uerrors.email) {
        toast(err)
      }
    }
    if ($Uerrors.password) {
      for (const err of $Uerrors.password) {
        toast(err)
      }
    }
    if ($Uerrors.conf_pwd) {
      for (const err of $Uerrors.conf_pwd) {
        toast(err)
      }
    }

    // * reset errors
    $Uerrors.username = [];
    $Uerrors.email = [];
    $Uerrors.password = [];
    $Uerrors.conf_pwd = [];
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
          <form action="?/signIn" method="post" use:Ienhance>
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
                  bind:value={$Iform.username}
                />
              </div>
              <div class="space-y-1">
                <Label for="username">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="*********"
                  bind:value={$Iform.password}
                />
              </div>
            </Card.Content>
            <Card.Footer class="flex justify-center items-center">
              <Button
                variant="side_bar_active"
                size="lg"
                class="rounded-lg"
                type="submit"
                on:click={IshowErrors}
              >
                Sign In
              </Button>
            </Card.Footer>
          </form>
        </Card.Root>
      </Tabs.Content>
      <Tabs.Content value="signup">
        <Card.Root class="dark:bg-dark_theme-front">
          <form action="?/signUp" method="POST" use:Uenhance>
            <Card.Header>
              <Card.Title>Sign Up</Card.Title>
              <Card.Description>
                Create your account and start organizing your projects.
              </Card.Description>
            </Card.Header>
            <Card.Content class="space-y-2">
              <div class="space-y-1">
                <Label for="username">Username</Label>
                <Input
                  id="username"
                  bind:value={$Uform.username}
                />
              </div>
              <div class="space-y-1">
                <Label for="email">Email</Label>
                <Input id="email" type="email" bind:value={$Uform.email} />
              </div>
              <div class="space-y-1">
                <Label for="new">New password</Label>
                <Input id="new" type="password" bind:value={$Uform.password}/>
              </div>
              <div class="space-y-1">
                <Label for="confirm">confirm password</Label>
                <Input id="confirm" type="password" bind:value={$Uform.conf_pwd}/>
              </div>
            </Card.Content>
            <Card.Footer class="flex justify-center items-center">
              <Button
                variant="side_bar_active"
                size="lg"
                class="rounded-lg"
                type="submit"
                on:click={UshowErrors}
              >
                Sign Up
              </Button>
            </Card.Footer>
          </form>
        </Card.Root>
      </Tabs.Content>
    </Tabs.Root>
  </div>
</main>
