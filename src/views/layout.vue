<template>
    <div class="g-home-layout">
        <!--main地图-->
        <v-map-show></v-map-show>
        <!--top-->
        <v-layout-top></v-layout-top>
        <!--left-->
        <v-layout-left></v-layout-left>

        <div class="g-layout" style="display: none;">

            <div class="g-layout-main">

                <v-bottom-tab></v-bottom-tab>
            </div>
            <el-button v-if="msgList.length" class="newMessage" type="danger" circle v-on:click="msgListFn">{{this.msgList.length}}</el-button>
            <v-message-box v-if="isShowMsgBox" v-on:close="closeFn"></v-message-box>
            <el-button class="tempSet" type="success" v-on:click="tempSetFn">操作台</el-button>
            <div class="operation" v-if="isShowTable">
                <h2>操作台</h2>
                <ul class="btns flex">
                    <li>
                        <el-button type="success" v-on:click="sysBtnFn">系统管理</el-button>
                        <el-button type="success" v-on:click="setNoticeBtnFn">发送通知</el-button>
                        <br/>
                        <el-button type="success" v-on:click="setAlarmBtnFn">发送告警</el-button>
                        <el-button type="success" v-on:click="oneKeyAlarmFn">一键告警</el-button>
                    </li>
                    <li>
                        <v-clock-set></v-clock-set>
                    </li>
                    <li>d</li>
                    <li>d</li>
                </ul>
                <span class="tempClose" v-on:click="tempCloseFn">关闭</span>
            </div>
            <!-- 显示通知内容 -->
            <dl class="noticeShow" v-if="notice">
                <dd v-for="item in noticeList">
                    <span>通知内容：{{item.noticeComment}}</span>
                    <span>通知类型：{{item.noticeType}}</span>
                    <span>通知标题：{{item.noticeTitle}}</span>
                    <a v-on:click="moreNoticeBtn(item)">查看</a>
                </dd>
            </dl>
            <!-- 显示告警内容 -->
            <dl class="noticeShow" v-if="alarm">
                <dd v-for="item in alarmList">
                    <span>告警内容：{{item.alermComment}}</span>
                    <span>告警状态：{{item.alermStatus}}</span>
                    <span>登录用户的名称：{{item.userName}}</span>
                    <a v-on:click="moreAlarmBtn(item)">查看</a>
                </dd>
            </dl>
            <!--发送通知-->
            <v-pop-box v-dialogDrag v-if="isShowBox" v-on:save="saveFn" v-on:cancle="cancleFn" v-on:getBtnFn="btnsFn" v-bind:popData="popData" v-bind:isUpload="true" v-bind:formData="editDate"></v-pop-box>
            <!--发送告警-->
            <v-pop-box v-dialogDrag v-if="isShowAlarm" v-on:save="saveAlarmFn" v-on:cancle="cancleAlarmFn" v-on:getBtnFn="btnsFn" v-bind:popData="popAlarmData" v-bind:formData="editDate"></v-pop-box>
            <!--一键告警-->
            <v-pop-box v-dialogDrag v-if="isShowOneKeyAlarm" v-on:save="saveOneKeyAlarmFn" v-on:cancle="cancleOneKeyAlarmFn" v-on:getBtnFn="btnsFn" v-bind:popData="popOneKeyAlarmData" v-bind:formData="editDate"></v-pop-box>
            <!--获取人员-->
            <v-get-user v-if="isUser" v-on:checkedUser="getUserList" v-on:closeUserFn="cancelUserListFn"></v-get-user>
            <!--获取部门-->
            <v-get-department v-if="isDepartment" v-on:checkedDepart="getDepartList" v-on:closeDepartFn="cancelDepartListFn"></v-get-department>
        </div>
    </div>
