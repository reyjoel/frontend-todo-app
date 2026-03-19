<script setup lang="ts">
import { getLocalDate } from '@/utils/date'
import { ArrowBigLeft, ArrowBigRight } from 'lucide-vue-next'

const taskStore = useTaskStore()

const changeDate = (offset: number) => {
  const current = new Date(taskStore.selectedDate)
  current.setDate(current.getDate() + offset)

  const year = current.getFullYear()
  const month = String(current.getMonth() + 1).padStart(2, '0')
  const day = String(current.getDate()).padStart(2, '0')

  const newDate = `${year}-${month}-${day}`

  taskStore.changeDate(newDate)
}

const goToday = () => {
  taskStore.changeDate(getLocalDate())
}

const formattedDate = computed(() => {
  const date = new Date(taskStore.selectedDate)

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  })
})
</script>

<template>
  <div class="w-64 bg-white p-4 border-r flex flex-col gap-6">

    <!-- HEADER -->
    <div class="text-lg font-semibold">
      🧠 Tasks
    </div>

    <!-- DATE NAV -->
    <div class="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2">

      <button
        @click="changeDate(-1)"
        class="hover:bg-gray-300 p-1 rounded transition"
      >
        <ArrowBigLeft size="14" />
      </button>

      <div class="text-sm font-medium text-gray-700">
        {{ formattedDate }}
      </div>

      <button
        @click="changeDate(1)"
        class="hover:bg-gray-300 p-1 rounded transition"
      >
        <ArrowBigRight size="14" />
      </button>

    </div>

    <!-- TODAY BUTTON -->
    <button
      @click="goToday"
      class="text-sm text-blue-600 hover:underline text-left"
    >
      Go to Today
    </button>

  </div>
</template>