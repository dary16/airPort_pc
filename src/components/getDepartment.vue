<template>
    <div class="mask">
        <dl class="blueContent">
            <div class="popHeader">
                <h3>选择部门</h3>
                <i class="el-icon-close" v-on:click="cancelFn"></i>
            </div>
            <div class="popContent">
                <dd>
                    <el-tree :data="treeData" node-key="id" show-checkbox @check="checkedFn" @node-click="handleNodeClick" :props="defaultProps" :default-expanded-keys="spreadArr"></el-tree>
                </dd>
                <dd>
                    <button class="addBtn" v-on:click="submitFn">确定</button>
                </dd>
            </div>
        </dl>
    </div>
</template>

<script>
    import { mapActions, mapState, mapMutations } from 'vuex';
    export default {
        data() {
            return {
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                checkedItemArr: [],
                spreadArr: []
            };
        },
        created() {
            this.getDepartmentFn();
        },
        methods: {
            ...mapActions(['_getInfo']),
            getDepartmentFn() {
                this._getInfo({
                    method: 'get',
                    api: 'getDepartment',
                    callback: res => {
                        this.treeData = JSON.parse(res.treeData);
                        this.spreadArr.push(this.treeData[0].id);
                    }
                });
            },
            checkedFn(data, node) {
                //传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象，
                //包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
                this.checkedItemArr = node.checkedNodes;
                this.getcheckedLine = data;
            },
            submitFn() {
                if(this.checkedItemArr.length == 0 && !this.getcheckedLine.id) {
                    this.message.error('请至少选择一个部门！');
                    return false;
                }
                this.$emit('checkedDepart', this.checkedItemArr);
                this.$emit('getcheckedLine', this.getcheckedLine);
            },
            cancelFn() {
                this.$emit('closeDepartFn')
            },
            //点击节点返回数据
            handleNodeClick(data) {
                this.getcheckedLine = data;
            }
        }
    };
</script>

<style scoped lang="less">
    .mask {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
        z-index: 9998;
        background: rgba(0, 0, 0, 0.3);
        .blueContent {
            position: fixed;
            width: 285px;
            height: 530px;
            background: #fff;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            z-index: 9999;
            margin: auto;
            .popHeader {
                font-weight: 400;
                color: rgba(224, 224, 224, 1);
                text-align: left;
                font-size: 20px;
                line-height: 38px;
                cursor: pointer;
                z-index: 1001;
                width: 285px;
                height: 38px;
                background: linear-gradient(90deg, rgba(0, 65, 117, 1), rgba(15, 108, 178, 1));
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
            .popContent {
                background: linear-gradient(180deg, rgba(83, 137, 196, 1), rgba(83, 137, 196, 1));
                box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.45);
                height: 490px;
                dd:first-child {
                    height: 414px;
                    display: block;
                    padding: 9px 10px 22px 12px;
                }
            }
        }
    }
    .el-tree {
        background: #144368;
        color: #e0e0e0;
        height: 400px;
    }
    .addBtn {
        display: block;
        text-align: center;
        color: #fff;
        width: 85px;
        height: 34px;
        line-height: 34px;
        border-radius: 10px;
        margin: 0px auto;
        margin-top: 15px;
        background: #2a70a4;
        box-shadow: 2px 3px 2px #619ee2 inset, 0px 3px 8px rgba(31, 79, 133, 0.8);
    }
</style>
<style>
    .blueContent .el-tree-node__content:hover {
        background-color: #0f2d4f;
    }
    .el-tree-node__content:hover {
        background-color: #0f2d4f;
    }
    .el-tree-node:focus > .el-tree-node__content {
        background-color: #0f2d4f;
    }
    .blueContent .el-tree-node__content:focus {
        background-color: #0f2d4f;
    }
</style>


