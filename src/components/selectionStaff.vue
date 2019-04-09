<template>
    <el-dialog title="人员选择" :visible.sync="isTransfer" width="600px" class="userChoose" @close="cancelFn" :modal-append-to-body='false'>
        <div class="content clearfix">
            <div class="content-left left">
                <ul class="menu clearfix">
                    <li v-on:click="mailListFn" class="liItem" :class="isMailList?'active':''">通讯录</li>
                    <li v-on:click="intercomGroupFn" class="liItem" :class="!isMailList?'active':''">对讲组</li>
                </ul>
                <div class="list">
                    <el-tree v-show="isMailList" :data="treeDataLeft" :default-expanded-keys="leftExpanded" node-key="id" show-checkbox @check="checkedFn" :props="defaultProps" ref="treeLeft"></el-tree>
                    <el-tree v-show="!isMailList" :data="treeDataRight" :default-expanded-keys="rightExpanded" node-key="id" show-checkbox ref="treeRight" @check="checkedFn" :props="defaultProps"></el-tree>
                </div>
            </div>
            <div class="content-mid left">
                <span v-on:click="moveLeftFn" style="margin-bottom:36px;">
        <img src="../assets/left.png"/>
        </span>
                <span v-on:click="moveRightFn">
        <img src="../assets/right.png"/>
        </span>
            </div>
            <div class="content-right right">
                <dl class="selectList">
                    <dd v-for="(item,index) in listShow" v-bind:class="{ active: listIndex == index }" v-on:click="deleteListFn(index,item)">{{item.label}}</dd>
                </dl>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
        <!-- <div class="btnAlone" @click="cancelFn">取 消</div> -->
        <div class="btnAlone" @click="confirmFn">确 定</div>
    </span>
    </el-dialog>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                treeDataLeft: [],
                treeDataRight: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                isMailList: true,
                checkedLeftData: [],
                checkedRightData: [],
                checkedData: [],
                listResult: [],
                listShow: [],
                leftExpanded: [],
                rightExpanded: [],
                listIndex: 0,
                currentItem: {} //列表当前选中的对象值
            };
        },
        props: ['isTransfer'],
        mounted() {
        },
        created() {
            //获取通讯录
            this.getMailListFn();
            //获取对讲组
            this.getDeptInfoFn();
        },
        methods: {
            ...mapActions(['_getInfo']),
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => { });
            },
            //获取通讯录列表
            getMailListFn() {
                this._getInfo({
                    method: 'get',
                    api: 'getMailList',
                    callback: res => {
                        this.treeDataLeft = JSON.parse(res.treeData);
                    }
                });
            },
            //获取对讲组列表
            getDeptInfoFn() {
                this._getInfo({
                    method: 'get',
                    api: 'deptInfoQuery',
                    callback: res => {
                        this.treeDataRight = JSON.parse(res.treeData);
                    }
                });
            },
            //通讯录选中的条目
            checkedFn(data, node) {
                // //传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象，
                // //包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
                if(this.isMailList) {
                    this.checkedLeftData = [];
                    node.checkedNodes.forEach(item => {
                        if(item.sip && item.sip != 'null' && item.sip != null) {
                            this.checkedLeftData.push(item)
                        }
                    })
                } else {
                    this.checkedRightData = [];
                    node.checkedNodes.forEach(item => {
                        if(item.sip && item.sip != 'null' && item.sip != null) {
                            this.checkedRightData.push(item)
                        }
                    })
                }
                //看需求，如果需求不需要保存已经选择的选项，只需要当前选中的，则不需要合并数据this.listShow
                // this.checkedData = [...this.checkedLeftData, ...this.checkedRightData, ...this.listShow];
                this.checkedData = [...this.checkedLeftData, ...this.checkedRightData];
            },
            //切换通讯录
            mailListFn() {
                this.isMailList = true;
                let arr = [];
                this.checkedLeftData.forEach(item => {
                    arr.push(item.id);
                })
                setTimeout(() => {
                    this.$refs.treeLeft.setCheckedNodes(this.checkedLeftData);
                    this.leftExpanded = arr;
                }, 0)
            },
            //切换对讲组
            intercomGroupFn() {
                this.isMailList = false;
                let arr = [];
                this.checkedRightData.forEach(item => {
                    arr.push(item.id);
                })
                setTimeout(() => {
                    this.$refs.treeRight.setCheckedNodes(this.checkedRightData);
                    this.rightExpanded = arr;
                }, 0)
            },
            //从左像右移动
            moveLeftFn() {
                //数组去重
                this.listResult = [];
                for(var i = 0; i < this.checkedData.length; i++) {
                    for(var j = i + 1; j < this.checkedData.length; j++) {
                        if(this.checkedData[i].id.substr(0, 32) === this.checkedData[j].id.substr(0, 32)) {
                            j = ++i;
                        }
                    }
                    this.listResult.push(this.checkedData[i]);
                }
                //筛选出来的this.listResult列表赋值给this.listShow，展示在右侧框里面
                this.listShow = this.listResult;
                //默认右侧列表第一个是选中的状态，点击确定需要删除，应该先赋值
                this.currentItem = this.listShow[0];
            },
            //从右像左移动
            moveRightFn() {
                if(this.currentItem.id) {
                    //取消左侧选中的数据
                    //通讯录
                    this.checkedLeftData.forEach((item, index) => {
                        if(item.id.substr(0, 32) == this.currentItem.id.substr(0, 32)) {
                            this.checkedLeftData.splice(index, 1)
                        }
                    })
                    setTimeout(() => {
                        //取消通讯录的选中
                        this.$refs.treeLeft.setCheckedNodes(this.checkedLeftData);
                    }, 0)
                    //对讲组
                    this.checkedRightData.forEach((item, index) => {
                        if(item.id.substr(0, 32) == this.currentItem.id.substr(0, 32)) {
                            this.checkedRightData.splice(index, 1)
                        }
                    })
                    setTimeout(() => {
                        //取消对讲组的选中
                        this.$refs.treeRight.setCheckedNodes(this.checkedRightData);
                    }, 0)
                    //删除右侧列表的数据
                    this.listShow.splice(this.listIndex, 1);
                    //删除一条之后，重新默认赋值最新的第一条值
                    this.currentItem = this.listShow[0];
                } else {
                    this.message.warning('请选择需要移除的项')
                }
            },
            //选中的右侧需要移除的列表
            deleteListFn(index, item) {
                this.listIndex = index;
                this.currentItem = item;
            },
            //取消，关闭弹框
            cancelFn() {
                this.$emit('cancel', false)
            },
            //确定，传参并关闭弹框
            confirmFn() {
                console.log(this.listShow, 'listShow')
                // if(this.listShow && this.listShow.length > 1) {
                //     this.message.warning('只能向一人转接，请重新选择！');
                // } else if(this.listShow && this.listShow.length == 1) {
                this.$emit('confirm', this.listShow);
                // } else {
                //     this.message.warning('请选择一人转接！');
                // }
            }
        }
    };
