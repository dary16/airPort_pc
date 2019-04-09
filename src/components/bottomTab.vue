<template>
    <div>
        <ul class="tab flex">
            <li v-for="(item,index) in arr" v-on:click="tabFn(index)">
                {{item}}
                <i class="el-icon-arrow-down"></i>
            </li>
        </ul>
        <!--场务专业-->
        <v-field-service v-on:onClose="closeFn" v-if="popIndex==0"></v-field-service>
        <!--汽车专业-->
        <v-car-field v-on:onClose="closeFn" v-if="popIndex==1"></v-car-field>
        <!--警卫专业-->
        <v-guard-field v-on:onClose="closeFn" v-if="popIndex==2"></v-guard-field>
        <!--四站专业-->
        <v-szl-field v-on:onClose="closeFn" v-if="popIndex==3"></v-szl-field>
        <!--油料专业-->
        <v-oil-field v-on:onClose="closeFn" v-if="popIndex==4"></v-oil-field>
        <!--航材专业-->
        <v-material-field v-on:onClose="closeFn" v-if="popIndex==5"></v-material-field>
        <!--军械专业-->
        <v-weapon-field v-on:onClose="closeFn" v-if="popIndex==6"></v-weapon-field>
        <!--气象专业-->
        <v-weather-field v-on:onClose="closeFn" v-if="popIndex==7"></v-weather-field>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                arr: ['场务专业', '汽车专业', '警卫专业', '四站专业', '油料专业', '航材专业', '军械专业', '气象专业'],
                popIndex: -1
            };
        },
        props: [''],
        mounted() {
        },
        created() {

        },
        methods: {
            ...mapActions(['_getInfo']),
            tabFn(index) {
                this.popIndex = index;
            },
            closeFn() {
                this.popIndex = '-1';
            }
        }
    };
</script>

<style scoped lang="less">
    .tab {
        li {
            flex: 1;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: cadetblue;
            cursor: pointer;
            border-right: 1px solid #fff;
            color: #fff;
        }
    }
</style>
