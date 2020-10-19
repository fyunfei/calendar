// 注：以下方法均需考虑日期溢出的情况
export const getCountOfMonth = (year, month) => {
  const nowMonth = month + 1
  if (nowMonth === 4 || nowMonth === 6 || nowMonth === 9 || nowMonth === 11) {
    return 30
  }
  if (nowMonth === 2) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      return 29
    } else {
      return 28
    }
  }
  return 31
}
export const getDate = (year, month, day) => {
  let count = getCountOfMonth(year, month)
  if (day <= 0) {
    month = month - 1
    count = getCountOfMonth(year, month)
    day = count + day
  } else if (day > count) {
    month = month + 1
    // count = getCountOfMonth(year, month)
    day = day - count
  }
  return day
}
export const isNow = (date) => {
  let nowDate = new Date()
  let year = nowDate.getFullYear()
  let month = nowDate.getMonth()
  let day = nowDate.getDate()
  return (
    date.getFullYear() === year &&
    date.getMonth() === month &&
    date.getDate() === day
  )
}
/**
 * @description day为0是需要获取上个月的天数
 * @param {*} year
 * @param {*} month
 * @param {*} day
 */
export const getWeekOfDate = (year, month, day) => {
  month = month + 1
  let count = getCountOfMonth(year, month)
  if (day <= 0) {
    month = month - 1
    day = getDate(year, month, day)
    count = getCountOfMonth(year, month)
  }
  if (day > count) {
    month = month + 1
    day = getDate(year, month, day - count - 1)
  }

  const date = new Date(year + '-' + month + '-' + day)
  switch (date.getDay()) {
    case 1:
      return 'Mon'
    case 2:
      return 'Thues'
    case 3:
      return 'Wed'
    case 4:
      return 'Thurs'
    case 5:
      return 'Fri'
    case 6:
      return 'Sat'
    case 0:
      return 'Sun'
  }
}

/**
 *
 * @param {string} week Mon Tues Wed ...
 */
export const translateWeekToNumber = (week) => {
  switch (week) {
    case 'Mon':
      return 1
    case 'Thues':
      return 2
    case 'Wed':
      return 3
    case 'Thurs':
      return 4
    case 'Fri':
      return 5
    case 'Sat':
      return 6
    case 'Sun':
      return 0
  }
}
