<script setup lang="ts">
definePageMeta({
  middleware: 'guest',
  layout: 'auth'
})

const auth = useAuthStore()

const email = ref('')
const password = ref('')

const login = async () => {
  await auth.login(email.value, password.value)
  navigateTo('/')
}

</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    
    <div class="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
      
      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <div class="w-8 h-8 border-4 border-black rotate-45"></div>
      </div>

      <!-- Title -->
      <h1 class="text-2xl font-bold text-center mb-2">Sign In</h1>
      <p class="text-sm text-gray-500 text-center mb-6">
        Login to continue using this app
      </p>

      <!-- Form -->
      <form @submit.prevent="login" class="space-y-4">

        <!-- Email -->
        <div>
          <label class="text-sm text-gray-600">Email</label>
          <input
            v-model="email"
            type="email"
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <!-- Password -->
        <div>
          <div class="flex justify-between items-center">
            <label class="text-sm text-gray-600">Password</label>
            <a href="#" class="text-xs text-gray-400 hover:text-black">
              Forgot your password?
            </a>
          </div>
          <input
            v-model="password"
            type="password"
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <!-- Button -->
        <button
          type="submit"
          class="w-full py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
        >
          Login
        </button>

      </form>

    </div>

  </div>
</template>