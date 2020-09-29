<template>
  <tr>
    <th v-for="week in list" :key="week">{{ week | translateWeek }}</th>
  </tr>
</template>

<script>
export default {
  filters: {
    translateWeek(week) {
      switch (week) {
        case 'Mon':
          return '一'
        case 'Tues':
          return '二'
        case 'Wed':
          return '三'
        case 'Thurs':
          return '四'
        case 'Fri':
          return '五'
        case 'Sat':
          return '六'
        case 'Sun':
          return '日'
      }
    }
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
th {
  width: 40px;
  height: 40px;
  padding: 5px;
  text-align: center;
}
</style>
