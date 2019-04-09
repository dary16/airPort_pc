<template>
    <div class="groupWrap">
        <div class="header">
            <h3>{{title}}</h3>
            <i class="el-icon-close" v-on:click="closeFn"></i>
        </div>
        <div class="content">
            <ul class="flightList">
                <li v-for="item in flightContent" v-on:click="getDetailFn(item.id)">{{item.flightName}}</li>
            </ul>
        </div>
        <!--飞行准备阶段弹框-->
        <v-flight-phase v-if="isShow" v-bind:flightCurId="flightCurId" v-on:closeClick="closeFlighFn"></v-flight-phase>
    </div>
</template>

<script>
    import { mapActions, mapState, mapMutations } from 'vuex';
    export default {
        data() {
            return {
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                treeData: [],
                isShow: false,
                id: '',
                spreadArr: [],
                groupNum: '',
                groupTitle: '',
                isAddGroup: false,
                flightCurId: ''
            };
        },
        props: ['title', 'flightContent'],
        created() {

        },
        computed: {
            ...mapState(['createGroupData', 'currentGroup'])
        },
        methods: {
            ...mapActions(['_getInfo', '_createGroupData']),
            ...mapMutations(['_currentGroup']),
            getDetailFn(id) {
                this.isShow = true;
                // this.flightIndex = index;
                this.flightCurId = id;
            },
            closeFn() {
                this.$emit('close');
            },
            cancelFn() {
                this.isAddGroup = false;
            },
            closeFlighFn() {
                this.isShow = false;
            }
        }
    };
</script>

<style scoped lang="less">
    .groupWrap {
        text-align: center;
        position: fixed;
        width: 312px;
        height: calc(100% - 101px);
        left: 300px;
        top: 100px;
        z-index: 1001;
        background: linear-gradient(180deg, rgba(83, 137, 196, 0.8), rgba(83, 137, 196, 0.8));
        .header {
            font-weight: 400;
            color: rgba(224, 224, 224, 1);
            text-align: left;
            font-size: 20px;
            line-height: 38px;
            cursor: pointer;
            z-index: 1001;
            width: 312px;
            height: 38px;
            background: linear-gradient(90deg, #004175, #0f6cb2);
            box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.8);
            position: relative;
            h3 {
                display: inline-block;
                padding-left: 12px;
                font-weight: normal;
                font-size: 20px;
            }
            .el-icon-close {
                position: absolute;
                top: 10px;
                right: 12px;
            }
        }
        .content {
            margin: 15px 13px;
            .flightList {
                li {
                    text-align: left;
                    padding: 5px 8px;
                    margin-bottom: 8px;
                    background: rgba(47, 84, 112, 0.6);
                    color: #e0e0e0;
                    cursor: pointer;
                }
            }
        }
    }
</style>
<style>
    .el-tree-node:focus > .el-tree-node__content {
        background-color: #c8ccd1 !important;
    }
    .el-tree-node__content:hover {
        background-color: #c8ccd1 !important;
    }
</style>

