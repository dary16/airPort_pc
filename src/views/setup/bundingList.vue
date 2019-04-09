<template>
    <div class="g-userWrap">
        <v-search-title v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData"></v-search-title>
        <div class="g-table">
            <el-table :data="bundingList" stripe>
                <el-table-column align="center" prop="userName" label="用户名称"></el-table-column>
                <el-table-column align="center" prop="userSip" label="用户sip号"></el-table-column>
                <el-table-column align="center" prop="equipName" label="设备名称"></el-table-column>
                <el-table-column align="center" prop="equipCode" label="设备编码"></el-table-column>
                <el-table-column align="center" prop="equipType" label="设备类型"></el-table-column>
                <el-table-column align="center" prop="equipPicture" label="设备图片"></el-table-column>
                <el-table-column align="center" prop="equipDutyPerson" label="责任人"></el-table-column>
                <el-table-column align="center" prop="equipBuyTime" label="购买时间"></el-table-column>
                <el-table-column align="center" prop="bundingStatus" label="绑定状态"></el-table-column>
                <!-- <el-table-column align="center" prop="createtime" label="创建时间"></el-table-column> -->
                <el-table-column align="center" prop="updatetime" label="更新时间"></el-table-column>
                <el-table-column align="center" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button v-on:click="editFn(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button v-on:click="deleteFn(scope.row.bundingId)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination class="g-pagination" @current-change="changePages" :current-page="currentPage" :total="pageTotal" background layout="prev, pager, next"></el-pagination>
        <v-pop-box v-dialogDrag v-if="isShowBox" v-on:save="saveFn" v-on:cancle="cancleFn" v-bind:popData="popData" v-bind:formData="editDate"></v-pop-box>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                bundingList: [],
                currentPage: 1,
                pageSize: 10,
                pageTotal: 0,
                searchData: {
                    'btnShow': [
                        { 'title': '查询', 'fn': 'checkFn' },
                        { 'title': '增加', 'fn': 'addBundingFn' }
                    ],
                    'options': [{
                        'status': 1,
                        'title': '用户名称',
                        'placeholder': '请输入用户名称',
                        'val': 'userName'
                    }],
                    defaultReq: {
                        roleName: '测试默认'
                    }
                },
                isShowBox: false,
                popData: {
                    'titleTotal': '信息',
                    'options': [{
                        'status': 1,
                        'title': '用户名称',
                        'placeholder': '请输入用户名称',
                        'val': 'userName',
                        'visible': true
                    }, {
                        'status': 1,
                        'title': '用户sip号',
                        'placeholder': '请输入用户sip号',
                        'val': 'userSip',
                        'visible': true
                    }, {
                        'status': 1,
                        'title': '设备名称',
                        'placeholder': '请输入设备名称',
                        'val': 'equipName'
                    }, {
                        'status': 1,
                        'title': '设备编码',
                        'placeholder': '请输入设备编码',
                        'val': 'equipCode'
                    }, {
                        'status': 1,
                        'title': '设备类型',
                        'placeholder': '请输入设备类型',
                        'val': 'equipType'
                    }, {
                        'status': 1,
                        'title': '设备图片',
                        'placeholder': '请输入设备图片',
                        'val': 'equipPicture'
                    }, {
                        'status': 1,
                        'title': '责任人',
                        'placeholder': '请输入责任人',
                        'val': 'equipDutyPerson'
                    }, {
                        'status': 10,
                        'title': '购买时间',
                        'placeholder': '请选择购买时间',
                        'val': 'equipBuyTime'
                    }, {
                        'status': 1,
                        'title': '绑定状态',
                        'placeholder': '请输入绑定状态',
                        'val': 'bundingStatus'
                    }, {
                        'status': 10,
                        'title': '更新时间',
                        'placeholder': '请选择更新时间',
                        'val': 'updatetime'
                    }]
                },
                editDate: {},
                ops: {},
                filterVal: {}
            }
        },
        mounted() {

        },
        created() {
            this.getBundingList();
        },
        watch: {},
        methods: {
            ...mapActions(['_getInfo']),
            //获取列表
            getBundingList() {
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
                    api: 'getBundingList',
                    callback: res => {
                        this.bundingList = res.rows;
                        this.pageTotal = res.records;
                    }
                });
            },
            //删除绑定
            deleteFn(id) {
                this.oMsgBox.confirm('确定删除当前绑定吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    this._getInfo({
                        ops: {
                            "ids": id,
                        },
                        api: 'delBunding',
                        callback: res => {
                            this.message.success('删除成功！');
                            this.getBundingList();
                        }
                    });
                }).catch(() => {

                });
            },
            //编辑绑定
            editFn(val) {
                this.isShowBox = true;
                this.editDate = val;
            },
            //搜索按钮
            btnsFn(info) {
                this[info.fn](info.item);
            },
            //查询按钮
            checkFn(item) {
                this.currentPage = 1;
                item.userName = this.util.trim(item.userName);
                this.filterVal = item;
                this.getBundingList();
            },
            //增加按钮
            addBundingFn() {
                this.isShowBox = true;
                this.editDate = {};
            },
            //翻页，改变页数方法
            changePages(val) {
                this.currentPage = val;
                this.getBundingList();
            },
            //弹框保存按钮
            saveFn(val) {
                if(!val.userName) {
                    this.message.error('请输入用户名称!');
                    return false;
                }
                if(!val.userSip) {
                    this.message.error('请输入用户sip号！');
                    return false;
                }
                this.isShowBox = false;
                this._getInfo({
                    ops: val,
                    api: 'addBunding',
                    callback: res => {
                        this.message.success('新增成功！');
                        if(val.bundingId) {
                            this.message.success('编辑成功！');
                        } else {
                            this.message.success('新增成功！');
                        }
                        this.getBundingList();
                    }
                });
            },
            //弹框取消按钮
            cancleFn(val) {
                this.isShowBox = val;
            }
        },
    };
</script>

<style scoped lang="less">
</style>
