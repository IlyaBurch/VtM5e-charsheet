import axios, { type InternalAxiosRequestConfig } from 'axios'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const baseURL = import.meta.env.VITE_API_URL ?? '/api'

export const apiClient = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useUserStore().logOut()
      if (router.currentRoute.value.name !== 'auth') {
        router.push('/auth')
      }
    }
    return Promise.reject(error)
  },
)
