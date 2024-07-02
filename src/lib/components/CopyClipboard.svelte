<script lang="ts">
  import { onMount } from "svelte";

  export let text: string;
  let textArea: HTMLTextAreaElement;

  onMount(() => {
    textArea.select();
    document.execCommand("copy");
  });
</script>

<textarea bind:this={textArea} bind:value={text}></textarea>
