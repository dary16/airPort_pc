<template>
    <div class="g-userWrap">
        <v-search-title v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData"></v-search-title>
        <div class="g-table">
            <el-table :data="roleList" stripe>
                <el-table-column align="center" prop="equipType" label="器材类型" width="200"></el-table-column>
                <el-table-column align="center" prop="equipName" label="器材名称" width="200"></el-table-column>
                <el-table-column align="center" prop="equipCode" label="器材编码" width="200"></el-table-column>
                <el-table-column align="center" prop="equipUnit" label="单位" width="200"></el-table-column>
                <el-table-column align="center" prop="equipTotal" label="库存" width="200"></el-table-column>
                <el-table-column align="center" prop="orgId" label="部门id"></el-table-column>
                <el-table-column align="center" prop="orgCode" label="部门编码" width="200"></el-table-column>
                <el-table-column align="center" prop="orgName" label="部门名称"></el-table-column>
                <el-table-column align="center" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button v-on:click="editFn(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button v-on:click="deleteFn(scope.row.equipId)" type="text" size="small">删除</el-button>
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
                        'title': '器材类型',
                        'placeholder': '请输入器材类型',
                        'val': 'equipType'
                    }],
                    defaultReq: {
                        equipType: '测试默认'
                    }
                },
                isShowBox: false,
                popData: {
                    'titleTotal': '新增',
                    'options': [{
                        'status': 1,
                        'title': '器材类型',
                        'placeholder': '请输入器材类型',
                        'val': 'equipType',
                        'visible': true
                    }, {
                        'status': 1,
                        'title': '器材名称',
                        'placeholder': '请输入器材名称',
                        'val': 'equipName',
                        'visible': true
                    }, {
                        'status': 1,
                        'title': '器材编码',
                        'placeholder': '请输入器材编码',
                        'val': 'equipCode'
                    }, {
                        'status': 1,
                        'title': '单位',
                        'placeholder': '请输入单位',
                        'val': 'equipUnit'
                    }, {
                        'status': 1,
                        'title': '库存',
                        'placeholder': '请输入库存',
                        'val': 'equipTotal'
                    }, {
                        'status': 1,
                        'title': '部门id',
                        'placeholder': '请输入部门id',
                        'val': 'orgId'
                    }, {
                        'status': 1,
                        'title': '部门编码',
                        'placeholder': '请输入部门编码',
                        'val': 'orgCode'
                    }, {
                        'status': 1,
                        'title': '部门名称',
                        'placeholder': '请输入部门名称',
                        'val': 'orgName'
                    }]
                },
                editDate: {},
                ops: {},
                filterData: {}
            }
        },
        mounted() {

        },
        created() {
            this.getRoleList();
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
                if(this.filterData) {
                    this.ops = { ...this.filterData, ...pagination }
                } else {
                    this.ops = pagination;
                }

                this._getInfo({
                    ops: this.ops,
                    api: 'getEquipmentList',
                    callback: res => {
                        this.roleList = res.rows;
                        this.pageTotal = res.records;
                    }
                });
            },
            //删除角色
            deleteFn(id) {
                this.oMsgBox.confirm('确定删除当前列吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    this._getInfo({
                        ops: {
                            "ids": id,
                        },
                        api: 'delEquipment',
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
                this.editDate = val;
            },
            //搜索按钮
            btnsFn(info) {
                this[info.fn](info.item);
            },
            //查询按钮
            checkFn(item) {
                this.filterData = item;
                this.getRoleList();
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
                if(!val.equipType) {
                    this.message.error('请输入器材类型！');
                    return false;
                }
                if(!val.equipName) {
                    this.message.error('请输入器材名称！');
                    return false;
                }
                this.isShowBox = false;
                this._getInfo({
                    ops: val,
                    api: 'addEquipment',
                    callback: res => {
                        if(val.equipId) {
                            this.message.success('编辑成功！');
                        } else {
                            this.message.success('新增成功！');
                        }
                        this.getRoleList();
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