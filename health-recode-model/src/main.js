import Vue from 'vue'
import App from './App.vue'
// import HealthRecord from '../index.js'
import HealthRecord from 'health-recode-model'

Vue.use(HealthRecord)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
