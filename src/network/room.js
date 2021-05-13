import { request } from './request'

export const getRoomList = () =>
  request({
    url: '/RoomType/List'
  })

export const addRoom = form =>
  request({
    url: '/RoomType/Add',
    method: 'POST',
    data: form
  })

export const deleteRoom = roomTypeId =>
  request({
    url: '/RoomType/Delete',
    method: 'post',
    data: { roomTypeId }
  })

export const getOneRoom = roomTypeId =>
  request({
    url: '/RoomType/GetOne',
    params: { roomTypeId }
  })

export const updateRoom = form =>
  request({
    url: '/RoomType/Update',
    method: 'post',
    data: form
  })
export const getRoom = (roomTypeId, roomStateId, pageIndex) =>
  request({
    url: '/Room/List',
    params: { roomTypeId, roomStateId, pageIndex }
  })
export const getRoomState = () =>
  request({
    url: '/RoomState/List'
  })
export const getRoomUpdateState = () =>
  request({
    url: '/RoomState/ListToUpdate'
  })
export const tianjiaRoom = form =>
  request({
    url: '/Room/Add',
    method: 'post',
    data: form
  })

export const getARoom = roomId =>
  request({
    url: '/Room/GetOne',
    params: { roomId }
  })
export const xiugaiRoom = form =>
  request({
    url: '/Room/Update',
    method: 'post',
    data: form
  })
export const deleteOneRoom = roomId =>
  request({
    url: '/Room/Delete',
    method: 'post',
    data: { roomId }
  })

export const getImgByRoomId = roomId =>
  request({
    url: '/RoomImg/List',
    params: { roomId }
  })
export const addImg = (roomId, imgUrl) =>
  request({
    url: '/RoomImg/Add',
    method: 'post',
    data: { roomId, imgUrl }
  })
export const deleteImg = (roomImgId, filename) =>
  request({
    url: '/RoomImg/Delete',
    method: 'post',
    data: { roomImgId, filename }
  })
