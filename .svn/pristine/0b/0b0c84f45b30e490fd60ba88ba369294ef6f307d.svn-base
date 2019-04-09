<template>
    <div>
        <div class="mask">
            <div class="content clearfix popContent">
                <div class="clearfix popTitle">
                    <div class="left left-menu">
                        <div class="mainTitle">
                            即时消息列表
                            <span v-on:click="createFn" class="el-icon-plus"></span>
                        </div>
                        <div class="linesList">
                            <div class="line" v-bind:class="{active:indexed==index}" v-for="(item,index) in list" v-on:click="historyFn(item.caller,item.callee,index)">
                                <ul class="list">
                                    <li class="ellipsis title">{{item.title}}<span>{{item.time}}</span></li>
                                    <li class="ellipsis subContent">{{item.content}}</li>
                                </ul>
                                <div class="more">
                                    <span class="num">4</span>
                                    <span class="oth">4</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="right left-list">
                        <div class="mainTitle">
                            孟醒测试一（2000）
                        </div>
                        <div class="mainContent clearfix">
                            <div v-for="item in showList">
                                <dl class="con-right" v-if="item.caller==currentSip.userSip">
                                    <dt>{{item.timeName}}</dt>
                                    <dd>{{item.content}}</dd>
                                </dl>
                                <dl class="con-left" v-else>
                                    <dt>{{item.timeName}}</dt>
                                    <dd>{{item.content}}</dd>
                                </dl>
                            </div>
                        </div>
                        <div class="mainFooter" @keyup.enter="sendSmsFn">
                            <textarea v-model="setContent"></textarea>
                            <el-button class="send" size="mini" v-on:click="sendSmsFn">发送</el-button>
                        </div>
                        <div v-on:click="closeFn" class="closeButton el-icon-close"></div>
                    </div>
                </div>
            </div>
        </div>
        <v-selection-staff v-if="isTransfer" v-bind:isTransfer="isTransfer" v-on:cancel="cancelFn" v-on:confirm="confirmFn"></v-selection-staff>
    </div>
</template>

