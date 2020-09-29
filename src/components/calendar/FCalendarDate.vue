<template>
  <tbody>
    <tr v-for="item in list" :key="item.row">
      <td
        v-for="day in item.list"
        :key="day.date"
        :class="{
          'date-normal': !day.patch,
          'date-patch': day.patch,
          'date-now': day.now
        }"
        @click="!day.patch && dateClicked(day)"
      >
        {{ day.date }}
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    // @todo 年月选择
    dateClicked(day) {
      console.log(day)
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
.date-normal:hover {
  color: #409eff;
}
.date-patch {
  color: #c0c4cc;
}
.date-now {
  color: #409eff;
}
</style>
