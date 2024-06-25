<script>
  import { goto } from "$app/navigation";
  import { getLocalAuth } from "$lib/stores";
  import { KeyRound, User } from "lucide-svelte";
  import toast from "svelte-french-toast";
  import { superForm } from "sveltekit-superforms";

  export let data;

  const { form, errors, enhance, constraints, message, delayed } = superForm(data.form, {
    delayMs: 100,
  });

  message.subscribe((value) => {
    if (value === "ok") {
      toast.success("Logged in");
      goto("/dashboard", { invalidateAll: true });
      getLocalAuth();
    }
  });
</script>

<div class="mt-14 flex w-full justify-center">
  <div>
    <h1 class="text-center text-4xl font-bold text-primary">Log in</h1>
    <p class="mt-1 text-center text-sm">
      Or <a href="/signup" class="underline">sign up</a>
    </p>

    <form action="?/login" method="post" class="form-control mt-4" use:enhance>
      <label
        for="username"
        class="input input-bordered mt-4 flex items-center gap-2 {$delayed ? 'input-disabled' : ''}"
      >
        <User opacity={70} />
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          bind:value={$form.username}
          {...$constraints.username}
        />
      </label>

      {#if $errors.username}
        <span class="mt-1 text-error">{$errors.username[0]}</span>
      {/if}

      <label
        for="password"
        class="input input-bordered mt-4 flex items-center gap-2 {$delayed ? 'input-disabled' : ''}"
      >
        <KeyRound opacity={70} />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          bind:value={$form.password}
          {...$constraints.password}
        />
      </label>

      {#if $errors.password}
        <span class="mt-1 text-error">{$errors.password[0]}</span>
      {/if}

      <button
        class="btn btn-primary mt-4 flex items-center gap-2 text-lg {$delayed
          ? 'btn-disabled'
          : ''}"
      >
        {#if $delayed}
          <span class="loading loading-spinner"></span>
        {/if}
        <span>Log in</span>
      </button>
    </form>
  </div>
</div>
