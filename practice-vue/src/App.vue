<template>
  <div id="app">
    <!-- <input type="text" v-model="script">
    <p v-html="script"></p> -->
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
    <select name="" id="" v-model="defaultSelect">
      <option v-for="list in lists" :value="{name: list.value}" :key="list.id">{{list.value}}</option>
    </select>
    {{defaultSelect}}
    <div>
      <input type="checkbox" v-model="sex" value="男">
      <input type="checkbox" v-model="sex" value="女">
      {{sex}}
    </div>
    <div>
      <input type="text" v-model.number="number" name="" id="">{{typeof number}}{{number}}
    </div>
    <div @click="name1 = Date.now()">{{handleName()}}</div>
    <div class="nav">
      <Menu :navs="navs"></Menu>
    </div>
  </div>
</template>

<script>
import atieInput from './components/atieInput.vue'
import Menu from './components/menu/menu.vue'

export default {
  components: {
    atieInput,
    Menu
  },
  data() {
    return {
      script: '<img src="notValidUrl" onerror=alert(document.cookie)>',
      navs: [
        {
          title: '菜单1'
        },
        {
          title: '菜单2'
        },
        {
          title: '菜单3',
          children: [
            {
              title: '菜单3-1'
            },
            {
              title: '菜单3-2',
              children: [
                {
                  title: '菜单3-2-1'
                },
                {
                  title: '菜单3-2-2'
                },
                {
                  title: '菜单3-2-3'
                }
              ]
            },
            {
              title: '菜单3-3'
            }
          ]
        }
      ],
      number: 0,
      sex: [],
      show: true,
      value: "",
      obj: {
        age: 18,
        name: 'zhou'
      },
      abc: null,
      defaultSelect: {name: '菜单2'},
      lists: [{
        value: '菜单1',
        id: 1
      }, {
        value: '菜单2',
        id: 2
      }],
      name1: 'zhou',
      name2: 'atie'
    }
  },
  methods: {
    handleName() {
      return `${this.name1}${this.name2}`
    },
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
  created() {
    console.log(this.$el, 'el')
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
</style>
