<template>
    <div class="g-userWrap">
        <v-search-title v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData"></v-search-title>
        <div class="g-table">
            <el-table :data="oilList" stripe>
                <el-table-column align="center" prop="oilName" label="油料库名称"></el-table-column>
                <el-table-column align="center" prop="oilType" label="油料库类型"></el-table-column>
                <el-table-column align="center" prop="oilUnit" label="油料单位"></el-table-column>
                <el-table-column align="center" prop="oilComment" label="备注"></el-table-column>
                <el-table-column align="center" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button v-on:click="editFn(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button v-on:click="deleteFn(scope.row.oilId)" type="text" size="small">删除</el-button>
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
                oilList: [],
                currentPage: 1,
                pageSize: 10,
                pageTotal: 0,
                searchData: {
                    'btnShow': [
                        { 'title': '查询', 'fn': 'checkFn' },
                        { 'title': '增加', 'fn': 'addOilFn' }
                    ],
                    'options': [{
                        'status': 1,
                        'title': '油料库名称',
                        'placeholder': '请输入油料库名称',
                        'val': 'oilName'
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
                        'title': '油料库名称',
                        'placeholder': '请输入油料库名称',
                        'val': 'oilName',
                        'visible': true
                    }, {
                        'status': 1,
                        'title': '油料库类型',
                        'placeholder': '请输入油料库类型',
                        'val': 'oilType',
                        'visible': true
                    }, {
                        'status': 1,
                        'title': '油料单位',
                        'placeholder': '请输入油料单位',
                        'val': 'oilUnit',
                        'visible': true
                    }, {
                        'status': 1,
                        'title': '备注',
                        'placeholder': '请输入备注',
                        'val': 'oilComment'
                    }]
                },
                editDate: {},
                ops: {}
            }
        },
        mounted() {

        },
        created() {
            this.getOilList();
        },
        watch: {},
        methods: {
            ...mapActions(['_getInfo']),
            //获取列表
            getOilList(item) {
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
                    api: 'getBusOilList',
                    callback: res => {
                        this.oilList = res.rows;
                        this.pageTotal = res.records;
                    }
                });
            },
            //删除油料库
            deleteFn(id) {
                this.oMsgBox.confirm('确定删除当前油库吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    this._getInfo({
                        ops: {
                            "ids": id,
                        },
                        api: 'deleteBusOil',
                        callback: res => {
                            this.message.success('删除成功！');
                            this.getOilList();
                        }
                    });
                }).catch(() => {

                });
            },
            //编辑油库
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
                item.oilName = this.util.trim(item.oilName);
                this.getRoleList(item);
            },
            //增加按钮
            addOilFn() {
                this.isShowBox = true;
                this.editDate = {};
            },
            //翻页，改变页数方法
            changePages(val) {
                this.currentPage = val;
                this.getOilList();
            },
            //弹框保存按钮
            saveFn(val) {
                if(val.oilName && val.oilType && val.oilUnit) {
                    this.isShowBox = false;
                    this._getInfo({
                        ops: val,
                        api: 'addBusOil',
                        callback: res => {
                            if(val.oilId) {
                                this.message.success('编辑成功！');
                            } else {
                                this.message.success('新增成功！');
                            }
                            this.getOilList();
                        }
                    });
                } else if(!val.oilName) {
                    this.message.error("请填写油料库名称！");
                } else if(!val.oilType) {
                    this.message.error("请填写油料库类型！");
                } else {
                    this.message.error("请填写油料单位！");
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
