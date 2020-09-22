<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { Test } from '@/services'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {
    // test demo
    async getTest() {
      let data = { a: 'a', b: 'b' }
      const res = await Test.get(data)
      if (res.result === 0) {
        console.log('success！')
      }
    },
    async postTest() {
      let data = { a: 'a', b: 'b' }
      const res = await Test.post(data)
      if (res.result === 0) {
        console.log('success！')
      }
    }
  }
}
</script>
