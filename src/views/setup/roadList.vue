<template>
    <div class="g-userWrap">
        <v-search-title v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData"></v-search-title>
        <div class="g-table">
            <el-table :data="roadList" stripe>
                <el-table-column align="center" prop="roadName" label="道面名称"></el-table-column>
                <el-table-column align="center" prop="roadCode" label="道面编码"></el-table-column>
                <el-table-column align="center" prop="roadPicture" label="故障图片"></el-table-column>
                <el-table-column align="center" prop="roadRange" label="道面范围"></el-table-column>
                <el-table-column align="center" prop="roadStatus" label="道面状态"></el-table-column>
                <el-table-column align="center" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button v-on:click="editFn(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button v-on:click="deleteFn(scope.row.roadId)" type="text" size="small">删除</el-button>
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
                roadList: [],
                currentPage: 1,
                pageSize: 10,
                pageTotal: 0,
                searchData: {
                    'btnShow': [
                        { 'title': '查询', 'fn': 'checkFn' },
                        { 'title': '增加', 'fn': 'addRoadFn' }
                    ],
                    'options': [{
                        'status': 1,
                        'title': '道面名称',
                        'placeholder': '请输入道面名称',
                        'val': 'roadName'
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
                        'title': '道面名称',
                        'placeholder': '请输入道面名称',
                        'val': 'roadName',
                        'visible': true
                    }, {
                        'status': 1,
                        'title': '道面编码',
                        'placeholder': '请输入道面编码',
                        'val': 'roadCode',
                        'visible': true
                    }, {
                        'status': 1,
                        'title': '故障图片',
                        'placeholder': '请输入故障图片',
                        'val': 'roadPicture'
                    }, {
                        'status': 1,
                        'title': '道面范围',
                        'placeholder': '请输入道面范围',
                        'val': 'roadRange'
                    }, {
                        'status': 1,
                        'title': '道面状态',
                        'placeholder': '请输入道面状态',
                        'val': 'roadStatus'
                    }]
                },
                editDate: {},
                ops: {}
            }
        },
        mounted() {

        },
        created() {
            this.getRoadList();
        },
        watch: {},
        methods: {
            ...mapActions(['_getInfo']),
            //获取列表
            getRoadList(item) {
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
                    api: 'getBusRoadList',
                    callback: res => {
                        console.log(res);
                        this.roadList = res.rows;
                        this.pageTotal = res.records;
                    }
                });
            },
            //删除道面
            deleteFn(id) {
                this.oMsgBox.confirm('确定删除当前道面数据吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    this._getInfo({
                        ops: {
                            "ids": id,
                        },
                        api: 'deleteBusRoad',
                        callback: res => {
                            this.message.success('删除成功！');
                            this.getRoadList();
                        }
                    });
                }).catch(() => {

                });
            },
            //编辑道面
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
                item.roadName = this.util.trim(item.roadName);
                this.getRoadList(item);
            },
            //增加按钮
            addRoadFn() {
                this.isShowBox = true;
                this.editDate = {};
            },
            //翻页，改变页数方法
            changePages(val) {
                this.currentPage = val;
                this.getRoadList();
            },
            //弹框保存按钮
            saveFn(val) {
                if(val.roadName && val.roadCode) {
                    this.isShowBox = false;
                    this._getInfo({
                        ops: val,
                        api: 'addBusRoad',
                        callback: res => {
                            if(val.roadId) {
                                this.message.success('编辑成功！');
                            } else {
                                this.message.success('新增成功！');
                            }
                            this.getRoadList();
                        }
                    });
                } else if(!val.roadName) {
                    this.message.error("请填写道面名称！");
                } else if(!val.roadCode) {
                    this.message.error("请填写道面编码！");
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
