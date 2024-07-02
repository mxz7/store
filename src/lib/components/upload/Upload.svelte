<script lang="ts">
  import { nanoid } from "$lib/nanoid";
  import { CloudUpload } from "lucide-svelte";
  import { cubicOut } from "svelte/easing";
  import { tweened } from "svelte/motion";
  import { writable } from "svelte/store";
  import type { FileData } from "./file";
  import FileStatus from "./FileStatus.svelte";

  let formFiles = writable<FileList>();
  let files: FileData[] = [];
  let expireIn: number = 31556952000;

  async function handleFile(file: File) {
    const type = file.type;
    const size = file.size;

    console.log(type, size);

    const id = nanoid();

    files = [
      ...files,
      {
        id,
        status: "processing",
        progress: tweened(0, { easing: cubicOut }),
        name: file.name,
        type,
        size,
      },
    ];

    const index = files.findIndex((i) => i.id === id);

    const presigned = await fetch("/api/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({ type, size, label: file.name, expire: expireIn }),
    });

    if (presigned.status !== 200) {
      files[index].status = "error";
      console.error(presigned);
      return;
    }

    files[index].progress.set(60, { duration: 10000 });

    const { url, id: uploadedID } = await presigned.json();

    const uploadRes = await fetch(url, { method: "PUT", body: file });

    if (uploadRes.status === 200) {
      files[index].status = "done";
      files[index].progress.set(100, { duration: 2000 });
      files[index].uploadedId = uploadedID;
    } else {
      console.error(uploadRes);
      files[index].status = "error";
    }
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

<svelte:head>
  <title>upload :: files.maxz.dev</title>
</svelte:head>

<h2 class="pb-2 font-semibold">Expire in:</h2>
<div class="flex w-full gap-4 pb-4">
  <input
    type="radio"
    name="expire"
    class="btn"
    aria-label="1 hour"
    value={3600000}
    bind:group={expireIn}
  />
  <input
    type="radio"
    name="expire"
    class="btn"
    aria-label="1 day"
    value={86400000}
    bind:group={expireIn}
  />
  <input
    type="radio"
    name="expire"
    class="btn"
    aria-label="1 week"
    value={604800000}
    bind:group={expireIn}
  />
  <input
    type="radio"
    name="expire"
    class="btn"
    aria-label="1 month"
    value={2629746000}
    bind:group={expireIn}
  />
  <input
    type="radio"
    name="expire"
    class="btn"
    aria-label="1 year"
    value={31556952000}
    bind:group={expireIn}
  />
</div>

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
