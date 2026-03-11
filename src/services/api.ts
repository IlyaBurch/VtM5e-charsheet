import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: false,
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

export interface FilePayload {
  [key: string]: unknown
}

export default {
  getFiles(): Promise<AxiosResponse> {
    return apiClient.get('/files')
  },
  postFile(file: FilePayload): Promise<AxiosResponse> {
    return apiClient.post('/files', file)
  },
  deleteFile(id: number | string): Promise<AxiosResponse> {
    return apiClient.delete(`/files/${id}`)
  },
}
