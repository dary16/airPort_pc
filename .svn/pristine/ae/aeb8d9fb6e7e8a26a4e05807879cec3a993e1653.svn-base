<template>
    <div class="g-userWrap">
        <v-search-title v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData"></v-search-title>
        <div class="g-table">
            <el-table :data="flightList" stripe>
                <el-table-column align="center" prop="flightType" label="保障类型" width="300"></el-table-column>
                <el-table-column align="center" prop="flightContent" label="保障内容" width="300"></el-table-column>
                <el-table-column align="center" prop="flightUser" label="飞行保障人员" width="300"></el-table-column>
                <el-table-column align="center" prop="starttime" label="开始时间" width="300"></el-table-column>
                <el-table-column align="center" prop="endtime" label="结束时间"></el-table-column>
                <el-table-column align="center" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button v-on:click="editFn(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button v-on:click="deleteFn(scope.row.flightId)" type="text" size="small">删除</el-button>
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
    import { formatDate } from 'util'
    export default {
        data() {
            return {
                flightList: [],
                currentPage: 1,
                pageSize: 10,
                pageTotal: 0,
                searchData: {
                    'btnShow': [
                        { 'title': '查询', 'fn': 'checkFn' },
                        { 'title': '增加', 'fn': 'addFlightFn' }
                    ],
                    'options': [{
                        'status': 1,
                        'title': '保障类型',
                        'placeholder': '请输入保障类型',
                        'val': 'flightType'
                    }],
                    defaultReq: {
                        flightType: '测试默认'
                    }
                },
                isShowBox: false,
                popData: {
                    'titleTotal': '信息',
                    'options': [{
                        'status': 1,
                        'title': '保障类型',
                        'placeholder': '请输入保障类型',
                        'val': 'flightType'
                    }, {
                        'status': 1,
                        'title': '保障内容',
                        'placeholder': '请输入保障内容',
                        'val': 'flightContent',
                        'visible': true
                    }, {
                        'status': 1,
                        'title': '飞行保障人员',
                        'placeholder': '请输入飞行保障人员',
                        'val': 'flightUser'
                    }, {
                        'status': 5,
                        'title': '开始时间',
                        'placeholder': '请输入开始时间',
                        'val': 'starttime'
                    }, {
                        'status': 5,
                        'title': '结束时间',
                        'placeholder': '请输入结束时间',
                        'val': 'endtime'
                    }]
                },
                editDate: {},
                ops: {}
            }
        },
        mounted() {

        },
        created() {
            this.getFlightList();
        },
        watch: {},
        methods: {
            ...mapActions(['_getInfo']),
            //获取列表
            getFlightList(item) {
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
                    api: 'getFlightProtectList',
                    callback: res => {
                        console.log(res);
                        this.flightList = res.rows;
                        this.pageTotal = res.records;
                    }
                });
            },
            //删除飞行保障
            deleteFn(id) {
                this.oMsgBox.confirm('确定删除当前飞行保障数据吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    this._getInfo({
                        ops: {
                            "ids": id,
                        },
                        api: 'delFlightProtect',
                        callback: res => {
                            this.message.success('删除成功！');
                            this.getFlightList();
                        }
                    });
                }).catch(() => {

                });
            },
            //编辑飞行保障
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
                item.flightType = this.util.trim(item.flightType);
                this.getFlightList(item);
            },
            //增加按钮
            addFlightFn() {
                this.isShowBox = true;
                this.editDate = {};
            },
            //翻页，改变页数方法
            changePages(val) {
                this.currentPage = val;
                this.getFlightList();
            },
            //弹框保存按钮
            saveFn(val) {
                if(!val.flightContent) {
                    this.message.error('请输入保障内容！');
                    return false;
                }
                if(val.starttime && val.endtime && new Date(val.starttime).getTime() > new Date(val.endtime).getTime()) {
                    this.message.error('开始时间不能大于结束时间！');
                    return false;
                }
                this.isShowBox = false;
                this._getInfo({
                    ops: val,
                    api: 'addFlightProtect',
                    callback: res => {
                        if(val.flightId) {
                            this.message.success('编辑成功！');
                        } else {
                            this.message.success('新增成功！');
                        }
                        this.getFlightList();
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