</script>

<style scoped lang="less">
    div.btnAlone {
        display: inline-block;
        width: 70px;
        line-height: 30px;
        font-size: 18px;
        color: #fff;
        background: linear-gradient(rgba(43, 127, 191, 1), rgba(46, 137, 205, 0.63));
        box-shadow: 2px 3px 2px #619ee2 inset, 1px 1px 4px rgba(22, 93, 174, 0.8);
        // margin-right: 15px;
        text-align: center;
        border-radius: 8px;
        margin: 0 4px;
    }
    .content {
        background: #5389c4;
        color: #e0e0e0;
        padding: 15px 20px;
        &-left {
            width: 45%;
            // border: 1px solid #eee;
            .menu {
                li {
                    float: left;
                    width: 60px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    cursor: pointer;
                    background: #144368;
                }
                li.active {
                    background: #3a6089 !important;
                }
            }
            .list {
                height: 268px;
                overflow-y: auto;
                margin-right: 20px;
                background: #3a6089;
                .el-tree {
                    background: #3a6089;
                    color: #e0e0e0;
                    padding: 5px;
                }
            }
        }
        &-mid {
            width: 10%;
            padding-top: 20%;
            span {
                display: block;
                line-height: 30px;
                text-align: center;
                cursor: pointer;
                img {
                    width: 56px;
                    display: inline-block;
                }
            }
        }
        &-right {
            width: 45%;
            // border: 1px solid #eee;
            .selectList {
                margin-top: 30px;
                height: 268px;
                overflow-y: auto;
                background: #3a6089;
                color: #e0e0e0;
                margin-left: 20px;
                dd {
                    height: 30px;
                    line-height: 30px;
                    padding: 0px 14px;
                    margin: 0px 6px;
                    cursor: pointer;
                }
                dd.active {
                    background: rgba(124, 130, 152, 0.4);
                    color: #fff;
                }
            }
        }
    }
</style>
<style>
    .userChoose .el-dialog__footer {
        padding: 0;
        background: #5389c4;
        height: 63px;
        line-height: 63px;
        border-top: 2px solid #3f6794;
        display: inline-block;
        width: 100%;
        text-align: center;
    }
    .userChoose .el-dialog__footer span {
        display: inline-block;
        height: 63px;
        line-height: 63px;
        width: 100%;
    }
</style>

