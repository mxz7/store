<script lang="ts">
  import { formatBytes } from "$lib/format";
  import { Check, CircleX } from "lucide-svelte";
  import { fly } from "svelte/transition";
  import type { FileData } from "./file";

  export let data: FileData;

  let progress = data.progress;
</script>

<div
  class="w-full rounded-lg border border-accent border-opacity-5 bg-base-200 p-6"
  in:fly|global={{ y: -50, duration: 750 }}
>
  <div class="flex w-full gap-4 text-lg font-bold text-primary">
    <h2 class="max-w-[50%] overflow-hidden text-ellipsis text-nowrap">{data.name}</h2>
    {#if data.uploadedId}
      <a href="https://cdn.maxz.dev/{data.uploadedId}" target="_blank" class="link link-primary">
        {data.uploadedId}
      </a>
    {/if}
  </div>
  <p>{formatBytes(data.size)}</p>

  <div class="mt-1 flex w-full items-center gap-2">
    {#if data.status === "processing" || data.status === "uploading"}
      <span class="loading loading-spinner loading-xs" />
    {:else if data.status === "error"}
      <span class="tooltip tooltip-error" data-tip="failed to upload">
        <CircleX class="text-error" size={16} />
      </span>
    {:else if data.status === "done"}
      <span class="tooltip tooltip-success" data-tip="successfully uploaded">
        <Check class="text-success" size={16} />
      </span>
    {/if}
    <progress
      class="progress {data.status === 'error' ? 'progress-error' : 'progress-success'} w-full"
      value={$progress}
      max="100"
    ></progress>
  </div>
</div>
