<script lang="ts">
  import { dashboard } from "$lib/stores";
  import { onDestroy, onMount } from "svelte";
  import Sidebar from "./Sidebar.svelte";

  onMount(() => {
    $dashboard = true;
  });

  onDestroy(() => {
    $dashboard = false;
  });
</script>

<div class="flex w-full justify-center">
  <div class="drawer w-full p-3 pl-0 lg:drawer-open lg:max-w-6xl">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />

    <Sidebar />

    <div class="drawer-content pl-3">
      <slot />
    </div>
  </div>
</div>
