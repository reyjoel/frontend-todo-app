<template>
  <div class="h-screen flex bg-canvas overflow-hidden font-body">
    <LayoutSidebar />
    <div class="flex-1 flex flex-col min-w-0">
      <LayoutHeader />
      <div class="flex-1 overflow-auto scrollbar-thin">
        <slot />
      </div>
    </div>
  </div>
</template>
