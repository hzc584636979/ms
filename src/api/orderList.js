import { httpGet } from '@/api'

export const listPage = params => httpGet('/advertOrder/listPage', params) // 列表
