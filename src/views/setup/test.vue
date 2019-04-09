<template>
    <div class="g-userWrap">
        <div class="level-0" v-for="item in tableData6">
            <div class="level-1">{{item.id}}</div>
            <div class="level-1">{{item.name}}</div>
            <div class="level-1" v-for="subItem in item.amount1" style="border:1px solid green;">
                <div class="level-2" v-if="subItem.test1">
                    <div class="level-3" v-for="ttt in subItem.test1">{{ttt.sub}}</div>
                </div>
                <div class="level-2" v-if="subItem.test2">
                    <div class="level-3" v-for="ttt in subItem.test2">{{ttt.sub}}</div>
                    <div class="level-3" v-for="ttt in subItem.test2">{{ttt.sub1}}</div>
                </div>
                <div class="level-2" v-if="subItem.test3">
                    <div class="level-3" v-for="ttt in subItem.test3">{{ttt.sub}}</div>
                    <div class="level-3" v-for="ttt in subItem.test3">{{ttt.sub1}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import { regionData, CodeToText } from 'element-china-area-data';
    export default {
        data() {
            return {
                tableData6: [{
                    id: '12987122',
                    name: '王小虎',
                    amount1: [
                        { test1: [{ sub: '哈哈' }] },
                        {
                            test2: [{ sub: '嘿嘿' }, { sub1: '嘎嘎' }]
                        },
                        { test3: [{ sub: '呵呵' }] }
                    ]
                }, {
                    id: '12987123',
                    name: '王小虎',
                    amount1: [{ test1: [{ sub: '哈哈' }] }, { test2: [{ sub: '嘿嘿' }] }]
                }]
            }
        },
        mounted() {

        },
        created() {
        },
        watch: {},
        methods: {
            ...mapActions(['_getInfo']),

        },
    };
</script>

<style scoped lang="less">
    .level-0 {
        overflow: hidden;
        div.level-1 {
            float: left;
            margin-right: 20px;
            div.level-2 {
                display: block;
                border: 1px solid red;
            }
        }
    }
</style>
