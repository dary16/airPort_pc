<template>
    <div class="g-userWrap">
        <v-search-title v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData"></v-search-title>
        <div class="g-table">
            <el-table :data="cameraList" stripe>
                <el-table-column align="center" prop="cameraName" label="摄像头名称" width="300"></el-table-column>
                <el-table-column align="center" prop="cameraSip" label="摄像头sip" width="300"></el-table-column>
                <el-table-column align="center" prop="cameraType" label="类型"></el-table-column>
                <el-table-column align="center" prop="cameraManufacture" label="摄像头厂商"></el-table-column>
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
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                cameraList: [],
                currentPage: 1,
                pageSize: 10,
                pageTotal: 0,
                searchData: {
                    'btnShow': [
                        { 'title': '查询', 'fn': 'checkFn' },
                        { 'title': '增加', 'fn': 'addCameraFn' }
                    ],
                    'options': [{
                        'status': 1,
                        'title': '摄像头名称',
                        'placeholder': '请输入摄像头名称',
                        'val': 'cameraName'
                    }],
                    defaultReq: {
                        cameraName: '测试默认'
                    }
                },
                isShowBox: false,
                popData: {
                    'titleTotal': '信息',
                    'options': [{
                        'status': 1,
                        'title': '摄像头名称',
                        'placeholder': '请输入摄像头名称',
                        'val': 'cameraName'
                    }, {
                        'status': 1,
                        'title': '摄像头sip',
                        'placeholder': '请输入摄像头sip',
                        'val': 'cameraSip'
                    }, {
                        'status': 1,
                        'title': '类型',
                        'placeholder': '类型',
                        'val': 'cameraType'
                    }, {
                        'status': 1,
                        'title': '摄像头厂商',
                        'placeholder': '请输入摄像头厂商',
                        'val': 'cameraManufacture'
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
            this.getCameraList();
        },
        watch: {},
        methods: {
            ...mapActions(['_getInfo']),
            //获取列表
            getCameraList() {
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
                    api: 'getCameraList',
                    callback: res => {
                        this.cameraList = res.rows;
                        this.pageTotal = res.records;
                    }
                });
            },
            //删除摄像头
            deleteFn(id) {
                this.oMsgBox.confirm('确定删除当前摄像头吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    this._getInfo({
                        ops: {
                            "ids": id,
                        },
                        api: 'deleteCamera',
                        callback: res => {
                            this.message.success('删除成功！');
                            this.getCameraList();
                        }
                    });
                }).catch(() => {

                });
            },
            //编辑摄像头
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
                item.cameraName = this.util.trim(item.cameraName);
                this.filterVal = item;
                this.getCameraList(item);
            },
            //增加按钮
            addCameraFn() {
                this.isShowBox = true;
                this.editDate = {};
            },
            //翻页，改变页数方法
            changePages(val) {
                this.currentPage = val;
                this.getCameraList();
            },
            //弹框保存按钮
            saveFn(val) {
                if(val.cameraName && val.cameraSip && val.cameraType) {
                    this.isShowBox = false;
                    this._getInfo({
                        ops: val,
                        api: 'addCamera',
                        callback: res => {
                            if(val.id) {
                                this.message.success('编辑成功！');
                            } else {
                                this.message.success('新增成功！');
                            }
                            this.getCameraList();
                        }
                    });
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
