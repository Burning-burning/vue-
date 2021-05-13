import { request } from './request'

export const getAdmin = (roleId, pageIndex, pageSize) =>
  request({
    url: '/Admin/List',
    params: {
      roleId,
      pageIndex,
      pageSize
    }
  })

export const addOneAdmin = addForm =>
  request({
    url: '/Admin/Add',
    method: 'POST',
    data: addForm
  })

export const getOneAdmin = loginId =>
  request({
    url: '/Admin/GetOne',
    params: {
      loginId: loginId
    }
  })

export const deleteAdmin = (id, photo) =>
  request({
    url: '/Admin/Delete',
    method: 'post',
    data: { id: id, photo: photo }
  })

export const updateAdmin = form =>
  request({
    url: '/Admin/Update',
    method: 'post',
    data: form
  })
