<template>
  <div class="g-userWrap">
    <v-search-title v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData"></v-search-title>
    <div class="g-table">
      <el-table :data="roleList" stripe>
        <!-- <el-table-column align="center" prop="userId" label="用户id" width="200"></el-table-column> -->
        <el-table-column align="center" prop="userId" label="用户sip" width="200"></el-table-column>
        <el-table-column align="center" prop="userName" label="用户名称" width="200"></el-table-column>
        <el-table-column align="center" prop="orgId" label="部门id" width="200"></el-table-column>
        <el-table-column align="center" prop="orgName" label="orgId" width="200"></el-table-column>
        <el-table-column align="center" prop="orgCode" label="部门编码" width="200"></el-table-column>
        <el-table-column align="center" prop="starttime" label="开始时间"></el-table-column>
        <el-table-column align="center" prop="endtime" label="结束时间"></el-table-column>
        <el-table-column align="center" label="操作" width="120">
          <template slot-scope="scope">
            <el-button v-on:click="editFn(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-on:click="deleteFn(scope.row.signId)" type="text" size="small">删除</el-button>
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
            'title': '用户名称',
            'placeholder': '请输入用户名称',
            'val': 'userName'
          }],
          defaultReq: {
            userName: '测试默认'
          }
        },
        isShowBox: false,
        popData: {
          'titleTotal': '新增',
          'options': [{
            'status': 1,
            'title': '用户id',
            'placeholder': '请输入用户id',
            'val': 'userId',
            'visible': true
          }, {
            'status': 1,
            'title': '用户名称',
            'placeholder': '请输入用户名称',
            'val': 'userName',
            'visible': true
          }, {
            'status': 1,
            'title': '用户sip',
            'placeholder': '请输入用户sip',
            'val': 'userSip'
          }, {
            'status': 1,
            'title': '部门id',
            'placeholder': '请输入部门id',
            'val': 'orgId'
          }, {
            'status': 1,
            'title': 'orgId',
            'placeholder': '请输入orgId',
            'val': 'orgName'
          }, {
            'status': 1,
            'title': '部门编号',
            'placeholder': '请输入部门编号',
            'val': 'orgCode'
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
        if((JSON.stringify(this.filterData) != '{}')) {
          this.ops = { ...this.filterData, ...pagination }
        } else {
          this.ops = pagination;
        }

        this._getInfo({
          ops: this.ops,
          api: 'signInList',
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
            api: 'delSign',
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
        this.currentPage = 1;
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
        if(!val.userId) {
          this.message.error('请输入用户id！');
          return false;
        }
        if(!val.userName) {
          this.message.error('请输入用户名称！');
          return false;
        }
        if(val.starttime && val.endtime && new Date(val.starttime).getTime() > new Date(val.endtime).getTime()) {
          this.message.error('开始时间不能大于结束时间！');
          return false;
        }
        this.isShowBox = false;
        this._getInfo({
          ops: val,
          api: 'addSign',
          callback: res => {
            if(val.signId) {
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
