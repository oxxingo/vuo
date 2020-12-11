import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/vuo/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/vuo/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/vuo/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/vuo/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/vuo/role/${id}`,
    method: 'delete'
  })
}
