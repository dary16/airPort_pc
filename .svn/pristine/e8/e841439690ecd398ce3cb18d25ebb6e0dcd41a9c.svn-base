<template>
    <div class="layerShow">
        <div class="popTitle">
            <h3>显示图层信息</h3>
            <i class="el-icon-close" v-on:click="cancleFn"></i>
        </div>
        <div class="popContent clearfix">
            <div class="left">
                <el-checkbox-group v-model="checkList">
                    <el-checkbox label="carObj">车辆</el-checkbox>
                    <!-- <img src="../../assets/layer/car.png" alt=""> -->
                    <el-checkbox label="peopleObj">人员</el-checkbox>
                    <!-- <img src="../../assets/layer/people.png" alt=""> -->
                </el-checkbox-group>
            </div>
            <div class="right">
                <el-tree style="background:none;" ref="departmentTree" :data="treeData" node-key="id" show-checkbox :props="defaultProps" :default-expanded-keys="spreadArr" :default-checked-keys="spreadArr"></el-tree>
            </div>
        </div>
        <div class="btnCommit">
            <button class="newBtn" @click="showLayerFn">显示图层</button>
        </div>
    </div>
</template>

<script>
    import { mapMutations, mapActions } from 'vuex';
    export default {
        data() {
            return {
                checkList: ['carObj', 'peopleObj'],
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                spreadArr: [],
                checkedItemArr: [],
                checkedItemArrId: [],
                req: {}
            };
        },
        props: [''],
        created() {
            this.getDepartmentFn();
        },
        methods: {
            ...mapActions(['_getInfo']),
            //弹框取消按钮
            cancleFn(val) {
                this.$emit('layerClose')
            },
            //获取部门
            getDepartmentFn() {
                this._getInfo({
                    method: 'get',
                    api: 'getDepartment',
                    callback: res => {
                        this.treeData = JSON.parse(res.treeData);
                        //设置默认展开和默认选中
                        this.spreadArr.push(this.treeData[0].id);
                    }
                });
            },
            //显示图层
            showLayerFn() {
                this.checkedItemArrId = [];
                this.checkedItemArr = this.$refs.departmentTree.getCheckedNodes();
                this.checkedItemArr.forEach(item => {
                    this.checkedItemArrId.push(item.id);
                })
                this.req.deptId = this.checkedItemArrId.join(',');
                this.req.carShow = this.checkList.indexOf('carObj') == -1 ? 'hide' : 'show';
                this.req.personShow = this.checkList.indexOf('peopleObj') == -1 ? 'hide' : 'show';
                this.$emit('layerData', this.req)
            },
        }
    }
</script>

<style scoped lang="less">
    .layerShow {
        position: absolute;
        top: 150px;
        right: 10px;
        background: linear-gradient(180deg, rgba(83, 137, 196, 1), rgba(83, 137, 196, 1));
        box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.45);
        width: 685px;
        // height: 234px;
        z-index: 99999;
        line-height: 40px;
        .popTitle {
            font-weight: 400;
            color: rgba(224, 224, 224, 1);
            text-align: left;
            font-size: 20px;
            line-height: 38px;
            cursor: pointer;
            z-index: 1001;
            width: 685px;
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
        .el-col {
            text-align: left;
            padding-left: 15px;
        }
        .popContent {
            border-bottom: 2px solid #3f6794;
            .left {
                width: 50%;
                // text-align: center;
                // padding-top: 6px;
                .el-checkbox {
                    color: #e0e0e0;
                    margin-right: 0;
                    margin-bottom: 0;
                    display: block;
                    margin-left: 36px;
                    span {
                        font-size: 18px !important;
                    }
                    .el-checkbox__label {
                        display: inline-block;
                        font-size: 30px !important;
                    }
                }
            }
            .right {
                width: 50%;
            }
        }
        .btnCommit {
            text-align: center;
            height: 72px;
            line-height: 72px;
            .newBtn {
                background: url(../../assets/btn-lg.png) no-repeat;
                width: 116px;
                height: 37px;
                line-height: 37px;
                background-size: 100% 100%;
                color: #e0e0e0;
                font-size: 18px;
            }
        }
    }
</style>
