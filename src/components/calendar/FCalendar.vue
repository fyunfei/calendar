<template>
  <div>
    <div class="clendar">
      <div class="clendar-header">
        {{ select.fullDate }}
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
        fullDate: '请选择'
      }
    }
  },
  computed: {
    WEEKS() {
      return WEEKS
    },
    rows() {
      let rows = []
      const date = new Date('2020-09-01')
      let year = date.getFullYear()
      let month = date.getMonth()
      let dateCount = getCountOfMonth(year, month)
      let startTime = 1
      // let dateWeek = getWeekOfDate(year, month, date)
      for (let i = 0; i < 6; i++) {
        let week = getWeekOfDate(year, month, startTime)
        rows.push({
          row: i + 1,
          week,
          startTime,
          list: [
            {
              week: week,
              date: getDate(year, month, startTime),
              patch: startTime > dateCount,
              now: isNow(new Date(`2020-${month + 1}-${startTime}`)),
              timeStamp: new Date(`2020-${month + 1}-${startTime}`).getTime(),
              fullDate: `2020-${month + 1}-${startTime}`
            }
          ]
        })
        startTime += 7
        for (let row of rows) {
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
                month,
                row.startTime + n
              )}`
              row.list.push({
                week: getWeekOfDate(year, month, row.startTime + n),
                date: getDate(year, month, row.startTime + n),
                patch: row.startTime + n > dateCount,
                fullDate,
                now: isNow(new Date(fullDate)),
                timeStamp: new Date(fullDate).getTime()
              })
            }
            /* row.list.sort((x, y) => {
              return x.date - y.date
            }) */
          }
        }
        /* for (let row of rows) {
          for (let i = 0; i < row.length; i++) {
            row.push({ week })
          }
        } */
      }
      console.log(rows)
      return rows
    }
  },
  methods: {
    dateClicked(day) {
      this.select = day
    }
  }
}
</script>

<style lang="scss" scoped>
.clendar {
  width: 292px;
  margin: 0 auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 200px;
  &-header {
    margin-bottom: 12px;
  }
  &-body {
    margin-top: 12px;
    font-size: 12px;
  }
}
</style>
