<script lang="ts">
  import { ArrowLeft, ArrowRight } from "lucide-svelte";

  export let currentPage: number;
  export let lastPage: number;
  export let route: string;
</script>

<div class="mt-2 flex w-full justify-center">
  <div class="join grid grid-cols-3">
    <a
      class="btn btn-ghost join-item {currentPage === 1 ? 'btn-disabled' : ''}"
      href="{route}?page={currentPage - 1 < 1 ? 1 : currentPage - 1}"
    >
      <ArrowLeft />
    </a>
    <span class="btn btn-ghost join-item">{currentPage}</span>
    <a
      class="btn btn-ghost join-item {currentPage === lastPage ? 'btn-disabled' : ''}"
      href="{route}?page={currentPage + 1 > lastPage ? lastPage : currentPage + 1}"
    >
      <ArrowRight />
    </a>
  </div>
</div>
