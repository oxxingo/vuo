import BigNumber from 'bignumber.js'

const Tool = {

  // 二进制 权限判断
  binaryRole(binarys, int) {
    const roles = []
    binarys.forEach(item => {
      // 二进制位运算
      if ((item.code & int) === item.code) {
        roles.push(item.label)
      }
    })
    return roles
  }
}

const obj = {}

// 分页对象
obj.page = function (options) {
  let page = {}
  if (!obj.isEmpty(options)) {
    page = options
  } else {
    page.current = 1// 当前页
    page.pages = 15// 每页条数
    page.size = 1// 总页数
    page.total = 0// 总页数
  }
  return page
}

obj.pageAssign = function (page, data) {
  if (!obj.isEmpty(page)) {
    page.currentPage = data.current
    page.pageSize = data.size
    page.total = data.total
    page.pageTotal = data.pages
  }
}

obj.getQueryString = function (name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURIComponent(r[2]); return null
}

// 判断array对象是否为空
obj.isCollectionEmpty = function (val) {
  let result = true
  if (val != null && val !== '' && val !== undefined && val.length > 0) {
    result = false
  }
  return result
}

// 判断对象是否为空
obj.isObjEmpty = function (val) {
  let result = true
  if (val !== null && val !== '' && val !== undefined) {
    result = false
  }
  return result
}

// 判断为空
obj.isEmpty = function (value) {
  if (value === null || value === 'undefined' || value === '') {
    return true
  } else {
    return false
  }
}

// 判断是否是对象
obj.isObject = function (value) {
  if (value === null) {
    return false
  }
  const type = Object.prototype.toString(value).slice(8, -1)
  if (type === 'Object') {
    return true
  } else {
    return false
  }
}

/**
 * 单位转换
 * @param blob
 */
obj.transUnit = function (val, unit) {
  if (!val) {
    return 0
  }
  val = new BigNumber(val)
  switch (unit) {
    case 't2g': return val.multipliedBy(1000000).toNumber()   // 吨转克
    case 'g2t': return val.dividedBy(1000000).toNumber()      // 克转吨
    case 'kg2g': return val.multipliedBy(1000).toNumber()     // 千克转克
    case 'g2kg': return val.dividedBy(1000).toNumber()        // 克转千克
    case 'yuan2fen': return val.multipliedBy(100).toNumber()  // 元转分
    case 'fen2yuan': return val.dividedBy(100).toNumber()     // 分转元
    case 'w2y': return val.multipliedBy(10000).toNumber()     // 万转元
    case 'y2w': return val.dividedBy(10000).toNumber()        // 元转万
    case 'w2f': return val.multipliedBy(1000000).toNumber()   // 分转万
    case 'f2w': return val.dividedBy(1000000).toNumber()      // 万转分
    case 'm2cm': return val.multipliedBy(100).toNumber()      // 米转厘米
    case 'cm2m': return val.dividedBy(100).toNumber()         // 厘米转米
    case 'dm2cm': return val.multipliedBy(10).toNumber()      // 分米转厘米
    case 'cm2dm': return val.dividedBy(10).toNumber()         // 厘米转分米
    case 'cm2km': return val.dividedBy(100000).toNumber()     // 厘米转千米
    case 'm2km': return val.dividedBy(1000).toNumber()        // 米转千米
    case 'f2p': return val.multipliedBy(100).toNumber()       // 小数转百分比
    case 'p2f': return val.dividedBy(100).toNumber()          // 百分比转小数
    case 's2h': return val.dividedBy(3600).toFixed(2)         // 秒转小时
    case 'd2ms': return val.multipliedBy(24).multipliedBy(60).multipliedBy(60).multipliedBy(1000).toNumber() // 天转毫秒
    case 'ms2d': return val.dividedBy(24).dividedBy(60).dividedBy(60).dividedBy(1000).toNumber() // 毫秒转天
  }
}

obj.num2week = function (type) {
  type = Number(type)
  switch (type) {
    case 1 :
      return '星期一'
    case 2 :
      return '星期二'
    case 3 :
      return '星期三'
    case 4 :
      return '星期四'
    case 5 :
      return '星期五'
    case 6 :
      return '星期六'
    case 7 :
      return '星期日'
  }
}

/* 加 */
obj.plus = function (v1, v2) {
  return new BigNumber(v1).plus(new BigNumber(v2)).toNumber()
}

/* 减 */
obj.minus = function (v1, v2) {
  return new BigNumber(v1).minus(new BigNumber(v2)).toNumber()
}

/* 乘 */
obj.multi = function (v1, v2) {
  return new BigNumber(v1).multipliedBy(new BigNumber(v2)).toNumber()
}

/* 除 */
obj.divide = function (v1, v2) {
  return new BigNumber(v1).dividedBy(new BigNumber(v2)).toNumber()
}

const tool = Object.assign(Tool, obj)

export default tool
