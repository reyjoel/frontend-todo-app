<template>
  <div class="h-screen flex bg-gray-100 rounded-2xl overflow-hidden">

    <!-- Sidebar -->
    <LayoutSidebar />

    <!-- Main -->
    <div class="flex-1 flex flex-col">
      <LayoutHeader />
      <div class="flex-1 p-10">
        <slot />
      </div>
    </div>

  </div>
</template>