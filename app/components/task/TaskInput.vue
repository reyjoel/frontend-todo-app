<script setup lang="ts">
import { ArrowUp } from 'lucide-vue-next'
const taskStore = useTaskStore()
const input = ref('')

const submit = async () => {
  if (!input.value.trim()) return
  await taskStore.createTask(input.value.trim())
  input.value = ''
}

const hasTasks = computed(() => taskStore.displayTasks.length > 0)

const placeholder = computed(() =>
  hasTasks.value ? 'Add another task...' : 'What do you want to accomplish today?'
)
</script>

<template>
  <div
    class="px-6 py-4 border-t border-cream-dark/60 bg-white/90 backdrop-blur-sm"
    :class="hasTasks ? 'sticky bottom-0' : 'relative'"
  >
    <div class="max-w-2xl mx-auto">
      <div class="flex items-center gap-3 bg-canvas border border-cream-dark rounded-2xl px-4 py-3 focus-within:border-amber-accent/60 focus-within:ring-2 focus-within:ring-amber-accent/15 transition-all shadow-soft">
        <input
          v-model="input"
          :placeholder="placeholder"
          @keyup.enter="submit"
          class="flex-1 bg-transparent outline-none text-sm text-ink placeholder-ink-muted/40 font-body"
        />
        <button
          @click="submit"
          :disabled="!input.trim()"
          class="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0"
          :class="input.trim()
            ? 'bg-ink text-white hover:bg-ink-soft shadow-sm'
            : 'bg-cream-dark text-ink-muted/40 cursor-not-allowed'"
        >
          <ArrowUp size="15" />
        </button>
      </div>
    </div>
  </div>
</template>
