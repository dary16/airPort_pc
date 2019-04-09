<template>
    <div class="g-userWrap">
        <v-search-title v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData"></v-search-title>
        <div class="g-table">
            <el-table :data="machineList" stripe>
                <el-table-column align="center" prop="machName" label="军械名称"></el-table-column>
                <el-table-column align="center" prop="machCode" label="军械编码"></el-table-column>
                <el-table-column align="center" prop="machType" label="军械类型"></el-table-column>
                <el-table-column align="center" prop="machStatus" label="军械状态"></el-table-column>
                <el-table-column align="center" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button v-on:click="editFn(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button v-on:click="deleteFn(scope.row.machId)" type="text" size="small">删除</el-button>
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
                machineList: [],
                currentPage: 1,
                pageSize: 10,
                pageTotal: 0,
                searchData: {
                    'btnShow': [
                        { 'title': '查询', 'fn': 'checkFn' },
                        { 'title': '增加', 'fn': 'addMachFn' }
                    ],
                    'options': [{
                        'status': 1,
                        'title': '军械名称',
                        'placeholder': '请输入军械名称',
                        'val': 'machName'
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
                        'title': '军械名称',
                        'placeholder': '请输入军械名称',
                        'val': 'machName',
                        'visible': true
                    }, {
                        'status': 1,
                        'title': '军械编码',
                        'placeholder': '请输入军械编码',
                        'val': 'machCode',
                        'visible': true
                    }, {
                        'status': 1,
                        'title': '军械类型',
                        'placeholder': '请输入军械类型',
                        'val': 'machType',
                        'visible': true
                    }, {
                        'status': 1,
                        'title': '军械状态',
                        'placeholder': '请输入军械状态',
                        'val': 'machStatus',
                        'visible': true
                    }]
                },
                editDate: {},
                ops: {}
            }
        },
        mounted() {

        },
        created() {
            this.getMachList();
        },
        watch: {},
        methods: {
            ...mapActions(['_getInfo']),
            //获取列表
            getMachList(item) {
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
                    api: 'getBusMachineList',
                    callback: res => {
                        this.machineList = res.rows;
                        this.pageTotal = res.records;
                    }
                });
            },
            //删除军械
            deleteFn(id) {
                this.oMsgBox.confirm('确定删除当前军械吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    this._getInfo({
                        ops: {
                            "ids": id,
                        },
                        api: 'deleteBusMachine',
                        callback: res => {
                            this.message.success('删除成功！');
                            this.getMachList();
                        }
                    });
                }).catch(() => {

                });
            },
            //编辑角色
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
                item.machName = this.util.trim(item.machName);
                this.getMachList(item);
            },
            //增加按钮
            addMachFn() {
                this.isShowBox = true;
                this.editDate = {};
            },
            //翻页，改变页数方法
            changePages(val) {
                this.currentPage = val;
                this.getMachList();
            },
            //弹框保存按钮
            saveFn(val) {
                if(val.machName && val.machCode && val.machType) {
                    this.isShowBox = false;
                    this._getInfo({
                        ops: val,
                        api: 'addBusMachine',
                        callback: res => {
                            if(val.machId) {
                                this.message.success('编辑成功！');
                            } else {
                                this.message.success('新增成功！');
                            }
                            this.getMachList();
                        }
                    });
                } else if(!val.machName) {
                    this.message.error("请填写军械名称！");
                } else if(!val.machType) {
                    this.message.error("请填写军械类型！");
                } else if(!val.machCode) {
                    this.message.error("请填写军械编码！");
                } else {
                    this.message.error("请填写军械状态！");
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
