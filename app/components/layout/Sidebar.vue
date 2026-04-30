<script setup lang="ts">
import { getLocalDate } from '@/utils/date'
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-vue-next'

const taskStore = useTaskStore()

const showCalendar = ref(false)

const changeDate = (offset: number) => {
  const current = new Date(taskStore.selectedDate)
  current.setDate(current.getDate() + offset)
  const year = current.getFullYear()
  const month = String(current.getMonth() + 1).padStart(2, '0')
  const day = String(current.getDate()).padStart(2, '0')
  taskStore.changeDate(`${year}-${month}-${day}`)
}

const goToday = () => taskStore.changeDate(getLocalDate())

const isToday = computed(() => taskStore.selectedDate === getLocalDate())

const formattedWeekday = computed(() =>
  new Date(taskStore.selectedDate).toLocaleDateString('en-US', { weekday: 'long' })
)

const formattedDate = computed(() =>
  new Date(taskStore.selectedDate).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  })
)

const taskCount = computed(() => taskStore.tasks.length)
const doneCount = computed(() => taskStore.tasks.filter(t => t.is_completed).length)
const progress = computed(() => taskCount.value > 0 ? Math.round((doneCount.value / taskCount.value) * 100) : 0)

const onPickerSelect = (date: string) => {
  taskStore.changeDate(date)
  showCalendar.value = false
}
</script>

<template>
  <aside class="w-64 shrink-0 bg-ink flex flex-col h-full text-cream/90 font-body">

    <!-- BRAND -->
    <div class="px-6 pt-7 pb-5 border-b border-white/[0.07]">
      <div class="flex items-center gap-2.5">
        <div class="w-7 h-7 bg-amber-accent rounded-lg flex items-center justify-center shrink-0">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 4h10M2 7h7M2 10h5" stroke="#0F1117" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </div>
        <span class="font-display text-lg text-white tracking-tight">Taskr</span>
      </div>
    </div>

    <!-- DATE NAV -->
    <div class="px-5 py-5 border-b border-white/[0.07]">

      <!-- Prev / Date button / Next -->
      <div class="flex items-center justify-between">
        <button
          @click="changeDate(-1)"
          class="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center transition text-cream/60 hover:text-white"
        >
          <ChevronLeft size="15" />
        </button>

        <!-- Clickable date — opens calendar -->
        <button
          @click="showCalendar = !showCalendar"
          class="flex flex-col items-center gap-0.5 group px-2 py-1 rounded-xl hover:bg-white/[0.06] transition"
        >
          <p class="text-[10px] text-cream/40 font-medium uppercase tracking-widest group-hover:text-cream/60 transition">
            {{ formattedWeekday }}
          </p>
          <div class="flex items-center gap-1.5">
            <p class="text-sm text-white font-medium">{{ formattedDate }}</p>
            <CalendarDays
              size="12"
              class="text-amber-accent/70 group-hover:text-amber-accent transition"
            />
          </div>
        </button>

        <button
          @click="changeDate(1)"
          class="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center transition text-cream/60 hover:text-white"
        >
          <ChevronRight size="15" />
        </button>
      </div>

      <!-- Calendar popup -->
      <div class="relative">
        <Transition name="calendar">
          <UiCalendarPicker
            v-if="showCalendar"
            :model-value="taskStore.selectedDate"
            @update:model-value="onPickerSelect"
            @close="showCalendar = false"
          />
        </Transition>
      </div>

      <!-- Today button -->
      <button
        v-if="!isToday"
        @click="goToday"
        class="mt-3 w-full flex items-center justify-center gap-1.5 text-xs text-amber-accent hover:text-amber-light border border-amber-accent/30 hover:border-amber-accent/60 rounded-lg py-1.5 transition"
      >
        <CalendarDays size="12" />
        Back to today
      </button>
      <div
        v-else
        class="mt-3 w-full flex items-center justify-center gap-1.5 text-xs text-cream/30 border border-white/[0.06] rounded-lg py-1.5"
      >
        <CalendarDays size="12" />
        Today
      </div>
    </div>

    <!-- PROGRESS -->
    <div class="px-5 py-6 border-b border-white/[0.07]">
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs text-cream/40 uppercase tracking-widest font-medium">Progress</span>
        <span class="text-xs text-cream/60 font-medium">{{ doneCount }}/{{ taskCount }}</span>
      </div>
      <div class="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
        <div
          class="h-full bg-amber-accent rounded-full transition-all duration-500"
          :style="{ width: `${progress}%` }"
        />
      </div>
      <p class="text-xs text-cream/30 mt-2">{{ progress }}% complete</p>
    </div>

    <!-- SPACER -->
    <div class="flex-1" />

    <!-- FOOTER -->
    <div class="px-5 py-5 border-t border-white/[0.07]">
      <p class="text-xs text-cream/20 font-body">Built with focus in mind.</p>
    </div>

  </aside>
</template>

<style scoped>
.calendar-enter-active,
.calendar-leave-active {
  transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}
.calendar-enter-from,
.calendar-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}
</style>
