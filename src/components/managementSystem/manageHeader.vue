<template>
    <div class="m-header">
        <div class="m-header-title">后台管理系统</div>
        <a class="goBackIndex" v-on:click="goBackIndexFn" href="javascript:;">返回首页</a>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        mounted() { },
        created() { },
        methods: {
            goBackIndexFn() {
                this.$router.push('/index');
            }
        }
    }
</script>
<style scoped lang="less">
    .m-header {
        position: relative;
        .goBackIndex {
            width: 100px;
            height: 62px;
            line-height: 62px;
            position: absolute;
            top: 0;
            right: 0;
            color: #fff;
        }
    }
</style>