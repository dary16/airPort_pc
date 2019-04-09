<template>
    <div class="g-userWrap">
        <v-search-title v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData"></v-search-title>
        <div class="g-table">
            <el-table :data="flightList" stripe>
                <el-table-column align="center" prop="flightStep" label="序号" width="300"></el-table-column>
                <el-table-column align="center" prop="flightName" label="名称"></el-table-column>
                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button v-on:click="editFn(scope.row.id)" type="text" size="small">编辑</el-button>
                        <!-- <el-button v-on:click="deleteFn(scope.row.flightId)" type="text" size="small">删除</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination class="g-pagination" @current-change="changePages" :current-page="currentPage" :total="pageTotal" background layout="prev, pager, next"></el-pagination>
        <div class="mask" v-if="isShowBox">
            <div class="popBox" v-if="isShowBox">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="序号">
                        <el-input v-model="form.flightStep"></el-input>
                    </el-form-item>
                    <el-form-item label="名称">
                        <el-input v-model="form.flightName"></el-input>
                    </el-form-item>
                    <el-form-item label="子序号">
                        <el-input v-model="form.flightPhaseList[0].flightPhaseStep"></el-input>
                    </el-form-item>
                    <el-form-item label="子名称">
                        <el-input v-model="form.flightPhaseList[0].flightPhaseInfo"></el-input>
                    </el-form-item>
                    <el-form-item label="子序号">
                        <el-input v-model="form.flightPhaseList[1].flightPhaseStep"></el-input>
                    </el-form-item>
                    <el-form-item label="子名称">
                        <el-input v-model="form.flightPhaseList[1].flightPhaseInfo"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit()">确定</el-button>
                        <el-button type="" @click="cancelFn()">关闭</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!-- <v-pop-box v-dialogDrag v-if="isShowBox" v-on:save="saveFn" v-on:cancle="cancleFn" v-bind:popData="popData" v-bind:formData="editDate"></v-pop-box> -->
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                searchData: {
                    'btnShow': [
                        { 'title': '查询', 'fn': 'checkFn' },
                        { 'title': '增加', 'fn': 'addFlightFn' }
                    ],
                    'options': [{
                        'status': 1,
                        'title': '名称',
                        'placeholder': '请输入名称',
                        'val': 'flightName'
                    }],
                    defaultReq: {
                        flightName: '测试默认'
                    }
                },
                currentPage: 1,
                pageSize: 10,
                pageTotal: 0,
                flightList: [],
                isShowBox: false,
                form: {
                    flightStep: '',
                    flightName: '',
                    flightPhaseList: [
                        {
                            flightPhaseStep: '',
                            flightPhaseInfo: ''
                        },
                        {
                            flightPhaseStep: '',
                            flightPhaseInfo: ''
                        }
                    ]
                }
            }
        },
        mounted() {

        },
        created() {
            this.getFlightPlanFn();
        },
        watch: {},
        methods: {
            ...mapActions(['_getInfo']),
            //搜索按钮
            btnsFn(info) {
                this[info.fn](info.item);
            },//查询按钮
            checkFn(item) {
                this.getFlightPlanFn(item);
            },
            //增加按钮
            addFlightFn() {
                this.isShowBox = true;
                this.editDate = {};
            },
            getFlightPlanFn(item) {
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
                    api: 'getFlightPlan',
                    callback: res => {
                        this.flightList = res.rows;
                        this.pageTotal = res.records;
                    }
                });
            },
            //翻页，改变页数方法
            changePages(val) {
                this.currentPage = val;
                this.getFlightPlanFn();
            },
            onSubmit() {
                this._getInfo({
                    ops: this.form,
                    api: 'addFlightPlan',
                    callback: res => {
                        this.isShowBox = false;
                        this.getFlightPlanFn();
                        if(this.form.id) {
                            this.message.success('编辑成功！');
                        } else {
                            this.message.success('添加成功！');
                        }
                        // this.flightList = res.rows;
                        // this.pageTotal = res.records;
                    }
                });
            },
            cancelFn() {
                this.isShowBox = false;
            },
            //编辑
            editFn(id) {
                this._getInfo({
                    ops: {
                        'id': id
                    },
                    api: 'getItemPlan',
                    callback: res => {
                        this.isShowBox = true;
                        this.form = res;
                    }
                });
            }
        }
    };
</script>

<style scoped lang="less">
    .mask {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 4;
        background: rgba(0, 0, 0, 0.6);
    }
    .popBox {
        background: #fff;
        position: fixed;
        width: 600px;
        padding: 20px;
        left: 50%;
        margin-left: -300px;
        top: 30px;
    }
</style>
