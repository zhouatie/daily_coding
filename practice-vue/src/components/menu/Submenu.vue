<template>
    <div class="wrap">
        <div v-if="nav.children">
            <div>{{nav.title}}</div>
            <div v-for="item in nav.children" :key="item.title">
                <submenu :nav="item"></submenu>
            </div>
        </div>
        <div v-else>{{nav.title}}</div>
    </div>
</template>
<script>
export default {
    name: 'submenu',
    props: ['nav'],
    created() {
        console.log('haha')
    }
}
</script>
<style>
.wrap {
    padding-left: 20px;
}
</style>