<script>
    import { mapActions, mapState, mapMutations } from 'vuex';
    export default {
        data() {
            return {
                isTransfer: false,
                currentDate: new Date(),
                afterDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 1),
                showList: [],
                setContent: '',
                list: [{
                    'caller': '4000',//发送者
                    'callee': '4001',//接受者
                    'time': '当天',
                    'title': '孟醒测试4000',
                    'content': '4000向4001发送'
                }, {
                    'caller': '4000',//发送者
                    'callee': '4002',//接受者
                    'time': '当天',
                    'title': '孟醒测试4000',
                    'content': '4000向4002发送'
                }],
                indexed: 0,
                calleed: '',
                leftMenuData: []
            };
        },
        props: [''],
        computed: {
            ...mapState(['currentSip', 'newMsgData'])
        },
        mounted() {

        },
        created() {
            this.historyFn(this.list[0].caller, this.list[0].callee, this.indexed);
            this.calleed = this.list[0].callee;
            this.leftMenuData = JSON.parse(JSON.stringify(this.newMsgData));
            console.log(this.leftMenuData);
        },
        methods: {
            ...mapActions(['_getInfo']),
            //发送短信
            sendSmsFn() {
                if(!this.util.trim(this.setContent)) {
                    this.message.error('请输入发送的内容！');
                    return false;
                }
                this.cmtWsClient.sendSMS(this.calleed, this.setContent);
                this.showList.push({ 'callee': this.calleed, 'caller': this.currentSip.userSip, 'content': this.setContent, 'timeName': this.util.formatDate('', 3) });
                this.setContent = "";
            },
            //关闭聊天框
            closeFn() {
                this.$emit('close', false)
            },
            //显示选择人员框
            createFn() {
                this.isTransfer = true;
            },
            //关闭选人员的框
            cancelFn(val) {
                this.isTransfer = val;
            },
            //关闭选人员框，并取选中人员的值
            confirmFn(list) {
                this.isTransfer = false;
                console.log(list)
            },
            //查看历史
            historyFn(caller, callee, index) {
                this.calleed = callee;
                this.indexed = index;
                this._getInfo({
                    ops: {
                        "callee": callee,
                        "caller": caller,
                        "type": "sms",
                        "startDate": this.util.getFormatDate(this.afterDate),
                        "endDate": this.util.getFormatDate(this.currentDate)
                    },
                    api: 'getRecorder',
                    callback: res => {
                        this.showList = res.sms;
                    }
                });
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
        z-index: 1;
        background: rgba(0, 0, 0, 0.3);
        .content {
            position: fixed;
            width: 50%;
            height: 680px;
            background: #fff;
            left: 25%;
            top: 100px;
            z-index: 2;
            .left-menu {
                width: 30%;
                background: #e8e6e6;
                height: 100%;
                text-align: left;
                .mainTitle {
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                    position: relative;
                    span {
                        position: absolute;
                        width: 24px;
                        height: 24px;
                        line-height: 24px;
                        background: #dcd9d8;
                        border-radius: 4px;
                        color: #585858;
                        right: 10px;
                        top: 50%;
                        margin-top: -12px;
                        cursor: pointer;
                    }
                }
                .linesList {
                    overflow-y: auto;
                    height: 630px;
                    .line {
                        position: relative;
                        .list {
                            margin-right: 72px;
                            padding: 12px;
                            padding-right: 0px;
                            cursor: pointer;
                            li {
                                line-height: 28px;
                            }
                            li.title {
                                color: #2d2d2c;
                                position: relative;
                                padding-right: 40px;
                                span {
                                    position: absolute;
                                    color: #999999;
                                    top: 0;
                                    right: 0;
                                    z-index: 5;
                                }
                            }
                            li.subContent {
                                color: #999999;
                                font-size: 14px;
                            }
                        }
                        .more {
                            position: absolute;
                            z-index: 4;
                            top: 50%;
                            margin-top: -10px;
                            right: 10px;
                            span {
                                width: 20px;
                                height: 20px;
                                line-height: 20px;
                                border-radius: 100%;
                                display: inline-block;
                                color: #fff;
                                text-align: center;
                                font-size: 12px;
                            }
                            span.num {
                                background: red;
                                margin-right: 4px;
                            }
                            span.oth {
                                background: #8f8f8f;
                            }
                        }
                    }
                    .line:hover {
                        background: #cac8c6;
                    }
                    .active {
                        background: #cac8c6;
                    }
                }
            }
            .left-list {
                width: 70%;
                height: 100%;
                background: #f5f5f5;
                position: relative;
                .closeButton {
                    position: absolute;
                    width: 36px;
                    height: 36px;
                    line-height: 36px;
                    top: 0px;
                    right: 0px;
                    z-index: 6;
                    font-size: 18px;
                    cursor: pointer;
                }
                .mainTitle {
                    height: 50px;
                    line-height: 50px;
                    text-align: left;
                    text-indent: 2em;
                    border-bottom: 1px solid #e7e7e7;
                }
                .mainContent {
                    height: 448px;
                    padding: 24px 24px;
                    overflow-y: scroll;
                    dl {
                        margin-top: 6px;
                        overflow: hidden;
                        dt {
                            line-height: 30px;
                            height: 30px;
                        }
                        dd {
                            line-height: 24px;
                            padding: 6px 8px;
                            max-width: 400px;
                            border-radius: 3px;
                        }
                    }
                    dl.con-left {
                        text-align: left;
                        dd {
                            float: left;
                            background: #fff;
                            border: 1px solid #ededed;
                        }
                    }
                    dl.con-right {
                        text-align: right;
                        dd {
                            float: right;
                            background: #9eea6a;
                        }
                    }
                }
                .mainFooter {
                    background: #fff;
                    height: 176px;
                    border-top: 1px solid #ececec;
                    textarea {
                        width: 100%;
                        height: 126px;
                        overflow-y: auto;
                        resize: none;
                        line-height: 24px;
                        padding: 10px;
                    }
                    .send {
                        float: right;
                        margin-top: 8px;
                        margin-right: 24px;
                    }
                }
            }
        }
    }
</style>
