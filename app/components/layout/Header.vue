<script setup lang="ts">
import { ref } from 'vue'
import { Search, LogOut, User } from 'lucide-vue-next'
const auth = useAuthStore()
const taskStore = useTaskStore()

const showMenu = ref(false)

const toggleMenu = () => { showMenu.value = !showMenu.value }

const logout = async () => {
  showMenu.value = false
  await auth.logout()
}
</script>

<template>
  <header class="flex items-center justify-between px-6 py-3.5 border-b border-cream-dark/70 bg-white/80 backdrop-blur-sm shrink-0">

    <!-- SEARCH -->
    <div
      class="flex items-center gap-2.5 bg-canvas border border-cream-dark rounded-xl px-4 py-2 w-80 focus-within:border-amber-accent/60 focus-within:ring-2 focus-within:ring-amber-accent/15 transition-all"
    >
      <Search size="15" class="text-ink-muted/50 shrink-0" />
      <input
        v-model="taskStore.search"
        placeholder="Search tasks..."
        class="bg-transparent outline-none w-full text-sm text-ink placeholder-ink-muted/40 font-body"
      />
    </div>

    <!-- AVATAR MENU -->
    <div class="relative">
      <button
        @click="toggleMenu"
        class="w-8 h-8 rounded-full bg-ink flex items-center justify-center text-cream/80 hover:bg-ink-soft transition"
      >
        <User size="15" />
      </button>

      <Transition name="dropdown">
        <div
          v-if="showMenu"
          class="absolute right-0 mt-2 w-36 bg-white border border-cream-dark rounded-xl shadow-card overflow-hidden z-50"
        >
          <button
            @click="logout"
            class="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink hover:bg-canvas transition font-body"
          >
            <LogOut size="14" class="text-ink-muted" />
            Sign out
          </button>
        </div>
      </Transition>
    </div>

  </header>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.97);
}
</style>
