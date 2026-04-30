import { defineStore } from 'pinia'

interface LoginResponse {
  data: {
    token: string
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    const token = useCookie<string | null>('token').value || null

    return { token }
  },

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    async login(email: string, password: string) {
      const api = useApi()

      const res = await api<LoginResponse>('/login', {
        method: 'POST',
        body: { email, password }
      })

      const token = useCookie<string | null>('token')
      token.value = res.data.token
      this.token = res.data.token
    },

    async logout() {
      const token = useCookie<string | null>('token')
      token.value = null

      this.$reset()

      await navigateTo('/login', { replace: true, external: true })
    }
  }
})