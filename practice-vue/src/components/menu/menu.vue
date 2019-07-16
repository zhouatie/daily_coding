<template>
    <div>
        <div class="menu-wrap" v-for="nav in navs" :key="nav.title">
            <Submenu :nav="nav"></Submenu>
        </div>

    </div>
</template>
<script>
import Submenu from './Submenu';
export default {
    components: {
        Submenu,
    },
    props: ['navs'],
    data() {
        return {
            a: 1
        }
    }
}
</script>
<style lang="less">
</style>
