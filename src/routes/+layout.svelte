<script lang="ts">
  import { browser } from "$app/environment";
  import Navbar from "$lib/components/navbar.svelte";
  import { auth } from "$lib/stores";
  import { Toaster } from "svelte-french-toast";
  import "../app.css";

  export let data;

  $: {
    if (browser) {
      console.log("processing auth");
      $auth = null;
      Promise.resolve(data.auth).then((authData) => ($auth = authData));
    }
  }
</script>

<Toaster />

<Navbar />

<slot />
