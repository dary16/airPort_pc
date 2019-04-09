<template>
    <div class="asideBox">
        <dl>
            <dt v-on:click="test(1)">我是测试</dt>
            <dd class="" v-bind:class="test1?'eee':'qqq'">
                <ul>
                    <li>哈哈测试的内容啊啊啊3333</li>
                    <li>哈哈测试的内容啊啊啊3333</li>
                    <li>哈哈测试的内容啊啊啊3333</li>
                </ul>
            </dd>
        </dl>
        <dl>
            <dt v-on:click="test(2)">我是测试2222</dt>
            <dd class="" v-bind:class="test2?'yyy':'qqq'">
                <ul>
                    <li>哈哈测试的内容啊啊啊3333</li>
                    <li>哈哈测试的内容啊啊啊3333</li>
                    <li>哈哈测试的内容啊啊啊3333</li>
                    <li>哈哈测试的内容啊啊啊3333</li>
                    <li>哈哈测试的内容啊啊啊3333</li>
                    <li>哈哈测试的内容啊啊啊3333</li>
                    <li>哈哈测试的内容啊啊啊3333</li>
                </ul>
            </dd>
        </dl>
        <dl>
            <dt v-on:click="test(3)">我是测试3333</dt>
            <dd v-bind:class="test3?'ttt':'qqq'">
                <ul>
                    <li>哈哈测试的内容啊啊啊3333</li>
                    <li>哈哈测试的内容啊啊啊3333</li>
                    <li>哈哈测试的内容啊啊啊3333</li>
                    <li>哈哈测试的内容啊啊啊3333</li>
                    <li>哈哈测试的内容啊啊啊3333</li>
                </ul>
            </dd>
        </dl>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                test1: false,
                test2: false,
                test3: false
            }

        },
        created() {
            console.log(this.test1);
        },
        methods: {
            test(index) {
                for(var i = 1; i < 4; i++) {
                    if(i == index) {
                        continue;
                    }
                    this['test' + i] = false;
                }
                if(this['test' + index]) {
                    this['test' + index] = false;
                } else {
                    this['test' + index] = true;
                }
            }
        }
    }

</script>
<style lang="less" scoped>
    dl {
        dt {
            background: red;
        }
        dd {
            background: blue;
        }
    }
    .qqq {
        height: 0;
        overflow: hidden;
        color: rgba(0, 0, 0, 0);
        transition-property: 'height,color';
        transition-duration: 300ms;
    }
    .ttt {
        transition-property: 'height,color';
        height: 280px;
        color: rgba(0, 0, 0, 1);
        transition-duration: 300ms;
    }
    .eee {
        height: 90px;
        transition-property: 'height,color';
        color: rgba(0, 0, 0, 1);
        transition-duration: 300ms;
    }
    .yyy {
        height: 350px;
        transition-property: 'height,color';
        color: rgba(0, 0, 0, 1);
        transition-duration: 300ms;
    }
</style>
