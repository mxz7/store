<script lang="ts">
  import { CloudUpload } from "lucide-svelte";
  import { writable } from "svelte/store";
  import type { FileData } from "./file";
  import FileStatus from "./FileStatus.svelte";

  let formFiles = writable<FileList>();
  let files: FileData[] = [];

  async function handleFile(file: File) {
    const type = file.type;
    const size = file.size;

    console.log(type, size);

    files = [
      ...files,
      {
        status: "processing",
        progress: 0,
        name: file.name,
        type,
        size,
      },
    ];
  }

  formFiles.subscribe((files) => {
    if (!files) return;

    for (const file of files) {
      handleFile(file);
    }
  });

  function handleDrop(event: DragEvent) {
    event.preventDefault();

    const files = event.dataTransfer?.files;

    if (!files) return;

    console.log(files);

    for (const file of files) {
      handleFile(file);
    }
  }
</script>

<label
  class="flex h-fit w-full cursor-pointer items-center justify-center rounded-lg border border-accent border-opacity-15 bg-base-300 p-4 duration-200 hover:border-opacity-25"
  for="file"
  on:drop={handleDrop}
  on:dragover={(e) => e.preventDefault()}
>
  <input type="file" name="file" id="file" multiple hidden bind:files={$formFiles} />
  <div class="flex flex-col gap-2 text-center">
    <div class="flex w-full justify-center">
      <CloudUpload class="text-primary" />
    </div>
    <h1 class="text-lg font-semibold">Click or drag and drop to upload</h1>
    <p class="text-sm">Max: 1GB per file</p>
  </div>
</label>

<div class="mt-14 grid w-full grid-cols-1 gap-4 px-4">
  {#each files as file}
    <FileStatus data={file} />
  {/each}
</div>
