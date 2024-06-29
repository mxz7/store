<script lang="ts">
  import { invalidate } from "$app/navigation";
  import Pages from "$lib/components/Pages.svelte";
  import { formatBytes } from "$lib/format.js";
  import dayjs from "dayjs";
  import { Pen } from "lucide-svelte";
  import { superForm } from "sveltekit-superforms";
  import DeleteButton from "./DeleteButton.svelte";

  export let data;

  let renameModal: HTMLDialogElement;

  const { form, enhance, errors, constraints, delayed } = superForm(data.form, {
    delayMs: 250,
    onResult(event) {
      renameModal.close();
      invalidate("file_uploads");
    },
    invalidateAll: false,
  });
</script>

<svelte:head>
  <title>uploads :: files.maxz.dev</title>
</svelte:head>

<dialog class="modal" bind:this={renameModal}>
  <div class="modal-box">
    <h3 class="text-lg font-bold">Rename {$form.id}</h3>
    <form action="?/rename" method="POST" class="form-control mt-2 gap-4" use:enhance>
      <input
        type="text"
        name="id"
        id="id"
        class="hidden"
        bind:value={$form.id}
        {...$constraints.id}
      />
      {#if $errors.id}
        <p class="text-error">{$errors.id}</p>
      {/if}
      <input
        type="text"
        name="label"
        id="label"
        class="input input-bordered input-primary"
        bind:value={$form.label}
        {...$constraints.label}
      />
      {#if $errors.label}
        <p class="text-error">{$errors.label}</p>
      {/if}
      <button class="btn btn-secondary">Submit</button>
    </form>
  </div>
  <form method="dialog" class="modal-backdrop backdrop-blur-lg">
    <button>close</button>
  </form>
</dialog>

<div class="overflow-x-auto overflow-y-hidden">
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        <th>File</th>
        <th>Size</th>
        <th>Uploaded At</th>
        <th>Expires At</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {#each data.files as file}
        <tr>
          <td class="w-fit">
            <div
              class="flex w-fit max-w-52 items-center gap-3 overflow-hidden text-ellipsis text-nowrap"
            >
              {#if file.id.endsWith("png") || file.id.endsWith("jpeg") || file.id.endsWith("jpg") || file.id.endsWith("webp") || file.id.endsWith("avif") || file.id.endsWith("gif")}
                <div class="avatar">
                  <div class="mask mask-squircle h-12 w-12">
                    <img src="https://cdn.maxz.dev/{file.id}" alt={file.label} loading="lazy" />
                  </div>
                </div>
              {/if}
              <div>
                {#if file.label}
                  <a
                    href="https://cdn.maxz.dev/{file.id}"
                    target="_blank"
                    class="link-hover overflow-hidden text-ellipsis text-nowrap font-bold"
                  >
                    {file.label}
                  </a>
                {:else}
                  <a
                    href="https://cdn.maxz.dev/{file.id}"
                    target="_blank"
                    class="link-hover font-semibold opacity-50">{file.id}</a
                  >
                {/if}
              </div>
            </div>
          </td>
          <td>
            {formatBytes(file.bytes)}
          </td>
          <td class="text-xs">{dayjs(file.createdAt).format("YYYY-MM-DD")}</td>
          <td class="text-xs">
            {dayjs(file.expireAt).format("YYYY-MM-DD")}
          </td>
          <td class="flex items-center gap-1">
            <button
              class="btn btn-ghost tooltip tooltip-top"
              data-tip="rename"
              on:click={() => {
                $form.id = file.id;
                $form.label = file.label;
                renameModal.showModal();
              }}
            >
              <Pen size={16} strokeWidth={2.5} />
            </button>

            <DeleteButton id={file.id} />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <Pages currentPage={data.page} lastPage={data.lastPage} route="/files" />
</div>
