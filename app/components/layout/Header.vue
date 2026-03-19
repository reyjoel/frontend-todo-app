<script setup lang="ts">
import { ref } from 'vue'
import { Search } from 'lucide-vue-next'
const auth = useAuthStore()
const taskStore = useTaskStore()

const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const logout = async () => {
  showMenu.value = false
  await auth.logout()
}
</script>

<template>
  <div class="flex items-center justify-between p-4 border-b bg-white">

    <div class="flex items-center gap-2 border px-3 py-1 rounded-full w-80">
      <Search size="16" />
      <input
        v-model="taskStore.search" 
        placeholder="Search tasks..."
        class="outline-none w-full"
      />
    </div>

    <div class="relative">
      <!-- Avatar -->
      <div
        class="w-8 h-8 bg-gray-300 rounded-full cursor-pointer"
        @click="toggleMenu"
      />

      <!-- Dropdown -->
      <div
        v-if="showMenu"
        class="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-md"
      >
        <button
          @click="logout"
          class="w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </div>
    
  </div>
</template>