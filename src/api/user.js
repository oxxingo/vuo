import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vuo/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vuo/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return { 'code': 20000, 'data': 'success' }
  // return request({
  //   url: '/vuo/user/logout',
  //   method: 'post'
  // })
}
