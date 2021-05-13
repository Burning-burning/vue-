import { request } from './request'
export const getGuest = (guestName, resideStateId, pageIndex) =>
  request({
    url: '/GuestRecord/List',
    params: {
      guestName: guestName,
      resideStateId: resideStateId,
      pageIndex: pageIndex
    }
  })
export const getResideList = () =>
  request({
    url: '/ResideState/List'
  })

export const addGuest = form =>
  request({
    url: '/GuestRecord/Add',
    method: 'POST',
    data: form
  })

export const getOneGuest = guestId =>
  request({
    url: '/GuestRecord/GetOne',
    params: { guestId: guestId }
  })

export const deleteGuest = guestId =>
  request({
    url: '/GuestRecord/Delete',
    method: 'post',
    data: { guestId: guestId }
  })

export const updateGuest = form =>
  request({
    url: '/GuestRecord/Update',
    method: 'post',
    data: form
  })
export const getRooms = (roomTypeId, roomStateId, guestId) =>
  request({
    url: '/Room/List',
    params: {
      roomTypeId,
      roomStateId,
      guestId
    }
  })

export const getJiezhang = guestId =>
  request({
    url: '/GuestRecord/Checkout',
    method: 'post',
    data: { guestId }
  })
