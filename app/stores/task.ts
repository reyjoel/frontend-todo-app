import { defineStore } from 'pinia'
import { getLocalDate } from '@/utils/date'
import type { Task } from '@/types/task'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
    allTasks: [] as Task[],
    selectedDate: getLocalDate(),
    search: '',
    loading: false
  }),

  getters: {
    displayTasks: (state) => {
      return state.search ? state.allTasks : state.tasks
    }
  },

  actions: {
    async fetchTasks() {
      const api = useApi()
      this.loading = true

      try {
        const res = await api<{ data: Task[] }>(
          `/tasks?date=${this.selectedDate}`
        )

        this.tasks = res.data
      } catch (err) {
        console.error('fetchTasks error:', err)
      } finally {
        this.loading = false
      }
    },

    async fetchAllTasks() {
      const api = useApi()

      if (!this.search.trim()) {
        this.allTasks = []
        return
      }

      try {
        const res = await api<{ data: Task[] }>(
          `/tasks/search?q=${encodeURIComponent(this.search)}`
        )

        this.allTasks = res.data
      } catch (err) {
        console.error('search error:', err)
      }
    },

    async createTask(statement: string) {
      const api = useApi()

      await api('/tasks', {
        method: 'POST',
        body: {
          statement,
          task_date: this.selectedDate
        }
      })

      await this.fetchTasks()
    },

    async updateTask(id: number, statement: string) {
      const api = useApi()

      await api(`/tasks/${id}`, {
        method: 'PATCH',
        body: { statement }
      })

      const task = this.tasks.find(t => t.id === id)
      if (task) task.statement = statement
    },

    async deleteTask(id: number) {
      const api = useApi()
      await api(`/tasks/${id}`, { method: 'DELETE' })

      this.tasks = this.tasks.filter(t => t.id !== id)
    },

    async toggleTask(id: number) {
      const api = useApi()
      await api(`/tasks/${id}/toggle`, { method: 'PATCH' })

      const task = this.tasks.find(t => t.id === id)
      if (task) task.is_completed = !task.is_completed
    },

    async reorderTasks(newOrder: Task[]) {
      this.tasks = newOrder

      const api = useApi()

      try {
        await api('/tasks/reorder', {
          method: 'POST',
          body: {
            tasks: newOrder.map((task, index) => ({
              id: task.id,
              order: index
            }))
          }
        })
      } catch (err) {
        console.error('reorder error:', err)

        // fallback (optional localStorage)
        localStorage.setItem(
          `order-${this.selectedDate}`,
          JSON.stringify(newOrder.map(t => t.id))
        )
      }
    },

    async changeDate(date: string) {
      this.selectedDate = date
      await this.fetchTasks()
    }
  }
})