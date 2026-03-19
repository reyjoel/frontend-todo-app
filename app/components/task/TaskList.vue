<script setup lang="ts">
import { ref, onMounted, watch, defineAsyncComponent } from 'vue'
import { Trash, Check } from 'lucide-vue-next'

const Draggable = defineAsyncComponent(() => import('vuedraggable'))

const taskStore = useTaskStore()

const editingId = ref<number | null>(null)
const editText = ref('')

onMounted(() => {
  taskStore.fetchTasks()
})

// Start Edit
const startEdit = (task: any) => {
  editingId.value = task.id
  editText.value = task.statement
}

// Cancel Edit
const cancelEdit = () => {
  editingId.value = null
  editText.value = ''
}

// Save Edit
const saveEdit = async (task: any) => {
  if (!editText.value.trim()) return

  await taskStore.updateTask(task.id, editText.value.trim())
  cancelEdit()
}

// Delete
const confirmDelete = (id: number) => {
  if (confirm('Are you sure you want to delete this task?')) {
    taskStore.deleteTask(id)
  }
}

// Toggle
const toggleTask = async (id: number) => {
  await taskStore.toggleTask(id)
}

// Drag
const onDragEnd = () => {
  if (!taskStore.search) {
    taskStore.reorderTasks(taskStore.tasks)
  }
}

// SEARCH
let timer: any

watch(
  () => taskStore.search,
  (val) => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      if (val) {
        taskStore.fetchAllTasks()
      }
    }, 300)
  }
)
</script>

<template>
  <div class="flex flex-col h-full">

    <client-only>
      <Draggable
        v-if="!taskStore.search"
        v-model="taskStore.tasks"
        item-key="id"
        ghost-class="opacity-50"
        @end="onDragEnd"
        class="flex-1 overflow-auto"
      >
        <template #item="{ element: task }">
          <div
            class="flex items-center justify-between p-3 border-b group hover:bg-gray-50 transition"
          >

            <!-- LEFT -->
            <div class="flex items-center gap-2 flex-1">

              <!-- TOGGLE -->
              <button
                @click="toggleTask(task.id)"
                class="w-5 h-5 flex items-center justify-center border rounded"
                :class="task.is_completed ? 'bg-green-500 text-white' : ''"
              >
                <Check size="14" />
              </button>

              <!-- EDIT -->
              <div class="flex-1">
                <input
                  v-if="editingId === task.id"
                  v-model="editText"
                  @blur="saveEdit(task)"
                  @keyup.enter="saveEdit(task)"
                  @keyup.esc="cancelEdit"
                  class="w-full border p-1 rounded"
                />

                <span
                  v-else
                  @click="startEdit(task)"
                  class="cursor-pointer"
                  :class="task.is_completed
                    ? 'line-through text-gray-400'
                    : 'text-gray-800'"
                >
                  {{ task.statement }}
                </span>
              </div>
            </div>

            <!-- ACTIONS -->
            <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <button
                @click="confirmDelete(task.id)"
                class="text-red-500 hover:text-red-700"
              >
                <Trash size="16" />
              </button>
            </div>

          </div>
        </template>
      </Draggable>
    </client-only>

    <!-- 🔍 SEARCH MODE (SAME UI, NO DRAG) -->
    <div
      v-if="taskStore.search"
      class="flex-1 overflow-auto"
    >
      <div
        v-for="task in taskStore.displayTasks"
        :key="task.id"
        class="flex items-center justify-between p-3 border-b group hover:bg-gray-50 transition"
      >

        <!-- SAME CONTENT -->
        <div class="flex items-center gap-2 flex-1">

          <button
            @click="toggleTask(task.id)"
            class="w-5 h-5 flex items-center justify-center border rounded"
            :class="task.is_completed ? 'bg-green-500 text-white' : ''"
          >
            <Check size="14" />
          </button>

          <div class="flex-1">
            <input
              v-if="editingId === task.id"
              v-model="editText"
              @blur="saveEdit(task)"
              @keyup.enter="saveEdit(task)"
              @keyup.esc="cancelEdit"
              class="w-full border p-1 rounded"
            />

            <span
              v-else
              @click="startEdit(task)"
              class="cursor-pointer"
              :class="task.is_completed
                ? 'line-through text-gray-400'
                : 'text-gray-800'"
            >
              {{ task.statement }}
            </span>
          </div>
        </div>

        <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button
            @click="confirmDelete(task.id)"
            class="text-red-500 hover:text-red-700"
          >
            <Trash size="16" />
          </button>
        </div>

      </div>
    </div>

    <div
      v-if="taskStore.displayTasks.length === 0 && taskStore.search"
      class="text-center text-gray-400 mt-10"
    >
      No results found
    </div>

  </div>
</template>