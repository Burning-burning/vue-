import { request } from './request'

export const getOne = loginId =>
  request({
    url: '/Admin/GetOne',
    params: {
      loginId
    }
  })

export const getRoles = () =>
  request({
    url: '/Role/List'
  })

export const addRole = roleForm =>
  request({
    url: '/Role/Add',
    method: 'POST',
    data: roleForm
  })

export const deleteRole = roleId =>
  request({
    url: '/Role/Delete',
    method: 'post',
    data: {
      roleId
    }
  })

// 根据角色id 获取角色对象
export const getOneRole = roleId =>
  request({
    url: '/Role/GetOne',
    params: {
      roleId
    }
  })

export const updateOneRole = roleForm =>
  request({
    url: '/Role/Update',
    method: 'post',
    data: roleForm
  })
