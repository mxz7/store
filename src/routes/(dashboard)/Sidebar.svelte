<script lang="ts">
  import { page } from "$app/stores";
  import { Code, Files, Settings } from "lucide-svelte";
</script>

<div class="drawer-side rounded-lg lg:h-fit">
  <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
  <ul class="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
    <li>
      <a
        href="/dashboard"
        class="{$page.url.pathname === '/dashboard'
          ? 'font-semibold text-secondary'
          : ''} flex items-center"
      >
        <Files size={16} strokeWidth={2.5} />
        <span>Files</span>
      </a>
    </li>

    <li>
      <a
        href="/settings"
        class="{$page.url.pathname === '/settings'
          ? 'font-semibold text-secondary'
          : ''} flex items-center"
      >
        <Settings size={16} strokeWidth={2.5} />
        <span>Settings</span>
      </a>
    </li>

    <li>
      <a
        href="/settings/key"
        class="{$page.url.pathname === '/settings/key'
          ? 'font-semibold text-secondary'
          : ''} flex items-center"
      >
        <Code size={16} strokeWidth={2.5} />
        <span>API Key</span>
      </a>
    </li>
  </ul>
</div>
