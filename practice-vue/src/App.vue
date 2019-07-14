<template>
  <div id="app">
    <atie-input v-model="value"></atie-input>{{value}}
    <button @click="handleChangeName">name</button>
    <button @click="handleChangeAge">age</button>
    <button @click="handleChangeObj">handleChangeObj</button>
    <span>abc: {{abc}}</span>
    <div>
      <!-- 当你想重置input的value的时候，给元素加个key，让vue重新渲染 -->
      <input v-if="show" type="text" key="1">
      <input type="text" v-else key="2">
    </div>
  </div>
</template>

<script>
import atieInput from './components/atieInput.vue'

export default {
  name: 'app',
  data() {
    return {
      show: true,
      value: "",
      obj: {
        age: 18,
        name: 'zhou'
      },
      abc: null
    }
  },
  components: {
    atieInput
  },
  methods: {
    handleChangeName() {
      this.obj.name = `${Date.now()}name`
    },
    handleChangeAge() {
      this.obj.age = `${Date.now()}age`
    },
    handleChangeObj() {
      this.abc = 'zhou'
    }
  },
  mounted() {
    this.value = 1
    this.value = 2
    this.$nextTick(() => {
      console.log(this.$el)
    })
    this.value = 3
    window._this= this
  },
  watch: {
    'obj.name'(val) {
      console.log(val, 'watch obj.name')
    },
    obj(val) {
      console.log(val, 'watch obj')
    }
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
