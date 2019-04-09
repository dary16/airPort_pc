<template>
    <div class="userControl">
        <el-tree style="height: 170px;" :data="treeData" accordion node-key="id" show-checkbox @check="checkedFn" :props="defaultProps" :filter-node-method="filterNode" ref="tree2" :default-expanded-keys="spreadArr" :default-checked-keys="setCheckedNodes"></el-tree>
        <ul class="fixedBtns">
            <li v-on:click="fixedGroupFn">固定对讲组</li>
            <li v-on:click="fixedVideoFn">固定监控视频</li>
        </ul>
        <div class="operationArea">
            <el-input placeholder="查找" v-model="filterText" suffix-icon="el-icon-search" size="small"></el-input>
            <div class="btns clearfix">
                <!--语音通话-->
                <v-voice-oper style="display: inline-block;"></v-voice-oper>
                <!--视频通话-->
                <v-video-oper style="display: inline-block;"></v-video-oper>
                <!--即时信息-->
                <v-msg-oper style="display: inline-block;"></v-msg-oper>
            </div>
        </div>
        <v-intercom-group v-if="num!=0 && isShowIntercom" v-on:close="intercomCloseFn"></v-intercom-group>
        <v-video-group v-if="num!=0 && isShowVideo" v-on:close="closeFn"></v-video-group>
    </div>
</template>

<script>
    import { mapActions, mapState, mapMutations } from 'vuex';
    export default {
        data() {
            return {
                filterText: '',
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                treeId: '',
                checkedArr: [], //通讯录选中的sip值
                checkedItemArr: [], //通讯录选中的item值
                sips: [],
                timer2: null,
                isShowIntercom: false,
                spreadArr: [],
                isShowVideo: false,
                setCheckedNodes: []
            }
        },
        props: ['num'],
        computed: {
            ...mapState(['setChecked', 'getSipData', 'getRectangle'])
        },
        created() {
            this.getMailListFn();
        },
        watch: {
            setChecked() {
                if(this.setChecked == 1) {
                    this.$refs.tree2.setCheckedKeys([this.treeId]);
                    this._setChecked(3);
                } else if(this.setChecked == 2) {
                    this.$refs.tree2.setCheckedKeys([]);
                    this._setChecked(3);
                }
            },
            filterText(val) {
                this.$refs.tree2.filter(val);
            },
            getRectangle() {
                if(this.getRectangle.length > 0) {
                    this.setCheckedNodes = this.getRectangle;
                }
            }
        },
        methods: {
            ...mapMutations(['_setChecked', '_setCheckedArr', '_setCheckedItemArr', '_setUserList']),
            ...mapActions(['_getInfo']),
            filterNode(value, data) {
                if(!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            getMailListFn() {
                this._getInfo({
                    method: 'get',
                    api: 'getMailList',
                    callback: res => {
                        this.treeData = JSON.parse(res.treeData);
                        this._setUserList(this.treeData)
                        this.treeId = this.treeData[0].id;
                        this.spreadArr.push(this.treeData[0].id);
                    }
                });
            },
            checkedFn(data, node) {
                //传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象，
                //包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
                this.checkedArr = [];
                this.checkedItemArr = [];
                node.checkedNodes.forEach(item => {
                    if(item.sip && item.sip != 'null' && item.sip != null) {
                        this.checkedArr.push(item.sip);
                        //即时信息需要的数据
                        this.checkedItemArr.push(item);
                    }
                })
                this.checkedItemArr.forEach(item => {
                    item.isConnectColor = false
                })
                this._setCheckedArr(this.checkedArr);
                this._setCheckedItemArr(this.checkedItemArr);
            },
            //固定对讲组
            fixedGroupFn() {
                this.$emit('curNum', 2)
                if(this.isShowVideo) {
                    this.isShowVideo = false;
                }
                this.isShowIntercom = true;
            },
            intercomCloseFn() {
                this.$emit('curNum', 2)
                this.isShowIntercom = false;
            },
            fixedVideoFn() {
                this.$emit('curNum', 2)
                if(this.isShowIntercom) {
                    this.isShowIntercom = false;
                }
                this.isShowVideo = true;
            },
            //关闭固定监控视频
            closeFn() {
                this.$emit('curNum', 2)
                this.isShowVideo = false;
            }
        },
        destroyed() {
            clearInterval(this.timer2);
        }
    };
</script>

<style scoped lang="less">
    .operationArea {
        background: rgba(255, 255, 255, 0.3);
        margin-bottom: 8px;
        padding: 12px 16px 0 16px;
        .btns {
            text-align: center;
            padding: 11px 0px;
        }
    }
    .el-tree {
        background: none;
        color: #fff;
        font-size: 18px;
        height: 240px;
        overflow-y: auto;
        padding: 4px 0px;
    }
    .fixedBtns {
        li {
            width: 100%;
            height: 33px;
            line-height: 33px;
            text-align: center;
            color: #fff;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(0, 0, 0, 0.06);
            margin-bottom: 9px;
            font-size: 18px;
            cursor: pointer;
        }
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
