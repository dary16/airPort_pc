<template>
    <div class="g-userWrap staffConfig">
        <el-tabs tab-position="left">
            <el-tab-pane v-for="item in groupList" :label="item.groupName">
                <dl class="showFrame">
                    <dt>人员</dt>
                    <dd>
                        <ul class="selectStaff" v-for="subItem in item.detailList">
                            <li class="clearfix">
                                <span>{{subItem.personRole}}（{{subItem.personNum}}人）：</span>
                                <span>
                                    <el-button type="primary" size="mini" v-on:click="getUserFn(subItem)">选择人员</el-button>
                                    {{subItem.userName}}
                                </span>
                            </li>
                        </ul>
                    </dd>
                </dl>
                <dl class="showFrame">
                    <dt>责任：</dt>
                    <dd>{{item.peopleDuty}}</dd>
                </dl>
                <dl class="showFrame">
                    <dt>装备：</dt>
                    <dd>{{item.equip}}</dd>
                </dl>
            </el-tab-pane>
        </el-tabs>
        <v-get-user v-if="isGetUser" v-on:checkedUser="getUserList" v-on:closeUserFn="cancelUserListFn"></v-get-user>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                groupList: [],
                curSubItem: {},
                isGetUser: false
            }
        },
        mounted() {

        },
        created() {
            this.getConfigGroupListFn()
        },
        methods: {
            ...mapActions(['_getInfo']),
            getConfigGroupListFn() {
                this._getInfo({
                    ops: {},
                    api: 'configGroupList',
                    callback: res => {
                        this.groupList = res;
                    }
                });
            },
            //显示选人弹框
            getUserFn(subItem) {
                this.isGetUser = true;
                this.curSubItem = subItem;
            },
            //关闭选人的弹框
            cancelUserListFn() {
                this.isGetUser = false;
            },
            //选中人员
            getUserList(list) {
                if(list.length != this.curSubItem.personNum) {
                    this.$message.error('请选择' + this.curSubItem.personNum + '人');
                    return false;
                }
                this.isGetUser = false;
                var staffName = [];
                var staffId = [];
                list.forEach(item => {
                    staffName.push(item.label);
                    staffId.push(item.sip);
                })
                this.curSubItem.userName = staffName.join('，');
                this._getInfo({
                    ops: {
                        cgdId: this.curSubItem.cgdId,
                        userId: staffId.join(','),
                        userName: staffName.join(',')
                    },
                    api: 'addBusConfigStaff',
                    callback: res => {
                        this.$message.success('修改成功！');
                    }
                });
            }
        }
    };
</script>

<style scoped lang="less">
    .staffConfig {
        margin: 20px;
        background: #fff;
        padding: 20px 20px;
        .showFrame {
            dt {
                line-height: 42px;
                background: #efefef;
                text-indent: 1em;
            }
            dd {
                line-height: 36px;
                margin-bottom: 20px;
                padding: 10px;
            }
        }
        .selectStaff {
            li {
                padding: 2px 0px;
            }
        }
    }
</style>
