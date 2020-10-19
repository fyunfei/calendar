<template>
  <div class="home">
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
