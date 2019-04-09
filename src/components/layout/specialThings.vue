<template>
    <div class="special">
        <!--未启动预案-->
        <div class="subClickList" v-if="isActived==0">
            <ul>
                <li v-for="(item,index) in specialList" v-on:click="planStepFn(item.planStep,item.id,index,item.planName)" v-bind:class="{curFlightLine:specialIndex==index}">
                    {{item.planName}}
                    <img v-if="specialIndex==index" src="../../assets/after.png" />
                    <img v-else src="../../assets/before.png" />
                </li>
            </ul>
        </div>
        <!-- 已启动预案 -->
        <div class="activated" v-if="isActived==1">
            <ul>
                <li v-on:click="planStepFn(activatedList.planInfo,activatedList.configId,0,activatedList.planName)">
                    {{activatedList.planName}}
                </li>
            </ul>
            <div class="subActivatedList">
                <dl v-for="(item,index) in activatedChildList">
                    <dt>第{{item.planStep}}步、{{item.planTitle}}</dt>
                    <dd v-for="subItem in item.child " v-on:click="subPlanStepFn(subItem,item.planStep)">
                        第{{parseInt(subItem.contentStep)+1}}步、{{subItem.planEquipName}}
                    </dd>
                </dl>
            </div>
        </div>
        <!-- 启动预案弹框 -->
        <div class="mask" v-if="secondList.length">
            <div class="secondShow">
                <div class="popTitle">
                    <h3>{{specialName}}</h3>
                    <i class="el-icon-close" v-on:click="cancelFn"></i>
                </div>
                <div class="popContent">
                    <ul>
                        <li v-for="item in secondList ">
                            <h2><span>第{{item.planStep}}步</span> {{item.planTitle}}</h2>
                            <h3 v-for="subItem in item.child">
                                第{{parseInt(subItem.contentStep)+1}}步 {{subItem.planEquipName}}
                            </h3>
                        </li>
                    </ul>
                    <!--启动预案-->
                    <div class="btnGroup" v-if="isActived==0">
                        <button class="newBtn" v-on:click="startFn ">启动预案</button>
                        <button class="newBtn" v-on:click="previewFn ">预演预案</button>
                    </div>
                    <!--关闭预案-->
                    <div class="btnGroup" v-if="isActived==1">
                        <button class="newBtn" v-on:click="closeFn ">关闭预案</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 启动预案后的弹框 -->
        <div class="mask" v-if="isActivedPop">
            <div class="activedPop">
                <div class="popTitle">
                    <h3>第{{parseInt(activedItem.contentStep)+1}}步</h3>
                    <i class="el-icon-close" v-on:click="closeActivedPopFn"></i>
                </div>
                <div class="popContent">
                    {{activedItem.planEquipName}}
                </div>
                <div class="btnGroup">
                    <!-- <button class="newBtn" v-on:click="closeFn">关闭预案</button> -->
                    <button class="newBtn" v-on:click="executeStepFn">执行</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState, mapMutations } from 'vuex';
    export default {
        data() {
            return {
                specialList: [],
                secondList: [],
                planId: '',
                activatedList: {},
                isActived: 0,
                specialIndex: -1,
                activatedChildList: [],
                isActivedPop: false,
                activedItem: {},
                parentStep: '',
                specialName: ''
            }
        },
        props: ['closeShow'],
        computed: {
            ...mapState(['setChecked', 'getSipData'])
        },
        created() {
            //判断是否有预案
            this.isPlanFn();
        },
        watch: {
            closeShow() {
                if(this.closeShow) {
                    this.specialIndex = -1;
                }
            }
        },
        methods: {
            ...mapMutations(['_setChecked', '_setCheckedArr', '_setCheckedItemArr']),
            ...mapActions(['_getInfo']),
            isPlanFn() {
                this._getInfo({
                    api: 'isPlan',
                    callback: res => {
                        this.isActived = res[0];
                        if(this.isActived == '1') {
                            this.planId = res[1];
                            //有已启动预案
                            this.getStartListFn()
                        } else {
                            //预案列表
                            this.getSpecialListFn();
                        }
                    }
                });
            },
            //预案列表
            getSpecialListFn() {
                this._getInfo({
                    api: 'getSpecialList',
                    callback: res => {
                        this.specialList = res.rows;
                    }
                });
            },
            planStepFn(item, id, index, name) {
                this.planId = id;
                this.secondList = JSON.parse(item).planParentList;
                this.specialIndex = index;
                this.specialName = name;
            },
            //已启动预案点击弹框
            subPlanStepFn(subItem, parentStep) {
                this.parentStep = parentStep;
                this.activedItem = subItem;
                this.isActivedPop = true;
            },
            //关闭启动预案点击弹框
            closeActivedPopFn() {
                this.isActivedPop = false;
            },
            //取消
            cancelFn() {
                this.secondList = [];
            },
            //启动预案
            startFn() {
                this._getInfo({
                    ops: {
                        "planConfigId": this.planId,
                        "planExecMode": "正式"
                    },
                    api: 'startPlan',
                    callback: res => {
                        this.message.success('启动成功!')
                        this.secondList = [];
                        //判断是否有预案
                        this.isPlanFn();
                    }
                });
            },
            //预演预案
            previewFn() {
                this._getInfo({
                    ops: {
                        "planConfigId": this.planId,
                        "planExecMode": "演习"
                    },
                    api: 'startPlan',
                    callback: res => {
                        this.message.success('预演启动成功!')
                        this.secondList = [];
                        //判断是否有预案
                        this.isPlanFn();
                    }
                });
            },
            //关闭预案
            closeFn() {
                this._getInfo({
                    ops: {
                        "configId": this.planId
                    },
                    api: 'closePlan',
                    callback: res => {
                        this.message.success('关闭成功!');
                        this.secondList = [];
                        // this.isActivedPop = false;
                        //判断是否有预案
                        this.isPlanFn();
                        this.specialIndex = -1;
                    }
                });
            },
            //获取已经启动的预案列表
            getStartListFn() {
                this._getInfo({
                    ops: {
                        "planConfigId": this.planId
                    },
                    api: 'activatedPlanList',
                    callback: res => {
                        //获取已启动预案列表
                        this.activatedList = res;
                        this.activatedChildList = JSON.parse(res.planInfo).planParentList;
                    }
                });
            },
            executeStepFn() {
                this._getInfo({
                    ops: {
                        "configId": this.planId,
                        "parentStep": this.parentStep,
                        "childStep": this.activedItem.contentStep
                    },
                    api: 'executeStep',
                    callback: res => {
                        this.message.success('执行成功!')
                        this.isActivedPop = false;
                        //判断是否有预案
                        this.isPlanFn();
                    }
                });
            }
        }
    };
