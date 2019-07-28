<template>
    <div>
    <record :content="content"></record>
    </div>
</template>
<script>
import Record from './health-record.vue';

export default {
    name: 'health-record',
    components: {
        Record
    },
    props: {
        content: {
            type: String,
            default: 'hah'
        }
    },
    created() {
        console.log()
        // TODO: 处理公共逻辑
    }
}
</script>
<style lang="less">
</style>
