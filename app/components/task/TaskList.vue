<script setup lang="ts">
import { ref, onMounted, watch, defineAsyncComponent } from 'vue'
import type { Task } from '@/types/task'

const Draggable = defineAsyncComponent(() => import('vuedraggable'))

const taskStore = useTaskStore()

const editingId = ref<number | null>(null)
const editText = ref('')

onMounted(() => {
  taskStore.fetchTasks()
})

const startEdit = (task: Task) => {
  editingId.value = task.id
  editText.value = task.statement
}

const cancelEdit = () => {
  editingId.value = null
  editText.value = ''
}

const saveEdit = async (task: Task) => {
  if (!editText.value.trim()) return
  await taskStore.updateTask(task.id, editText.value.trim())
  cancelEdit()
}

const confirmDelete = (id: number) => {
  if (confirm('Are you sure you want to delete this task?')) {
    taskStore.deleteTask(id)
  }
}

const onDragEnd = () => {
  if (!taskStore.search) {
    taskStore.reorderTasks(taskStore.tasks)
  }
}

let timer: ReturnType<typeof setTimeout>

watch(
  () => taskStore.search,
  (val) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      if (val) taskStore.fetchTasks()
    }, 300)
  }
)
</script>

<template>
  <div class="flex flex-col h-full">

    <!-- LOADING -->
    <div v-if="taskStore.loading" class="flex-1 flex items-center justify-center">
      <div class="w-6 h-6 border-2 border-amber-accent border-t-transparent rounded-full animate-spin" />
    </div>

    <template v-else>
      <!-- DRAG MODE -->
      <client-only>
        <Draggable
          v-if="!taskStore.search"
          v-model="taskStore.tasks"
          item-key="id"
          ghost-class="opacity-30"
          @end="onDragEnd"
          class="flex-1 overflow-auto"
        >
          <template #item="{ element: task }">
            <TaskRow
              :task="task"
              :editing-id="editingId"
              :edit-text="editText"
              :draggable="true"
              @toggle="taskStore.toggleTask"
              @delete="confirmDelete"
              @start-edit="startEdit"
              @save-edit="saveEdit"
              @cancel-edit="cancelEdit"
              @update:edit-text="editText = $event"
            />
          </template>
        </Draggable>
      </client-only>

      <!-- SEARCH MODE -->
      <div v-if="taskStore.search" class="flex-1 overflow-auto">
        <TaskRow
          v-for="task in taskStore.displayTasks"
          :key="task.id"
          :task="task"
          :editing-id="editingId"
          :edit-text="editText"
          :draggable="false"
          @toggle="taskStore.toggleTask"
          @delete="confirmDelete"
          @start-edit="startEdit"
          @save-edit="saveEdit"
          @cancel-edit="cancelEdit"
          @update:edit-text="editText = $event"
        />

        <div
          v-if="taskStore.displayTasks.length === 0"
          class="flex flex-col items-center justify-center py-16 text-ink-muted/50 font-body"
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" class="mb-3 opacity-40">
            <circle cx="20" cy="20" r="14" stroke="currentColor" stroke-width="2.5"/>
            <path d="M30 30L42 42" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
          <p class="text-sm">No results for "<span class="text-ink-soft font-medium">{{ taskStore.search }}</span>"</p>
        </div>
      </div>
    </template>

  </div>
</template>
