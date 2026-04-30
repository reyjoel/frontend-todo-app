<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [date: string]; close: [] }>()

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

const toLocalDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d)
}

const toDateStr = (date: Date): string => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const todayStr = toDateStr(new Date())

const viewing = ref(toLocalDate(props.modelValue))

const viewYear = computed(() => viewing.value.getFullYear())
const viewMonth = computed(() => viewing.value.getMonth())

const prevMonth = () => {
  viewing.value = new Date(viewYear.value, viewMonth.value - 1, 1)
}
const nextMonth = () => {
  viewing.value = new Date(viewYear.value, viewMonth.value + 1, 1)
}
const goToCurrentMonth = () => {
  viewing.value = new Date()
}

const calendarDays = computed(() => {
  const firstDay = new Date(viewYear.value, viewMonth.value, 1).getDay()
  const daysInMonth = new Date(viewYear.value, viewMonth.value + 1, 0).getDate()
  const daysInPrev = new Date(viewYear.value, viewMonth.value, 0).getDate()

  const cells: { date: string; current: boolean }[] = []

  // leading days from previous month
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = new Date(viewYear.value, viewMonth.value - 1, daysInPrev - i)
    cells.push({ date: toDateStr(d), current: false })
  }

  // current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: toDateStr(new Date(viewYear.value, viewMonth.value, d)), current: true })
  }

  // trailing days to fill last row
  const remaining = 42 - cells.length
  for (let d = 1; d <= remaining; d++) {
    cells.push({ date: toDateStr(new Date(viewYear.value, viewMonth.value + 1, d)), current: false })
  }

  return cells
})

const select = (dateStr: string) => {
  emit('update:modelValue', dateStr)
  emit('close')
}

// close on outside click
const pickerEl = ref<HTMLElement | null>(null)
const onClickOutside = (e: MouseEvent) => {
  if (pickerEl.value && !pickerEl.value.contains(e.target as Node)) {
    emit('close')
  }
}
onMounted(() => document.addEventListener('mousedown', onClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', onClickOutside))
</script>

<template>
  <div
    ref="pickerEl"
    class="absolute left-4 right-4 z-50 mt-2 bg-ink-soft border border-white/10 rounded-2xl shadow-card overflow-hidden"
  >
    <!-- Month nav -->
    <div class="flex items-center justify-between px-4 pt-4 pb-2">
      <button
        @click="prevMonth"
        class="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-cream/50 hover:text-white transition"
      >
        <ChevronLeft size="14" />
      </button>

      <button
        @click="goToCurrentMonth"
        class="text-sm font-medium text-white hover:text-amber-accent transition"
      >
        {{ MONTHS[viewMonth] }} {{ viewYear }}
      </button>

      <button
        @click="nextMonth"
        class="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-cream/50 hover:text-white transition"
      >
        <ChevronRight size="14" />
      </button>
    </div>

    <!-- Day headers -->
    <div class="grid grid-cols-7 px-3 pb-1">
      <div
        v-for="day in DAYS"
        :key="day"
        class="text-center text-[10px] font-medium text-cream/30 uppercase tracking-wider py-1"
      >
        {{ day }}
      </div>
    </div>

    <!-- Day grid -->
    <div class="grid grid-cols-7 px-3 pb-4 gap-y-0.5">
      <button
        v-for="cell in calendarDays"
        :key="cell.date"
        @click="select(cell.date)"
        class="h-7 w-full rounded-lg text-xs font-body flex items-center justify-center transition-all duration-100"
        :class="[
          cell.date === modelValue
            ? 'bg-amber-accent text-ink font-semibold scale-105 shadow-sm'
            : cell.date === todayStr
              ? 'ring-1 ring-amber-accent/60 text-amber-accent font-medium hover:bg-white/10'
              : cell.current
                ? 'text-cream/80 hover:bg-white/10 hover:text-white'
                : 'text-cream/20 hover:bg-white/5 hover:text-cream/50'
        ]"
      >
        {{ new Date(cell.date + 'T00:00:00').getDate() }}
      </button>
    </div>
  </div>
</template>
