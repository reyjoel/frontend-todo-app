<script setup lang="ts">
definePageMeta({ middleware: 'guest', layout: 'auth' })

const auth = useAuthStore()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const login = async () => {
  error.value = ''
  loading.value = true
  try {
    await auth.login(email.value, password.value)
    navigateTo('/')
  } catch {
    error.value = 'Invalid credentials. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex font-body">

    <!-- LEFT PANEL -->
    <div class="hidden lg:flex w-1/2 bg-ink flex-col justify-between p-12">
      <!-- Brand -->
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 bg-amber-accent rounded-lg flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2.5 5h11M2.5 8h8M2.5 11h6" stroke="#0F1117" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <span class="font-display text-xl text-white tracking-tight">Taskr</span>
      </div>

      <!-- Illustration area -->
      <div class="flex flex-col gap-6">
        <div class="space-y-3">
          <div
            v-for="(item, i) in ['Design homepage mockup', 'Review pull requests', 'Write daily standup']"
            :key="i"
            class="flex items-center gap-3 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3"
            :style="{ animationDelay: `${i * 100}ms` }"
          >
            <div
              class="w-4 h-4 rounded-md border-2 shrink-0"
              :class="i === 0 ? 'bg-task-done border-task-done' : 'border-white/20'"
            />
            <span
              class="text-sm"
              :class="i === 0 ? 'line-through text-white/30' : 'text-white/70'"
            >{{ item }}</span>
          </div>
        </div>

        <div>
          <h2 class="font-display text-3xl text-white leading-tight mb-2">
            Your most<br/>
            <em class="text-amber-accent not-italic">productive</em> day<br/>
            starts here.
          </h2>
          <p class="text-cream/40 text-sm leading-relaxed">
            Stay focused, track progress, and own your time.
          </p>
        </div>
      </div>

      <p class="text-white/20 text-xs">© 2025 Taskr</p>
    </div>

    <!-- RIGHT PANEL -->
    <div class="flex-1 flex items-center justify-center bg-canvas p-8">
      <div class="w-full max-w-sm">

        <!-- Mobile brand -->
        <div class="flex items-center gap-2 mb-10 lg:hidden">
          <div class="w-7 h-7 bg-amber-accent rounded-lg flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 4h10M2 7h7M2 10h5" stroke="#0F1117" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </div>
          <span class="font-display text-lg text-ink tracking-tight">Taskr</span>
        </div>

        <h1 class="font-display text-3xl text-ink mb-1.5">Welcome back</h1>
        <p class="text-ink-muted/60 text-sm mb-8">Sign in to continue to your workspace.</p>

        <!-- Error -->
        <div
          v-if="error"
          class="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600"
        >
          {{ error }}
        </div>

        <form @submit.prevent="login" class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-ink-muted/70 uppercase tracking-wider mb-1.5">Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="you@example.com"
              required
              class="w-full bg-white border border-cream-dark rounded-xl px-4 py-3 text-sm text-ink placeholder-ink-muted/30 focus:outline-none focus:border-amber-accent/60 focus:ring-2 focus:ring-amber-accent/15 transition-all"
            />
          </div>

          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="block text-xs font-medium text-ink-muted/70 uppercase tracking-wider">Password</label>
              <a href="#" class="text-xs text-amber-dark hover:text-amber-accent transition">Forgot password?</a>
            </div>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              required
              class="w-full bg-white border border-cream-dark rounded-xl px-4 py-3 text-sm text-ink placeholder-ink-muted/30 focus:outline-none focus:border-amber-accent/60 focus:ring-2 focus:ring-amber-accent/15 transition-all"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 bg-ink text-white text-sm font-medium rounded-xl hover:bg-ink-soft transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
          >
            <span v-if="loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>{{ loading ? 'Signing in...' : 'Sign in' }}</span>
          </button>
        </form>

      </div>
    </div>

  </div>
</template>
