<script lang="ts">
  import { dev } from "$app/environment";
  import Navbar from "$lib/components/navbar.svelte";
  import { getLocalAuth } from "$lib/stores";
  import { onMount } from "svelte";
  import { Toaster } from "svelte-french-toast";
  import "../app.css";

  onMount(() => {
    getLocalAuth();
  });
</script>

<svelte:head>
  {#if !dev}
    <script
      defer
      data-domain="files.maxz.dev"
      src="https://analytics.maxz.dev/js/script.js"
    ></script>
  {/if}
</svelte:head>

<Toaster />

<Navbar />

<slot />
