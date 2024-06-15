<script lang="ts">
  import Navbar from "$lib/components/navbar.svelte";
  import { getLocalAuth } from "$lib/stores";
  import { onMount } from "svelte";
  import { Toaster } from "svelte-french-toast";
  import "../app.css";

  onMount(() => {
    getLocalAuth();
  });
</script>

<Toaster />

<Navbar />

<slot />
