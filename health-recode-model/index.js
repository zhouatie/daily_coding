import HealthRecord from './package/health-record/index.vue'

export default {
    install(Vue, options) {
        console.log(options)
        Vue.component(HealthRecord.name, HealthRecord)
    }
}