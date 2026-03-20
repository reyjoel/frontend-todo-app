import { defineStore } from 'pinia'

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

      const res: any = await api('/login', {
        method: 'POST',
        body: { email, password }
      })

      const token = useCookie<string | null>('token')
      token.value = res.data.token
      this.token = res.token
    },

    async logout() {
      const token = useCookie<string | null>('token')
      token.value = null

      this.$reset()

      await navigateTo('/login', { replace: true, external: true })
    }
  }
})