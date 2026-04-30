<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const taskStore = useTaskStore()

onMounted(() => taskStore.fetchTasks())

const isEmpty = computed(
  () => !taskStore.loading && taskStore.displayTasks.length === 0 && !taskStore.search
)
</script>

<template>
  <div class="flex flex-col h-full">

    <!-- EMPTY STATE -->
    <Transition name="fade">
      <div
        v-if="isEmpty"
        class="flex-1 flex flex-col items-center justify-center px-8 pb-20 animate-fade-in"
      >
        <!-- Illustration -->
        <div class="relative mb-8">
          <div class="w-32 h-32 bg-amber-light rounded-3xl flex items-center justify-center shadow-soft">
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
              <!-- Notebook base -->
              <rect x="12" y="10" width="44" height="52" rx="6" fill="#E8E0D0" />
              <rect x="12" y="10" width="8" height="52" rx="4" fill="#D4C9B5" />
              <!-- Lines -->
              <rect x="28" y="24" width="20" height="2.5" rx="1.25" fill="#B8AC98" />
              <rect x="28" y="31" width="16" height="2.5" rx="1.25" fill="#B8AC98" />
              <rect x="28" y="38" width="18" height="2.5" rx="1.25" fill="#B8AC98" />
              <!-- Pencil -->
              <rect x="46" y="42" width="6" height="22" rx="3" transform="rotate(-35 46 42)" fill="#E8A838" />
              <path d="M53.5 57.5 L57 62 L51 61 Z" fill="#0F1117" />
              <!-- Star sparkle -->
              <circle cx="56" cy="18" r="3" fill="#E8A838" opacity="0.6" />
              <circle cx="14" cy="56" r="2" fill="#E8A838" opacity="0.4" />
            </svg>
          </div>
          <!-- Decorative dots -->
          <div class="absolute -top-2 -right-2 w-4 h-4 bg-amber-accent rounded-full opacity-50" />
          <div class="absolute -bottom-1 -left-3 w-3 h-3 bg-ink/10 rounded-full" />
        </div>

        <h2 class="font-display text-3xl text-ink mb-3 text-center">Getting Started</h2>
        <p class="text-ink-muted/60 text-sm font-body text-center max-w-xs leading-relaxed mb-2">
          Your day is a blank page. Add your first task below and start building momentum.
        </p>
        <p class="text-amber-accent/80 text-xs font-body font-medium tracking-wide uppercase">
          ↓ type below to begin
        </p>
      </div>
    </Transition>

    <!-- TASK LIST -->
    <div v-if="!isEmpty" class="flex-1 overflow-hidden flex flex-col">
      <TaskList />
    </div>

    <!-- INPUT (always visible) -->
    <TaskInput />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