</template>
<script>
    import { mapState, mapMutations, mapActions } from 'vuex';
    export default {
        data() {
            return {
                isUser: false,
                isDepartment: false,
                msgList: [],
                isShowMsgBox: false,
                isShowTable: false,
                isShowBox: false,
                popData: {
                    'titleTotal': '新增通知',
                    'options': [{
                        'status': 1,
                        'title': '通知内容',
                        'placeholder': '请输入通知内容',
                        'val': 'noticeComment'
                    }, {
                        'status': 2,
                        'title': '通知类型',
                        'placeholder': '请输入通知类型',
                        'val': 'noticeType',
                        'list': [
                            {
                                value: '通知',
                                label: '通知'
                            }, {
                                value: '公告',
                                label: '公告'
                            }, {
                                value: '指令',
                                label: '指令'
                            }]
                    }, {
                        'status': 1,
                        'title': '通知标题',
                        'placeholder': '请输入通知标题',
                        'val': 'noticeTitle'
                    }, {
                        'status': 11,
                        'title': '接受通知部门',
                        'placeholder': '请选择接受通知部门',
                        'val': 'deptsId',
                        'fn': 'getDeptsFn'
                    }]
                },
                popAlarmData: {
                    'titleTotal': '新增告警',
                    'options': [{
                        'status': 1,
                        'title': '告警内容',
                        'placeholder': '请输入告警内容',
                        'val': 'alermComment'
                    }, {
                        'status': 2,
                        'title': '告警级别',
                        'placeholder': '请输入告警级别',
                        'val': 'alermLevel',
                        'list': [
                            {
                                value: '高',
                                label: '高'
                            }, {
                                value: '中',
                                label: '中'
                            }, {
                                value: '低',
                                label: '低'
                            }]
                    }, {
                        'status': 1,
                        'title': '告警时的经度',
                        'placeholder': '请输入告警时的经度',
                        'val': 'alermLongitude'
                    }, {
                        'status': 1,
                        'title': '告警时的纬度',
                        'placeholder': '请输入告警时的纬度',
                        'val': 'alermLatitude'
                    }, {
                        'status': 11,
                        'title': '接受通知部门',
                        'placeholder': '请选择接受通知部门',
                        'val': 'orgId',
                        'fn': 'getDeptsFn'
                    }]
                },
                popOneKeyAlarmData: {
                    'titleTotal': '一键告警',
                    'options': [{
                        'status': 1,
                        'title': '内容',
                        'placeholder': '请输入内容',
                        'val': 'comment'
                    }, {
                        'status': 2,
                        'title': '级别',
                        'placeholder': '请输入级别',
                        'val': 'level',
                        'list': [
                            {
                                value: '一级',
                                label: '一级'
                            }, {
                                value: '二级',
                                label: '二级'
                            }]
                    }, {
                        'status': 11,
                        'title': '部门',
                        'placeholder': '请选择部门',
                        'val': 'orgId',
                        'fn': 'getDeptsFn'
                    }, {
                        'status': 11,
                        'title': '人员',
                        'placeholder': '请选择人员',
                        'val': 'usersId',
                        'fn': 'getUserFn'
                    }]
                },
                editDate: {},
                noticeList: [],
                isShowAlarm: false,
                alarmList: [],
                leafOrgList: [],
                alarmUserList: [],
                isShowOneKeyAlarm: false,
                deptsIds: [],
                userIds: [],
                accountId: ''
            }
        },
        computed: {
            ...mapState(['newMsg', 'newMsgData', 'notice', 'alarm'])
        },
        watch: {
            //短信
            newMsg() {
                this.msgList.push(this.newMsg);

            },
            //通知公告
            notice() {
                if(this.notice) {
                    //获取未读的通知
                    this.getNoticeFn();
                }
            },
            //告警
            alarm() {
                if(this.alarm) {
                    //获取告警
                    this.getAlarmFn();
                }
            }
        },
        created() {
            //登录
            this.loginBtn();
            L.widget.disable('widgets/toolBar/widget.js');
        },
        methods: {
            ...mapActions(['_getInfo']),
            ...mapMutations(['_newMsgData', '_setTabNumber', '_setNotice', '_setAlarm', '_userInfo', '_currentSip']),
            //点击登录按钮
            loginBtn() {
                this._getInfo({
                    ops: {
                        // userLoginName: 'admin',
                        userLoginName: 'cwl1',
                        userPwd: '123'
                    },
                    method: 'post',
                    api: 'getLogin',
                    callback: res => {
                        this.accountId = res.user.id;
                        this.loginCmtFn(res);
                    }
                })
                // }
            },
            loginCmtFn(res) {
                //存储登陆用户的sip
                this._currentSip({ 'userName': res.user.userName, 'userSip': res.user.userSip });
                var _this = this;
                //登录服务器
                //登录
                // this.cmtWsClient.registerSip('6001', '6001', res.cmt_ip, '6050');
                this.cmtWsClient.registerSip(res.user.userSip, res.user.userSip, res.cmt_ip, '6050');

                //处理回调
                this.callback.onEventRegistered = function(code) {
                    if(code.result == 0) {
                        var videoPlayUrl = 'http://192.168.0.100:80/vdis/videoPlayer?user=' + res.user.userSip + '&passwd=' + res.user.userSip;
                        _this.cmtWsClient.setServiceConfig("videoPlayUrl", videoPlayUrl);
                        //存入用户信息
                        if(_this.accountId) {
                            let userInfo = { 'accountId': _this.accountId, 'userId': res.user.id }
                            _this._userInfo(userInfo);
                        }
                        _this.$router.push('/');
                    } else {
                        _this.message.error('登录失败，请重新尝试登录！')
                    }
                }
            },
            msgListFn() {
                this._newMsgData(this.msgList);
                this.msgList = [];
                this.isShowMsgBox = true;
            },
            //关闭历史聊天框
            closeFn(val) {
                this.isShowMsgBox = val;
            },
            tempSetFn() {
                this.isShowTable = true;
            },
            tempCloseFn() {
                this.isShowTable = false;
            },
            //系统管理
            sysBtnFn() {
                L.widget.disableAll()
                this.isShowTable = false;
                this._setTabNumber(0);
                this.$router.push('managementSystem');
            },
            //发送通知
            setNoticeBtnFn() {
                this.isShowBox = true;
                this.isShowTable = false;
            },
            //弹框保存按钮
            saveFn(val) {
                val.deptsId = this.deptsIds.join(',');
                this.isShowBox = false;
                this._getInfo({
                    ops: val,
                    api: 'publishNotice',
                    callback: res => {
                        this.message.success('新增成功！');
                    }
                });
            },
            //弹框取消按钮
            cancleFn(val) {
                this.isShowBox = val;
            },
            //获取未读的通知
            getNoticeFn() {
                this._getInfo({
                    ops: {},
                    api: 'getNoticeStatus',
                    callback: res => {
                        this.noticeList = res;
                    }
                });
            },
            //更新通知状态
            moreNoticeBtn(item) {
                let showVal = '通知内容:' + item.noticeComment + '/ 通知类型:' + item.noticeType + '/ 通知标题:' + item.noticeTitle + '/ 接受通知的用户名称:' + item.userName;
                this._getInfo({
                    ops: {
                        'userId': item.userId,
                        'noticeStatus': item.noticeStatus
                    },
                    api: 'updateNoticeStatus',
                    callback: res => {
                        this._setNotice(false);
                        this.$alert(showVal, '通知/公告', {
                            confirmButtonText: '确定',
                            callback: () => { }
                        });
                    }
                });
            },
            //发送告警
            setAlarmBtnFn() {
                this.isShowAlarm = true;
                this.isShowTable = false;
            },
            //一键告警
            oneKeyAlarmFn() {
                this.isShowOneKeyAlarm = true;
                this.isShowTable = false;
            },
            //弹框保存按钮
            saveAlarmFn(val) {
                val.orgId = this.deptsIds.join(',');
                this.isShowAlarm = false;
                this._getInfo({
                    ops: val,
                    api: 'publishAlerm',
                    callback: res => {
                        this.message.success('新增成功！');
                    }
                });
            },
            //弹框取消按钮
            cancleAlarmFn(val) {
                this.isShowAlarm = val;
            },
            getAlarmFn() {
                this._getInfo({
                    ops: {},
                    api: 'getAlermStatus',
                    callback: res => {
                        this.alarmList = res;
                    }
                });
            },
            //更新通知状态
            moreAlarmBtn(item) {
                let showVal = '告警内容:' + item.alermComment + '/ 告警状态:' + item.alermStatus + '/ 登录用户的名称:' + item.userName;
                this._getInfo({
                    ops: {
                        'userId': item.userId,
                        'alermStatus': item.alermStatus
                    },
                    api: 'updateAlermStatus',
                    callback: res => {
                        this._setAlarm(false);
                        this.$alert(showVal, '告警', {
                            confirmButtonText: '确定',
                            callback: () => { }
                        });
                    }
                });
            },
            //一键告警弹框保存按钮
            saveOneKeyAlarmFn(val) {
                val.orgId = this.deptsIds.join(',');
                val.usersId = this.userIds.join(',');
                this.isShowOneKeyAlarm = false;
                this._getInfo({
                    ops: val,
                    api: 'addOneKeyAlerm',
                    callback: res => {
                        this.message.success('新增成功！');
                    }
                });
            },
            //一键告警弹框取消按钮
            cancleOneKeyAlarmFn(val) {
                this.isShowOneKeyAlarm = val;
            },
            //获取用户列表
            getUserList(list) {
                this.isUser = false;
                list.forEach(item => {
                    this.userIds.push(item.id);
                })
            },
            //关闭获取用户列表
            cancelUserListFn() {
                this.isUser = false;
            },
            //获取部门列表
            getDepartList(list) {
                this.isDepartment = false;
                list.forEach(item => {
                    this.deptsIds.push(item.id);
                })
            },
            //关闭部门列表
            cancelDepartListFn() {
                this.isDepartment = false;
            },
            //获取子集传来的调用方法
            btnsFn(fn) {
                this[fn]();
            },
            //调用获取部门的方法
            getDeptsFn() {
                this.deptsIds = [];
                this.isDepartment = true;
            },
            //调用人员的方法
            getUserFn() {
                this.deptsIds = [];
                this.isUser = true;
            }
        }
    }
