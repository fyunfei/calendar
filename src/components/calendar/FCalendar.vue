<template>
  <div>
    <div class="clendar">
      <div class="clendar-tool">
        <div class="clendar-month_prev" @click="changeMonth('prev')">
          上个月
        </div>
        <div class="clendar-month_next" @click="changeMonth('next')">
          下个月
        </div>
        <div class="clendar-header">
          {{ selectTime }}
        </div>
      </div>

      <table class="clendar-body">
        <f-calendar-week :list="WEEKS"></f-calendar-week>
        <f-calendar-date
          :list="rows"
          @dateClicked="dateClicked"
        ></f-calendar-date>
      </table>
    </div>
  </div>
</template>

<script>
import FCalendarWeek from './FCalendarWeek'
import FCalendarDate from './FCalendarDate'
import {
  isNow,
  getDate,
  getCountOfMonth,
  getWeekOfDate,
  translateWeekToNumber
} from './utils/utils'

const WEEKS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']

export default {
  components: {
    FCalendarWeek,
    FCalendarDate
  },
  data() {
    return {
      select: {
        fullDate: '请选择',
        timeStamp: Date.now()
      }
    }
  },
  computed: {
    WEEKS() {
      return WEEKS
    },
    selectTime() {
      let date = new Date(this.select.timeStamp)
      let year = date.getFullYear()
      let month = date.getMonth()
      let day = date.getDate()
      return `${year}-${month + 1}-${day}`
    },
    rows() {
      // 动态计算日期列表
      let rows = []
      const date = new Date(this.select.timeStamp)
      let year = date.getFullYear() // 选中日期的年份
      let month = date.getMonth() // 选中日期的月份
      let dateCount = getCountOfMonth(year, month) // 获取当前月份的时间总数
      /*  用来表示当前行与1号并列的日期，作为标记字段
          用来做向前向后的补位，
          例如：2020-10月，因为1号是周四，根据当前布局，需要补位4个日期，由规律可知周四（getDay()===4） */
      let startTime = 1
      // let dateWeek = getWeekOfDate(year, month, date)
      for (let i = 0; i < 6; i++) {
        let week = getWeekOfDate(year, month, startTime)
        const fullDate = `${year}-${
          startTime > dateCount
            ? month + 1 + 1 > 12
              ? 1
              : month + 1 + 1
            : month + 1
        }-${getDate(year, month, startTime)}`
        rows.push({
          row: i + 1,
          week,
          startTime,
          list: [
            {
              week: week,
              date: getDate(year, month, startTime),
              patch: startTime > dateCount,
              now: isNow(new Date(`${year}-${month + 1}-${startTime}`)),
              timeStamp: new Date(fullDate).getTime(),
              fullDate: fullDate
            }
          ]
        })
        startTime += 7
        for (let row of rows) {
          if (row.list.length < 7) {
            // 获取当前星期代表的数字 用来表示向前补位和向后补位的数量
            let nowWeek = translateWeekToNumber(row.week)
            let patchPreNum = nowWeek // 标记字段前需要补位数
            let patchNextNum = 7 - nowWeek - 1 // 标记字段后需要补位数 星期数字表示周日~六用0~6表示
            for (let m = 1; m <= patchPreNum; m++) {
              // startTime - m <= 0 表示当前需要补位的日期为上个月的日期
              const fullDate = `${year}-${
                row.startTime - m <= 0
                  ? month
                  : row.startTime - m > dateCount
                  ? month + 1 + 1
                  : month + 1
              }-${getDate(year, month, row.startTime - m)}`
              row.list.unshift({
                week: getWeekOfDate(year, month, row.startTime - m),
                date: getDate(year, month, row.startTime - m),
                patch: row.startTime - m <= 0 || row.startTime - m > dateCount,
                now: isNow(new Date(fullDate)),
                timeStamp: new Date(fullDate).getTime(),
                fullDate
              })
            }
            for (let n = 1; n <= patchNextNum; n++) {
              const fullDate = `${year}-${
                row.startTime + n > dateCount ? month + 1 + 1 : month + 1
              }-${getDate(year, month, row.startTime + n)}`
              row.list.push({
                week: getWeekOfDate(year, month, row.startTime + n),
                date: getDate(year, month, row.startTime + n),
                patch: row.startTime + n > dateCount,
                fullDate,
                now: isNow(new Date(fullDate)),
                timeStamp: new Date(fullDate).getTime()
              })
            }
          }
        }
        /* for (let row of rows) {
          if (row.list.length < 7) {
            // 等于1或这个月最后一天时需要进行数组长度补位
            let nowWeek = translateWeekToNumber(row.week)
            let patchPreNum = nowWeek
            let patchNextNum = 7 - nowWeek - 1 // 因为date是从0-6计算
            for (let m = 1; m <= patchPreNum; m++) {
              const fullDate = `${year}-${month + 1}-${getDate(
                year,
                month,
                row.startTime - m
              )}`
              row.list.unshift({
                week: getWeekOfDate(year, month, row.startTime - m),
                date: getDate(year, month, row.startTime - m),
                patch: row.startTime - m <= 0 || row.startTime - m > dateCount,
                now: isNow(new Date(fullDate)),
                timeStamp: new Date(fullDate).getTime(),
                fullDate
              })
            }
            for (let n = 1; n <= patchNextNum; n++) {
              const fullDate = `${year}-${month + 1}-${getDate(
                year,
                month + 1,
                row.startTime + n
              )}`
              row.list.push({
                week: getWeekOfDate(year, month + 1, row.startTime + n),
                date: getDate(year, month, row.startTime + n),
                patch: row.startTime + n > dateCount,
                fullDate,
                now: isNow(new Date(fullDate)),
                timeStamp: new Date(fullDate).getTime()
              })
            }
          }
        } */
      }
      console.log(rows)
      return rows
    }
  },
  mounted() {
    let date = new Date(this.select.timeStamp)
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    this.select.fullDate = `${year}-${month + 1}-${day}`
  },
  methods: {
    dateClicked(day) {
      console.log(day)
      this.select = day
      this.$emit('date-clicked', day)
    },
    nextYear() {
      const nowYear = new Date(this.select.timeStamp).getFullYear()
      const nowMonth = new Date(this.select.timeStamp).getMonth() + 1
      const nowDate = new Date(this.select.timeStamp).getDate()
      this.select.timeStamp = new Date(
        `${nowYear + 1}-${nowMonth}-${nowDate}`
      ).getTime()
    },
    lastYear() {
      const nowYear = new Date(this.select.timeStamp).getFullYear()
      const nowMonth = new Date(this.select.timeStamp).getMonth() + 1
      const nowDate = new Date(this.select.timeStamp).getDate()
      this.select.timeStamp = new Date(
        `${nowYear - 1}-${nowMonth}-${nowDate}`
      ).getTime()
    },
    changeMonth(flag) {
      let time
      const nowYear = new Date(this.select.timeStamp).getFullYear()
      const nowMonth = new Date(this.select.timeStamp).getMonth() + 1
      // const nowDate = new Date(this.select.timeStamp).getDate()
      switch (flag) {
        case 'prev':
          time = `${nowYear}-${nowMonth - 1}-${1}`
          if (nowMonth === 1) {
            time = `${nowYear - 1}-12-1`
          }
          break
        case 'next':
          time = `${nowYear}-${nowMonth + 1}-${1}`
          if (nowMonth === 12) {
            time = `${nowYear + 1}-1-1`
          }
          break
      }
      this.select.timeStamp = new Date(time).getTime()
    }
  }
}
</script>

<style lang="scss" scoped>
.clendar {
  width: 40%;
  min-width: 307px;
  // margin: 0 auto;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 200px;
  transition: box-shadow 300ms ease;
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  &-tool {
    position: relative;
    .clendar-month_next,
    .clendar-month_prev {
      cursor: pointer;
      user-select: none;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
    }
    .clendar-month_next {
      right: 10px;
    }
    .clendar-month_prev {
      left: 10px;
    }
  }
  &-header {
    margin-bottom: 12px;
  }
  &-body {
    margin-top: 12px;
    font-size: 12px;
  }
}
</style>
