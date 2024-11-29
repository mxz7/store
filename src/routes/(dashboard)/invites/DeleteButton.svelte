<script lang="ts">
  import { invalidate } from "$app/navigation";
  import { Trash } from "lucide-svelte";

  interface Props {
    id: string;
  }

  let { id }: Props = $props();
  let loading = $state(false);

  async function onClick() {
    if (loading) return;
    loading = true;

    await fetch("api/deleteinvite", { method: "DELETE", body: JSON.stringify({ invite: id }) });

    invalidate("invites");
  }
</script>

<button onclick={onClick} class="btn btn-ghost tooltip tooltip-error" data-tip="Delete token">
  {#if loading}
    <span class="loading loading-spinner text-error"></span>
  {:else}
    <Trash size={16} class="text-error" />
  {/if}
</button>
