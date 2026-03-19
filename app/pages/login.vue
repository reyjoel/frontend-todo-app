<script setup lang="ts">
definePageMeta({
  middleware: 'guest',
  layout: 'auth'
})

const auth = useAuthStore()

const email = ref('')
const password = ref('')

const submit = async () => {
  await auth.login(email.value, password.value)
  navigateTo('/')
}

</script>

<template>
  <div class="h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-xl shadow w-96">
      <h1 class="text-2xl font-bold mb-4">Sign In</h1>

      <input v-model="email" class="w-full border p-2 mb-3 rounded" />
      <input v-model="password" type="password"
        class="w-full border p-2 mb-4 rounded" />

      <button @click="submit"
        class="w-full bg-black text-white py-2 rounded">
        Login
      </button>
    </div>
  </div>
</template>