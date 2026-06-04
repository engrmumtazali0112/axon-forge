import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

export const getServices     = () => api.get('/services')
export const getTeam         = () => api.get('/team')
export const getTestimonials = () => api.get('/testimonials')
export const getStats        = () => api.get('/stats')
export const submitContact   = (data) => api.post('/contact', data)

export default api