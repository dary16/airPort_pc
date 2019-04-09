<template>
  <div class="g-userWrap">
    <v-search-title v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData"></v-search-title>
    <div class="g-table">
      <el-table :data="planList" stripe style="width: 100%;">
        <el-table-column align="center" prop="planLevel" label="级别"></el-table-column>
        <el-table-column align="center" prop="planName" label="预案名称"></el-table-column>
        <el-table-column align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button v-on:click="editFn(scope.row)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination class="g-pagination" @current-change="changePages" :current-page="currentPage" :total="pageTotal" background layout="prev, pager, next"></el-pagination>
    <v-plan-pop v-if="isShowBox" v-on:cancelClick="cancelPlanPop" v-bind:form="form" v-bind:childList="childList" v-on:save="saveFn"></v-plan-pop>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    data() {
      return {
        planList: [],
        childList: [],
        isShowBox: false,
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0,
        searchData: {
          'btnShow': [
            { 'title': '查询', 'fn': 'checkFn' }
          ],
          'options': [{
            'status': 1,
            'title': '预案名称',
            'placeholder': '请输入预案名称',
            'val': 'planName'
          }],
          defaultReq: {
            planName: '测试默认'
          }
        },
        form: {},
        isGetUser: false,
        filterData: {}
      }
    },
    mounted() {

    },
    created() {
      this.getPlanList();
    },
    watch: {},
    methods: {
      ...mapActions(['_getInfo']),
      //获取列表
      getPlanList() {
        let pagination = {
          "curPage": this.currentPage,
          "pageSize": this.pageSize
        };
        if(JSON.stringify(this.filterData) != '{}') {
          this.ops = { ...this.filterData, ...pagination }
        }
        this._getInfo({
          ops: this.ops,
          api: 'getSpecialList',
          callback: res => {
            this.planList = res.rows;
            this.pageTotal = res.records;
          }
        });
      },
      //编辑角色
      editFn(val) {
        this.form = val;
        this.childList = JSON.parse(val.planStep).planParentList
        this.isShowBox = true;
      },
      //搜索按钮
      btnsFn(info) {
        this[info.fn](info.item);
      },
      //查询按钮
      checkFn(item) {
        this.currentPage = 1;
        if(item.planName) {
          item.planName = this.util.trim(item.planName);
        }
        this.filterData = item;
        this.getPlanList(item);
      },
      //翻页，改变页数方法
      changePages(val) {
        this.currentPage = val;
        this.getPlanList();
      },
      //弹框保存按钮
      saveFn(val) {
        this.form.planStep = JSON.stringify({ planParentList: this.childList });
        this._getInfo({
          ops: this.form,
          api: 'planConfigAdd',
          callback: res => {
            this.isShowBox = false;
            this.message.success('编辑成功！');
            this.getPlanList();
          }
        });
      },
      cancelPlanPop() {
        this.isShowBox = false;
      }
    }
  };
</script>

<style scoped lang="less">
</style>
