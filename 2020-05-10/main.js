import Vue from 'vue'

new Vue({
  el: "#app",
  data() {
    return {
      a: {
        b: 2,
        c: {d: 3}
      }
    }
  },
  methods: {
    handle() {
      this.a = 23
    }
  },
  render() {
    console.log(this)
    return <div onClick={this.handle}>{this.a.b || this.a}</div>
  },
  mounted() {
    console.log(this.a, this.a.__ob__, 'this.a')
  }
})