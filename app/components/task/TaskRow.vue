<script setup lang="ts">
import { Check, Trash, GripVertical } from 'lucide-vue-next'
import type { Task } from '@/types/task'

const props = defineProps<{
  task: Task
  editingId: number | null
  editText: string
  draggable?: boolean
}>()

const emit = defineEmits<{
  toggle: [id: number]
  delete: [id: number]
  startEdit: [task: Task]
  saveEdit: [task: Task]
  cancelEdit: []
  'update:editText': [value: string]
}>()
</script>

<template>
  <div
    class="group flex items-center gap-3 px-4 py-3.5 border-b border-cream-dark/60 hover:bg-amber-light/40 transition-all duration-150 animate-fade-in"
  >
    <!-- DRAG HANDLE -->
    <div
      v-if="draggable"
      class="text-ink-muted/30 group-hover:text-ink-muted/60 transition cursor-grab active:cursor-grabbing shrink-0"
    >
      <GripVertical size="15" />
    </div>

    <!-- TOGGLE -->
    <button
      @click="emit('toggle', task.id)"
      class="shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200"
      :class="task.is_completed
        ? 'bg-task-done border-task-done text-white scale-105'
        : 'border-ink-muted/40 hover:border-amber-accent hover:scale-105'"
    >
      <Check v-if="task.is_completed" size="11" stroke-width="3" />
    </button>

    <!-- TEXT / EDIT -->
    <div class="flex-1 min-w-0">
      <input
        v-if="editingId === task.id"
        :value="editText"
        @input="emit('update:editText', ($event.target as HTMLInputElement).value)"
        @blur="emit('saveEdit', task)"
        @keyup.enter="emit('saveEdit', task)"
        @keyup.esc="emit('cancelEdit')"
        class="w-full bg-white border border-amber-accent/60 rounded-lg px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-amber-accent/30 font-body"
        autofocus
      />
      <span
        v-else
        @click="emit('startEdit', task)"
        class="cursor-text text-sm font-body leading-relaxed transition-all duration-150 block truncate"
        :class="task.is_completed
          ? 'line-through text-ink-muted/50'
          : 'text-ink hover:text-ink-soft'"
      >
        {{ task.statement }}
      </span>
    </div>

    <!-- DELETE -->
    <button
      @click="emit('delete', task.id)"
      class="shrink-0 opacity-0 group-hover:opacity-100 text-ink-muted/40 hover:text-task-delete transition-all duration-150 p-1 rounded-md hover:bg-task-deleteBg"
    >
      <Trash size="14" />
    </button>
  </div>
</template>
