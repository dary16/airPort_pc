<template>
    <div class="vedioPop">
        <div class="btnAlone w70" v-on:click="videoCallFn">视频</div>
        <!--视频通话-->
        <el-dialog title="视频通话" :visible.sync="videoVisible" width="30%" :before-close="handleClose" :modal-append-to-body='false'>
            <dl class="voiceConnectShow clearfix">
                <dd>
                    <span>发起人</span>
                    <img src="../../assets/caller.png" />
                    <span class="name">{{currentSip.userName}}({{currentSip.userSip}})</span>
                </dd>
                <dd class="pic">
                    <img src="../../assets/connect.png" />
                    <span>等待接通中...</span>
                </dd>
                <dd>
                    <span>接收人</span>
                    <img src="../../assets/called.png" />
                    <span class="name" v-for="item in checkedItem">{{item.label}}({{item.sip}})</span>
                </dd>
            </dl>
            <div slot="footer" class="dialog-footer">
                <div class="btnAlone" @click="closeVideoFn">关闭</div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapActions, mapState, mapMutations } from 'vuex';
    export default {
        data() {
            return {
                videoVisible: false,
                micState: false,
                callId: '',
                isSendVideo: true
            }
        },
        mounted() {
        },
        computed: {
            ...mapState(['callMe', 'callMeVideo', 'checkedArr', 'aloneUserVideoSip', 'currentSip', 'checkedItem', 'getCallId'])
        },
        watch: {
            callMeVideo() {
                if(this.callMeVideo) {
                    // this.videoVisible = true;
                    var _this = this;
                    //视频未接通挂断回调
                    this.callback.onEventDisconnected = function(callId) {
                        _this.videoVisible = false;
                    }
                }
            },
            aloneUserVideoSip() {
                if(this.aloneUserVideoSip.length != 0) {
                    this.videoCallFn();
                }
            }
        },
        created() {

        },
        methods: {
            ...mapMutations(['_callMeVideoFn']),
            videoCallFn() {
                if(this.checkedArr.length > 1) {
                    this.videoMeetFn(this.checkedArr.join('_'));
                    // this.message.error('你选择了' + this.checkedArr.length + '个用户,暂时未处理！')
                } else if(this.checkedArr.length == 1) {
                    this.dialVideofn(this.checkedArr[0]);
                } else {
                    this.message.warning('请在通讯录选择')
                }
            },
            //多个用户
            videoMeetFn(sips) {
                var _this = this;
                //视频通话
                //拨打视频电话
                this.cmtWsClient.createVideoMeet(sips, 0, 0);
                //显示视频通话窗口
                this.videoVisible = true;

                //接通视频的回调
                this.callback.onEventConnected = function(code) {
                    _this.callId = code.callid;
                }

                this.callback.onEventVideoMeetJoin = function(strMeetID, strActionSip, strUserNum, bAdminFlag) {
                    if(bAdminFlag != 1) {
                        _this.videoVisible = false;
                    }
                }
            },
            //针对选中一个用户的时候视频通话
            dialVideofn(sip) {
                var _this = this;
                //视频通话
                //拨打视频电话


                this.cmtWsClient.makeVideoCall(sip, 0, 0);
                //显示视频通话窗口
                this.videoVisible = true;

                //接通视频的回调
                this.callback.onEventConnected = function(code) {
                    _this.videoVisible = false;
                    _this.callId = code.callid;
                }

                //视频未接通挂断回调
                this.callback.onEventDisconnected = function(callId) {
                    _this.videoVisible = false;
                }
            },
            handleClose() {
                this.$confirm('确认关闭视频？')
                    .then(_ => {
                        this.closeVideoFn();
                    })
                    .catch(_ => { });
            },
            //关闭按钮
            closeVideoFn() {
                if(this.callMe.callId) {
                    this.callId = this.callMe.callId;
                    //挂断视频
                    this.cmtWsClient.hangUpCall(this.callMe.callId);
                } else {
                    // if(!this.callId) {
                    this.callId = this.getCallId
                    // }
                }
                this.cmtWsClient.hangUpCall(this.callId);
                this._callMeVideoFn(false);
                //关闭窗口
                this.videoVisible = false;
            }
        }
    };
</script>

<style scoped lang="less">
    .w70 {
        width: 70px !important;
    }
    div.btnAlone {
        width: auto;
        line-height: 30px;
        font-size: 18px;
        color: #fff;
        background: linear-gradient(rgba(43, 127, 191, 1), rgba(46, 137, 205, 0.63));
        box-shadow: 2px 3px 2px #619ee2 inset, 1px 1px 4px rgba(22, 93, 174, 0.8);
        // margin-right: 15px;
        text-align: center;
        border-radius: 8px;
        margin: 0 4px;
        padding: 2px 6px;
        display: inline-block;
        cursor: pointer;
    }
    .voiceConnectShow {
        dd {
            float: left;
            width: 40%;
            span {
                display: block;
                font-size: 16px;
                line-height: 40px;
            }
            span.name {
                font-size: 18px;
                line-height: 30px;
            }
        }
        dd:nth-child(2) {
            width: 20%;
            img {
                margin-top: 50px;
            }
            span {
                display: block;
                line-height: 36px;
            }
            // line-height: 122px;
        }
    }
</style>
<style>
    .vedioPop .el-dialog__header {
        padding: 10px 20px;
        background: linear-gradient(90deg, #004175, #0f6cb2);
        box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.8);
    }
    .vedioPop .el-dialog__header .el-dialog__title {
        color: #e0e0e0;
        font-size: 20px;
    }
    .vedioPop .el-dialog__headerbtn {
        top: 13px;
    }
    .vedioPop .el-dialog__headerbtn .el-dialog__close {
        color: #e0e0e0;
        font-size: 20px;
    }
    .vedioPop .el-dialog__body {
        background: #5389c4;
        box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.45);
        padding: 11px 16px;
        color: #e0e0e0;
        font-size: 18px;
        min-height: 100px;
    }
    .vedioPop .el-dialog__footer {
        background: #5389c4;
        border-top: 2px solid #3f6794;
        padding: 0;
    }
    .vedioPop .el-dialog__footer div.dialog-footer {
        display: inline-block;
        height: 63px;
        line-height: 63px;
        width: 100%;
        text-align: center;
    }
</style>
