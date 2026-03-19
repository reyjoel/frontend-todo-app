<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const taskStore = useTaskStore()

onMounted(() => taskStore.fetchTasks())
</script>

<template>
  <div>
    <div class="flex-1 overflow-auto flex flex-col justify-center">
      <TaskList />
    </div>

    <TaskInput />
  </div>
</template>