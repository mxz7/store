<script lang="ts">
  import { onMount } from "svelte";

  interface Props {
    text: string;
  }

  let { text = $bindable() }: Props = $props();
  let textArea: HTMLTextAreaElement = $state();

  onMount(() => {
    textArea.select();
    document.execCommand("copy");
  });
</script>

<textarea bind:this={textArea} bind:value={text}></textarea>
