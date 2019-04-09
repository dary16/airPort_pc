<template>
    <div class="g-userWrap">
        <v-search-title v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData"></v-search-title>
        <div class="g-table">
            <el-table :data="roleList" stripe>
                <el-table-column align="center" prop="lightStatus" label="灯的状态" width="300"></el-table-column>
                <el-table-column align="center" prop="lightLongitude" label="灯的经度" width="300"></el-table-column>
                <el-table-column align="center" prop="lightLatitude" label="灯的纬度" width="300"></el-table-column>
                <el-table-column align="center" prop="lightName" label="灯的名称" width="300"></el-table-column>
                <el-table-column align="center" prop="lightCode" label="灯的编码" width=""></el-table-column>
                <el-table-column align="center" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button v-on:click="editFn(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button v-on:click="deleteFn(scope.row.lightId)" type="text" size="small">删除</el-button>
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
                        'title': '灯的状态',
                        'placeholder': '请输入灯的状态',
                        'val': 'lightStatus'
                    }],
                    defaultReq: {
                        lightStatus: '测试默认'
                    }
                },
                isShowBox: false,
                popData: {
                    'titleTotal': '新增',
                    'options': [{
                        'status': 1,
                        'title': '灯的状态',
                        'placeholder': '请输入灯的状态',
                        'val': 'lightStatus',
                        'visible': true
                    }, {
                        'status': 1,
                        'title': '灯的经度',
                        'placeholder': '请输入灯的经度',
                        'val': 'lightLongitude'
                    }, {
                        'status': 1,
                        'title': '灯的纬度',
                        'placeholder': '请输入灯的纬度',
                        'val': 'lightLatitude'
                    }, {
                        'status': 1,
                        'title': '灯的名称',
                        'placeholder': '请输入灯的名称',
                        'val': 'lightName',
                        'visible': true
                    }, {
                        'status': 1,
                        'title': '灯的编码',
                        'placeholder': '请输入灯的编码',
                        'val': 'lightCode'
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
                    api: 'getLightList',
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
                        api: 'delLight',
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
                if(!val.lightStatus) {
                    this.message.error('请输入灯状态！');
                    return false;
                }
                if(!val.lightName) {
                    this.message.error('请输入灯名称！');
                    return false;
                }
                this.isShowBox = false;
                this._getInfo({
                    ops: val,
                    api: 'addLight',
                    callback: res => {
                        if(val.lightId) {
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