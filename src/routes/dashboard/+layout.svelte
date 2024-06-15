<div class="flex w-full justify-center">
  <div class="drawer w-full p-3 pl-0 lg:drawer-open lg:max-w-6xl">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />

    <div class="drawer-side rounded-lg lg:h-fit">
      <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
        <!-- Sidebar content here -->
        <li><a>Sidebar Item 1</a></li>
        <li><a>Sidebar Item 2</a></li>
      </ul>
    </div>

    <div class="drawer-content pl-3">
      <slot />
    </div>
  </div>
</div>
