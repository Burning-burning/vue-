import { request } from './request'

export const login = loginForm =>
  request({
    url: '/Admin/Login',
    params: loginForm
  })
