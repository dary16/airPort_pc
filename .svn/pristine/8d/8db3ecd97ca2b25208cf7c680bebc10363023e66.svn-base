<template>
    <div class="g-userWrap">
        <v-search-title v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData"></v-search-title>
        <div class="g-table">
            <el-table :data="roleList" stripe>
                <!-- <el-table-column align="center" prop="ptt_dptt_admin" label="创建人姓名" width="300"></el-table-column> -->
                <el-table-column align="center" prop="ptt_member" label="组成员" width="300"></el-table-column>
                <el-table-column align="center" prop="ptt_name" label="组名"></el-table-column>
                <el-table-column align="center" prop="ptt_number" label="组号"></el-table-column>
                <el-table-column align="center" label="是否录音">
                    <template slot-scope="scope">
                        {{scope.row.ptt_recording=='y'?'是':'否'}}
                    </template>
                </el-table-column>
                <!-- <el-table-column align="center" prop="ptt_type" label="组类型"></el-table-column> -->
                <el-table-column align="center" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button v-on:click="editFn(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button v-on:click="deleteFn(scope.row.id)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination class="g-pagination" @current-change="changePages" :current-page="currentPage" :total="pageTotal" background layout="prev, pager, next"></el-pagination>
        <v-pop-box v-dialogDrag v-if="isShowBox" v-on:save="saveFn" v-on:cancle="cancleFn" v-bind:popData="popData" v-bind:formData="editDate"></v-pop-box>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    export default {
        data() {
            return {
                roleList: [],
                currentPage: 1,
                pageSize: 10,
                pageTotal: 0,
                searchData: {
                    'btnShow': [
                        { 'title': '查询', 'fn': 'checkFn' },
                        { 'title': '增加', 'fn': 'addRoleFn' }
                    ],
                    'options': [{
                        'status': 1,
                        'title': '组名',
                        'placeholder': '请输入组名',
                        'val': 'ptt_name'
                    }],
                    defaultReq: {
                        ptt_dptt_admin: '测试默认'
                    }
                },
                isShowBox: false,
                popData: {
                    'titleTotal': '信息',
                    'options': [
                        //     {
                        //     'status': 1,
                        //     'title': '创建人姓名',
                        //     'placeholder': '请输入创建人姓名',
                        //     'val': 'ptt_dptt_admin'
                        // },
                        {
                            'status': 8,
                            'title': '组成员',
                            'placeholder': '请选择组成员',
                            'val': 'pttMember',
                            'list': []
                        }, {
                            'status': 1,
                            'title': '组名',
                            'placeholder': '组名',
                            'val': 'ptt_name',
                            'visible': true
                        },
                        // {
                        //     'status': 1,
                        //     'title': '组号',
                        //     'placeholder': '组号',
                        //     'val': 'ptt_number'
                        // },
                        {
                            'status': 2,
                            'title': '是否录音',
                            'placeholder': '是否录音',
                            'val': 'ptt_recording',
                            'list': [{ "value": "y", "label": "录音" }, { "value": "n", "label": "不录音" }]
                        }
                        // , {
                        //     'status': 2,
                        //     'title': '组类型',
                        //     'placeholder': '组类型',
                        //     'val': 'ptt_type',
                        //     'list': [{ "value": "临时组", "label": "临时组" }, { "value": "固定组", "label": "固定组" }]
                        // }
                    ]
                },
                editDate: {},
                ops: {},
                filterVal: {}
            }
        },
        computed: {
            ...mapState(['currentSip'])
        },
        created() {
            this.getRoleList();
            //获取组成员
            this.getAllExtensionFn();
        },
        watch: {},
        methods: {
            ...mapActions(['_getInfo']),
            //获取列表
            getRoleList() {
                let pagination = {
                    "curPage": this.currentPage,
                    "pageSize": this.pageSize
                };
                if(JSON.stringify(this.filterVal) != '{}') {
                    this.ops = { ...this.filterVal, ...pagination }
                } else {
                    this.ops = pagination;
                }

                this._getInfo({
                    ops: this.ops,
                    api: 'getIntercomList',
                    callback: res => {
                        this.roleList = res.rows;
                        this.pageTotal = res.records;
                    }
                });
            },
            //删除角色
            deleteFn(id) {
                this.oMsgBox.confirm('确定删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    this._getInfo({
                        ops: {
                            "ids": id,
                        },
                        api: 'deleteIntercom',
                        callback: res => {
                            this.message.success('删除成功！');
                            this.getRoleList();
                        }
                    });
                }).catch(() => {

                });
            },
            //编辑角色
            editFn(val) {
                this.isShowBox = true;
                val.pttMember = val.ptt_member.split(",")
                this.editDate = val;
            },
            //搜索按钮
            btnsFn(info) {
                this[info.fn](info.item);
            },
            //查询按钮
            checkFn(item) {
                this.currentPage = 1;
                item.ptt_name = this.util.trim(item.ptt_name);
                this.filterVal = item;
                this.getRoleList(item);
            },
            //增加按钮
            addRoleFn() {
                this.isShowBox = true;
                this.editDate = {};
            },
            //翻页，改变页数方法
            changePages(val) {
                this.currentPage = val;
                this.getRoleList();
            },
            //弹框保存按钮
            saveFn(val) {
                if(val.pttMember.length != 0 && val.ptt_name && this.util.trim(val.ptt_name) && val.ptt_recording) {
                    if(val.pttMember.indexOf(this.currentSip.userSip) == -1) {
                        val.ptt_member = val.pttMember.join(",") + ',' + this.currentSip.userSip;
                    } else {
                        val.ptt_member = val.pttMember.join(",");
                    }
                    let ops = JSON.parse(JSON.stringify(val));

                    delete ops.pttMember;
                    this.isShowBox = false;
                    this._getInfo({
                        ops: ops,
                        api: 'addIntercom',
                        callback: res => {
                            if(val.id) {
                                this.message.success('编辑成功！');
                            } else {
                                this.message.success('新增成功！');
                            }
                            this.getRoleList();
                        }
                    });
                } else {
                    this.message.error('请填写完整信息！');
                }
            },
            //弹框取消按钮
            cancleFn(val) {
                this.isShowBox = val;
            },
            //获取组成员
            getAllExtensionFn() {
                this._getInfo({
                    api: 'getAllExtension',
                    callback: res => {
                        //先删除当前登录用户的选项，增加的时候默认增加登录用户的选项
                        res.list.forEach((item, index) => {
                            if(item.value == this.currentSip.userSip) {
                                res.list.splice(index, 1);
                                this.popData.options.forEach(item1 => {
                                    if(item1.val == "pttMember") {
                                        item1.list = res.list;
                                    }
                                })
                            }
                        })
                    }
                });
            }
        },
    };
</script>

<style scoped lang="less">
</style>
