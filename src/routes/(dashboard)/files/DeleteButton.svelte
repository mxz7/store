<script lang="ts">
  import { invalidate } from "$app/navigation";
  import { Trash } from "lucide-svelte";

  export let id: string;
  let loading = false;
  let modal: HTMLDialogElement;

  async function deleteImage() {
    modal.close();
    loading = true;
    const res = await fetch("/api/delete", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    if (res.status === 200) {
      invalidate("file_uploads");
      loading = false;
    }
  }
</script>

<dialog class="modal" bind:this={modal}>
  <div class="modal-box">
    <h3 class="text-center text-lg font-bold">Delete {id}?</h3>

    <div class="mt-4 flex w-full justify-center gap-2">
      <button class="btn btn-error" on:click={deleteImage}>Delete</button>
      <button class="btn" on:click={() => modal.close()}>Cancel</button>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop backdrop-blur-lg">
    <button>close</button>
  </form>
</dialog>

<button
  class="btn btn-ghost tooltip tooltip-top tooltip-error text-error"
  data-tip="delete"
  on:click={() => modal.show()}
>
  {#if loading}
    <span class="loading loading-spinner loading-xs text-error" />
  {:else}
    <Trash size={16} strokeWidth={2.5} />
  {/if}
</button>
