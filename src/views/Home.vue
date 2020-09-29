<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <f-calendar></f-calendar>
  </div>
</template>

<script>
// @ is an alias to /src
import FCalendar from '@/components/calendar/FCalendar'
export default {
  name: 'home',
  components: {
    FCalendar
  }
}
</script>
