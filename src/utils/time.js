/**
 * 将时间解析为字符串
 * @param {(Object|string|number)} time
 * @param {string} format
 * @returns {string | null}
 */
export function parseTime(time, format = '{y}-{m}-{d} {h}:{i}:{s}') {
  if (arguments.length === 0 || !time) return null

  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
* @param {number} time
* @param {string} option
* @returns {string}
*/
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
          1 +
          '月' +
          d.getDate() +
          '日' +
          d.getHours() +
          '时' +
          d.getMinutes() +
          '分'
    )
  }
}

export function getCurrentTime(state = '1', DATE = '') {
  let dtCur
  if (DATE === '') dtCur = new Date()
  else  dtCur = DATE

  const yearCur = dtCur.getFullYear()
  const monCur = dtCur.getMonth() + 1
  const dayCur = dtCur.getDate()
  const hCur = dtCur.getHours()
  const mCur = dtCur.getMinutes()
  const sCur = dtCur.getSeconds()
  const timeCur = yearCur + '-' + (monCur < 10 ? '0' + monCur : monCur) + '-' +
				(dayCur < 10 ? '0' + dayCur : dayCur) + ' ' + (hCur < 10 ? '0' + hCur : hCur) +
				':' + (mCur < 10 ? '0' + mCur : mCur) + ':' + (sCur < 10 ? '0' + sCur : sCur)
  const timeHour = (hCur < 10 ? '0' + hCur : hCur) + ':' + (mCur < 10 ? '0' + mCur : mCur) + ':' + (sCur < 10 ? '0' + sCur : sCur)

  if (state === '1') return timeCur
  else return timeHour
}

/**
* @param {string} type
* @returns {Date}
*/
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function formatSeconds(value) {
  let theTime = parseInt(value)// 需要转换的时间秒
  let theTime1 = 0// 分
  let theTime2 = 0// 小时
  let theTime3 = 0// 天
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60)
    theTime = parseInt(theTime % 60)
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60)
      theTime1 = parseInt(theTime1 % 60)
      if (theTime2 > 24) {
        // 大于24小时
        theTime3 = parseInt(theTime2 / 24)
        theTime2 = parseInt(theTime2 % 24)
      }
    }
  }
  let result = ''
  if (theTime > 0) {
    result = '' + parseInt(theTime) + '秒'
  }
  if (theTime1 > 0) {
    result = '' + parseInt(theTime1) + '分' + result
  }
  if (theTime2 > 0) {
    result = '' + parseInt(theTime2) + '小时' + result
  }
  if (theTime3 > 0) {
    result = '' + parseInt(theTime3) + '天' + result
  }
  return result
}
