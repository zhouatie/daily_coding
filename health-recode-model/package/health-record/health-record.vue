<template>
    <div>
        <div>头部</div>
        <div>{{content || '内容'}}</div>
        <div>底部</div>
    </div>
</template>
<script>
import { apiGetDetail } from '../api/index.js';

export default {
    props: ['content'],
    created() {
        // apiGetDetail({abc:'abc'})
    }
}
</script>
<style lang="less">
</style>
