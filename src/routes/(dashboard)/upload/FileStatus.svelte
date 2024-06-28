<script lang="ts">
  import { fly } from "svelte/transition";
  import type { FileData } from "./file";

  export let data: FileData;
</script>

<div
  class="w-full rounded-lg border border-accent border-opacity-5 bg-base-200 p-6"
  in:fly|global={{ y: -50, duration: 750 }}
>
  <h2 class="text-lg font-bold text-primary">{data.name}</h2>
  <p>bytes: {data.size}</p>

  <progress class="progress progress-success w-full" value={data.progress}></progress>
</div>
