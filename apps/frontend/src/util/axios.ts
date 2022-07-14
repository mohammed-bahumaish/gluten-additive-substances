import axios from 'axios'
import throwExpression from './throwExpression'

const baseURL =
  process.env.NEXT_PUBLIC_API_URL ??
  throwExpression('NEXT_PUBLIC_API_URL is not defined')

const axiosInstance = axios.create({
  baseURL,
  timeout: 1000,
  withCredentials: true,
})

export default axiosInstance
