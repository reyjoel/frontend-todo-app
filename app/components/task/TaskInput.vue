<script setup lang="ts">
import { MoveUp } from 'lucide-vue-next'
const taskStore = useTaskStore()
const input = ref('')

const submit = async () => {
  if (!input.value) return
  await taskStore.createTask(input.value)
  input.value = ''
}

const hasTasks = computed(() =>
  taskStore.displayTasks.length > 0
)

const placeholder = computed(() =>
  hasTasks.value
    ? 'What else do you need to do?'
    : 'Write the task you plan to do today here...'
)
</script>

<template>

  <h1 v-if="taskStore.displayTasks.length === 0" class="text-3xl font-bold mb-6 text-center">
    What do you have in mind?
  </h1>
  <div
    :class="[
      'w-full p-3 z-50',
      hasTasks 
        ? 'fixed bottom-0 left-0'
        : 'relative'
    ]"
  >
    <div class="max-w-3xl mx-auto relative flex gap-2">
      <input
        v-model="input"
        :placeholder="placeholder"
        class="w-full border rounded-xl p-4 pr-12" 
      />

      <button
        @click="submit"
        class="absolute right-3 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-full"
      >
        <MoveUp size="16"/>
      </button>

    </div>
  </div>
</template>