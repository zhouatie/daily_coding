<template>
  <div>
    <input type="text" :value="inputValue" @input="inputHandler">
    <img  alt="">
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputValue: ''
    }
  },
  props: {
    value: {
      default: ''
    }
  },
  methods: {
    inputHandler(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>
<style lang="less">
</style>
