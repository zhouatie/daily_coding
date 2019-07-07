<template>
  <div id="app">
    <atie-input v-model="value"></atie-input>{{value}}
  </div>
</template>

<script>
import atieInput from './components/atieInput.vue'

export default {
  name: 'app',
  data() {
    return {
      value: ""
    }
  },
  components: {
    atieInput
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
