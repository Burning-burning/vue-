import { request } from './request'

export const updatePassword = form =>
  request({
    url: '/Admin/ResetPwd',
    method: 'POST',
    data: form
  })
