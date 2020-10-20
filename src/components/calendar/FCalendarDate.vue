<template>
  <tbody>
    <tr v-for="item in list" :key="item.row">
      <td
        v-for="day in item.list"
        :key="day.date"
        @click="!day.patch && dateClicked(day)"
      >
        <div
          class="date-font"
          :class="{
            'date-normal': !day.patch && !day.now,
            'date-patch': day.patch,
            'date-now': day.now,
            'date-select': isSelect(day)
          }"
        >
          {{ day.date }}
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  date() {
    return {
      select: ''
    }
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    isSelect() {
      let _this = this
      return function judgeDay(day) {
        if (day.now) return false
        if (day.fullDate === _this.select) return true
        return false
      }
    }
  },
  methods: {
    // @todo 年月选择
    dateClicked(day) {
      this.select = day.fullDate
      this.$emit('dateClicked', day)
    }
  }
}
</script>

<style lang="scss" scoped>
td {
  cursor: pointer;
  text-align: center;
  height: 32px;
}
.date-font {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
}
.date-normal:hover {
  background: #f0f2f4;
  color: #409eff;
}
.date-select {
  background: #f0f2f4;
  color: #409eff;
}
.date-patch {
  color: #c0c4cc;
}
.date-now {
  background: #409eff;
  color: #fff;
}
</style>
