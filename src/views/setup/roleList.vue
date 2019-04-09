<template>
  <div class="g-userWrap">
    <v-search-title v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData"></v-search-title>
    <div class="g-table">
      <el-table :data="roleList" stripe>
        <el-table-column align="center" prop="roleName" label="角色名称" width="300"></el-table-column>
        <el-table-column align="center" prop="roleCode" label="角色编码" width="300"></el-table-column>
        <el-table-column align="center" prop="roleRemark" label="备注"></el-table-column>
        <el-table-column align="center" label="操作" width="120">
          <template slot-scope="scope">
            <el-button v-on:click="editFn(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-on:click="deleteFn(scope.row.roleId)" type="text" size="small">删除</el-button>
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
            'title': '角色名称',
            'placeholder': '请输入角色名称',
            'val': 'roleName'
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
            'title': '角色名称',
            'placeholder': '请输入角色名称',
            'val': 'roleName',
            'visible': true
          }, {
            'status': 1,
            'title': '角色编码',
            'placeholder': '请输入角色编码',
            'val': 'roleCode',
            'visible': true
          }, {
            'status': 1,
            'title': '备注',
            'placeholder': '备注',
            'val': 'roleRemark'
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
        if(JSON.stringify(this.filterVal) != '{}') {
          this.ops = { ...this.filterVal, ...pagination }
        } else {
          this.ops = pagination;
        }

        this._getInfo({
          ops: this.ops,
          api: 'getRoleList',
          callback: res => {
            this.roleList = res.rows;
            this.pageTotal = res.records;
          }
        });
      },
      //删除角色
      deleteFn(id) {
        this.oMsgBox.confirm('确定删除当前角色吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          this._getInfo({
            ops: {
              "ids": id,
            },
            api: 'deleteRole',
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
        item.roleName = this.util.trim(item.roleName);
        this.filterVal = item;
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
        if(val.roleName && val.roleCode) {
          this.isShowBox = false;
          this._getInfo({
            ops: val,
            api: 'addRole',
            callback: res => {
              if(val.roleId) {
                this.message.success('编辑成功！');
              } else {
                this.message.success('新增成功！');
              }
              this.getRoleList();
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