</script>
<style scoped lang="less">
    .tempSet {
        position: absolute;
        padding: 10px;
        left: 40px;
        bottom: 100px;
        z-index: 1;
    }
    .g-layout {
        position: relative;
        .newMessage {
            position: absolute;
            width: 50px;
            height: 50px;
            top: 20px;
            right: 20px;
            z-index: 1;
            font-size: 20px;
            cursor: pointer;
        }
        .operation {
            position: absolute;
            width: 100%;
            height: 360px;
            background: #ccc;
            left: 0px;
            bottom: 0px;
            z-index: 99999;
            h2 {
                height: 60px;
                line-height: 60px;
                text-indent: 1em;
                margin: 10px;
            }
            .btns {
                margin: 10px 20px;
                li {
                    height: 300px;
                    flex: 1;
                    border-right: 1px solid #eee;
                }
            }
            .tempClose {
                position: absolute;
                top: 15px;
                right: 30px;
                color: #000;
                cursor: pointer;
            }
        }
        .noticeShow {
            position: absolute;
            right: 0px;
            bottom: 0px;
            width: 660px;
            height: 500px;
            border-radius: 10px;
            background: #76838f;
            z-index: 1001;
            overflow-y: auto;
            dd {
                line-height: 36px;
                margin: 10px 20px;
                color: #fff;
                overflow: hidden;
                span {
                    float: left;
                    width: 30%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    display: block;
                    text-indent: 1em;
                }
                a {
                    width: 10%;
                    text-align: center;
                    float: left;
                    color: #bdc0ce;
                    cursor: pointer;
                }
            }
        }
    }
    .toolbar {
        top: 100px !important;
        left: 300px !important;
    }
</style>
