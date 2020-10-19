<template>
  <div class="home">
    <f-calendar @date-clicked="dateClicked"></f-calendar>
  </div>
</template>

<script>
// @ is an alias to /src
import FCalendar from '@/components/calendar/FCalendar'
export default {
  name: 'home',
  components: {
    FCalendar
  },
  methods: {
    dateClicked(item) {
      console.log(item)
    }
  }
}
</script>
