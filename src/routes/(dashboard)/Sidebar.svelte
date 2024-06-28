<script lang="ts">
  import { page } from "$app/stores";
  import { auth } from "$lib/stores";
  import { Files, LogOut, ShieldCheck, Upload, UserSearch } from "lucide-svelte";
</script>

<div class="drawer-side rounded-lg lg:h-fit">
  <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
  <ul class="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
    <li>
      <a
        href="/files"
        class="{$page.url.pathname === '/files'
          ? 'font-semibold text-secondary'
          : ''} flex items-center"
      >
        <Files size={16} strokeWidth={2.5} />
        <span>Files</span>
      </a>
    </li>

    <li>
      <a
        href="/upload"
        class="{$page.url.pathname === '/upload'
          ? 'font-semibold text-secondary'
          : ''} flex items-center"
      >
        <Upload size={16} strokeWidth={2.5} />
        <span>Upload</span>
      </a>
    </li>

    {#if $auth && $auth.authenticated && $auth}
      <ul class="ml-2">
        <li>
          <h2 class="-ml-1 font-semibold">
            <ShieldCheck size={16} strokeWidth={2.5} />
            <span>Admin</span>
          </h2>
        </li>

        <li>
          <a
            href="/users"
            class="{$page.url.pathname.startsWith('/users')
              ? 'font-semibold text-secondary'
              : ''} flex items-center"
          >
            <UserSearch size={16} strokeWidth={2.5} />
            <span>Users</span>
          </a>
        </li>
      </ul>
    {/if}

    <li>
      <a href="/logout" class="flex items-center">
        <LogOut size={16} strokeWidth={2.5} />
        <span>Log out</span>
      </a>
    </li>
  </ul>
</div>
