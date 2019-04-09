<template>
    <div class="g-userWrap">
        <v-search-title v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData"></v-search-title>
        <div class="g-table">
            <el-table :data="guardList" stripe>
                <el-table-column align="center" prop="guardName" label="警卫名称"></el-table-column>
                <el-table-column align="center" prop="guardCode" label="警卫编码"></el-table-column>
                <el-table-column align="center" prop="guardType" label="警卫类型"></el-table-column>
                <el-table-column align="center" prop="guardNum" label="数量"></el-table-column>
                <el-table-column align="center" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button v-on:click="editFn(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button v-on:click="deleteFn(scope.row.guardId)" type="text" size="small">删除</el-button>
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
                guardList: [],
                currentPage: 1,
                pageSize: 10,
                pageTotal: 0,
                searchData: {
                    'btnShow': [
                        { 'title': '查询', 'fn': 'checkFn' },
                        { 'title': '增加', 'fn': 'addGuardFn' }
                    ],
                    'options': [{
                        'status': 1,
                        'title': '警卫名称',
                        'placeholder': '请输入警卫名称',
                        'val': 'guardName'
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
                        'title': '警卫名称',
                        'placeholder': '请输入警卫名称',
                        'val': 'guardName',
                        'visible': true
                    }, {
                        'status': 1,
                        'title': '警卫编码',
                        'placeholder': '请输入警卫编码',
                        'val': 'guardCode',
                        'visible': true
                    }, {
                        'status': 1,
                        'title': '警卫类型',
                        'placeholder': '请输入警卫编码',
                        'val': 'guardType'
                    }, {
                        'status': 1,
                        'title': '警卫数量',
                        'placeholder': '请输入警卫数量',
                        'val': 'guardNum'
                    }]
                },
                editDate: {},
                ops: {}
            }
        },
        mounted() {

        },
        created() {
            this.getGuardList();
        },
        watch: {},
        methods: {
            ...mapActions(['_getInfo']),
            //获取列表
            getGuardList(item) {
                let pagination = {
                    "curPage": this.currentPage,
                    "pageSize": this.pageSize
                };
                if(item) {
                    this.ops = { ...item, ...pagination }
                } else {
                    this.ops = pagination;
                }

                this._getInfo({
                    ops: this.ops,
                    api: 'getGuardList',
                    callback: res => {
                        this.guardList = res.rows;
                        this.pageTotal = res.records;
                    }
                });
            },
            //删除警卫
            deleteFn(id) {
                this.oMsgBox.confirm('确定删除当前警卫吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    this._getInfo({
                        ops: {
                            "ids": id,
                        },
                        api: 'deleteBusGuard',
                        callback: res => {
                            this.message.success('删除成功！');
                            this.getGuardList();
                        }
                    });
                }).catch(() => {

                });
            },
            //编辑警卫
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
                item.guardName = this.util.trim(item.guardName);
                this.getGuardList(item);
            },
            //增加按钮
            addGuardFn() {
                this.isShowBox = true;
                this.editDate = {};
            },
            //翻页，改变页数方法
            changePages(val) {
                this.currentPage = val;
                this.getGuardList();
            },
            //弹框保存按钮
            saveFn(val) {
                if(val.guardName && val.guardCode) {
                    this.isShowBox = false;
                    this._getInfo({
                        ops: val,
                        api: 'addBusGuard',
                        callback: res => {
                            if(val.guardId) {
                                this.message.success('编辑成功！');
                            } else {
                                this.message.success('新增成功！');
                            }
                            this.getGuardList();
                        }
                    });
                } else if(!val.guardName) {
                    this.message.error("请填写警卫名称！");
                } else if(!val.guardCode) {
                    this.message.error("请填写警卫编码！");
                } else {
                    this.message.error("请填写完整信息！");
                }
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