</script>

<style scoped  lang="less">
    .special {
        position: relative;
        .mask {
            position: fixed;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 99999;
        }
        .secondShow {
            position: fixed;
            width: 608px;
            height: 568px;
            top: 15%;
            left: 0;
            right: 0;
            margin: 0 auto;
            z-index: 100000;
            background: linear-gradient(180deg, rgba(83, 137, 196, 1), rgba(83, 137, 196, 1));
            box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.45);
            .popTitle {
                font-weight: 400;
                color: rgba(224, 224, 224, 1);
                text-align: left;
                font-size: 20px;
                line-height: 38px;
                cursor: pointer;
                z-index: 1001;
                width: 608px;
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
                height: 515px;
                ul {
                    overflow: auto;
                    height: 440px;
                    width: 582px;
                    background: #3a6089;
                    padding: 15;
                    margin: 15px 13px;
                    color: #e0e0e0;
                }
                .btnGroup {
                    border-top: 2px solid #3f6794;
                    text-align: center;
                    height: 60px;
                    line-height: 60px;
                    .newBtn {
                        background: url(../../assets/btn-lg.png) no-repeat;
                        width: 116px;
                        height: 37px;
                        line-height: 37px;
                        background-size: 100% 100%;
                        color: #e0e0e0;
                        // padding: 11px 23px 9px 24px;
                    }
                }
            }
            li {
                padding-left: 15px;
                h2 {
                    line-height: 36px;
                }
                h3 {
                    line-height: 36px;
                    padding-left: 12px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-radius: 6px;
                    background: #4e7095;
                    margin-bottom: 3px;
                    margin-left: 30px;
                    width: 490px;
                    a {
                        float: right;
                    }
                }
            }
        }
        .activated {
            padding: 10px;
            ul {
                li {
                    margin-bottom: 3px;
                    height: 42px;
                    line-height: 38px;
                    font-size: 18px;
                    color: #e0e0e0;
                    border: 2px solid #0b5994;
                    border-radius: 5px;
                    padding: 0 20px;
                    cursor: pointer;
                    background: linear-gradient(to right, #0e6eb8, #2b94d1);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    position: relative;
                }
            }
            .subActivatedList {
                color: #e0e0e0;
                padding: 10px 10px 20px 10px;
                border-radius: 5px;
                background: rgba(0, 0, 0, 0.3);
                dl {
                    dt {
                        font-weight: normal;
                        font-size: 18px;
                        height: 34px;
                        line-height: 34px;
                    }
                    dd {
                        font-size: 16px;
                        text-indent: 1em;
                        background: rgba(255, 255, 255, 0.12);
                        border-radius: 5px;
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        margin-bottom: 3px;
                        cursor: pointer;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        position: relative;
                    }
                }
            }
        }
        .activedPop {
            position: fixed;
            width: 420px;
            height: 380px;
            background: linear-gradient(180deg, rgba(83, 137, 196, 1), rgba(83, 137, 196, 1));
            box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.45);
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            z-index: 100000;
            .popTitle {
                font-weight: 400;
                color: rgba(224, 224, 224, 1);
                text-align: left;
                font-size: 20px;
                line-height: 38px;
                cursor: pointer;
                z-index: 1001;
                width: 420px;
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
                color: #e0e0e0;
                height: 250px;
                margin: 13px 10px;
                background: #3a6089;
                padding: 5px 10px;
                overflow: auto;
            }
            .btnGroup {
                border-top: 2px solid #3f6794;
                text-align: center;
                height: 60px;
                line-height: 60px;
                .newBtn {
                    background: url(../../assets/btn-lg.png) no-repeat;
                    width: 116px;
                    height: 37px;
                    line-height: 37px;
                    background-size: 100% 100%;
                    color: #e0e0e0;
                }
            }
        }
    }
</style>
