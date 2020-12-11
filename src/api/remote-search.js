import request from '@/utils/request'

export function searchUser(name) {
  return request({
    url: '/vuo/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return { 'code': 20000, 'data': { 'total': 20, 'items': [{ 'order_no': '5699f6bb-A7D2-BFF7-6C02-c21EFb583d8E', 'timestamp': 1521491703352, 'username': 'George Johnson', 'price': 9761, 'status': 'success' }, { 'order_no': 'A2EBfCcC-660c-2A5E-34eb-Eeb9ddEA42C2', 'timestamp': 1521491703352, 'username': 'Michael White', 'price': 1317.9, 'status': 'pending' }, { 'order_no': 'D3F1d40E-dbb2-f1d7-35f2-AE781cCAfB2B', 'timestamp': 1521491703352, 'username': 'Susan Miller', 'price': 2143, 'status': 'success' }, { 'order_no': '57Aca18A-eaDd-Ae98-737e-3A98bC35C56C', 'timestamp': 1521491703352, 'username': 'Deborah White', 'price': 3345.8, 'status': 'success' }, { 'order_no': '899e8FBA-FD57-BC12-f41B-9Eac61cD59EB', 'timestamp': 1521491703352, 'username': 'Cynthia Jones', 'price': 7058.3, 'status': 'pending' }, { 'order_no': 'ebFA614D-8FCB-9CE8-D67e-c724Cc16716A', 'timestamp': 1521491703352, 'username': 'Sarah Clark', 'price': 9056.6, 'status': 'pending' }, { 'order_no': 'd033E267-a1b6-e2F9-22A8-EC1F2B03d124', 'timestamp': 1521491703352, 'username': 'Daniel Harris', 'price': 7326, 'status': 'success' }, { 'order_no': '24fbDDF8-Cc9E-A3d1-4a2e-1Df8EfE84e62', 'timestamp': 1521491703352, 'username': 'Christopher Miller', 'price': 14049.4, 'status': 'pending' }, { 'order_no': '8f5f99f4-F8FE-f6AF-a7EF-2fC6aBdADeBD', 'timestamp': 1521491703352, 'username': 'Sandra Anderson', 'price': 10481.95, 'status': 'pending' }, { 'order_no': '3ECFE2CF-c6e1-6E6E-43Ad-FC76084BCA7A', 'timestamp': 1521491703352, 'username': 'Joseph Jones', 'price': 12095, 'status': 'pending' }, { 'order_no': '791D42ea-8b1e-CFE5-A7AC-8EebAB43BC4B', 'timestamp': 1521491703352, 'username': 'Brenda Hall', 'price': 4879.88, 'status': 'success' }, { 'order_no': '2238cecA-FD2A-E609-d453-5A9ADFBbcaab', 'timestamp': 1521491703352, 'username': 'Carol Walker', 'price': 8464.55, 'status': 'success' }, { 'order_no': 'c7eB4A55-2CDF-0E67-feBE-987eDCB756CC', 'timestamp': 1521491703352, 'username': 'George Perez', 'price': 4032.5, 'status': 'success' }, { 'order_no': '78aE7d41-864E-b3dD-f73E-DDF8D878cCdC', 'timestamp': 1521491703352, 'username': 'Betty Hall', 'price': 2134, 'status': 'success' }, { 'order_no': '1fD264c8-8bd9-9EDC-CbfF-C60feFbB3754', 'timestamp': 1521491703352, 'username': 'Michael Harris', 'price': 13530.4, 'status': 'success' }, { 'order_no': 'DcBA3227-2b1B-bf8d-D24d-ACe96B457b2d', 'timestamp': 1521491703352, 'username': 'Eric Williams', 'price': 6895.6, 'status': 'pending' }, { 'order_no': '6cF93D9D-b315-AFa8-FcC4-ED4B3D2c7dF4', 'timestamp': 1521491703352, 'username': 'Brian Robinson', 'price': 2447.3, 'status': 'success' }, { 'order_no': '238DAf54-8F9D-A2eE-Fd7D-EDdf53bC6B1f', 'timestamp': 1521491703352, 'username': 'Maria Hernandez', 'price': 3926.7, 'status': 'success' }, { 'order_no': 'c95962d8-6C34-DaCA-dE74-80EF9C581BDc', 'timestamp': 1521491703352, 'username': 'Lisa Young', 'price': 8692, 'status': 'pending' }, { 'order_no': 'fF4b9512-B8b3-C3CC-27EF-2618E4a7386A', 'timestamp': 1521491703352, 'username': 'Ruth Lee', 'price': 13908.3, 'status': 'success' }] } }
  // return request({
  //   url: '/vuo/transaction/list',
  //   method: 'get',
  //   params: query
  // })
}
