import { request } from './request'
export const money = () =>
  request({
    url: '/RoomType/TotalTypePrice'
  })
