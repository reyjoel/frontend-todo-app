export const useApi = () => {
  const config = useRuntimeConfig()
  const token = useCookie('token')

  return $fetch.create({
    baseURL: config.public.apiBase,
    headers: {
      Authorization: token.value ? `Bearer ${token.value}` : ''
    }
  })
}