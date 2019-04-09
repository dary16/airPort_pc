<template>
  <div class="g-userWrap">
    <v-search-title v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData"></v-search-title>
    <div class="g-table">
      <el-table :data="noticeList" stripe>
        <el-table-column align="center" prop="noticeType" label="通知类型"></el-table-column>
        <el-table-column align="center" prop="noticeTitle" label="通知标题"></el-table-column>
        <el-table-column align="center" prop="noticeComment" label="通知内容"></el-table-column>
        <el-table-column align="center" prop="bak1" label="通知部门"></el-table-column>
        <el-table-column align="center" label="操作" width="120">
          <template slot-scope="scope">
            <!-- <el-button v-on:click="editFn(scope.row)" type="text" size="small">编辑</el-button> -->
            <el-button v-on:click="deleteFn(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination class="g-pagination" @current-change="changePages" :current-page="currentPage" :total="pageTotal" background layout="prev, pager, next"></el-pagination>
    <v-pop-box id="organize" v-dialogDrag v-if="isShowBox" v-on:save="saveFn" v-bind:isUpload="true" v-on:getBtnFn="getBtnsFn" v-on:cancle="cancleFn" v-bind:popData="popData" v-bind:formData="editDate" v-bind:returnDeptsIds="returnDeptsIds" v-on:delDept="delDept"></v-pop-box>
    <!--获取部门-->
    <v-get-department v-if="isDepartment" v-on:checkedDepart="getDepartList" v-on:closeDepartFn="cancelDepartListFn"></v-get-department>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  export default {
    data() {
      return {
        noticeList: [],
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0,
        searchData: {
          'btnShow': [
            { 'title': '查询', 'fn': 'checkFn' }
            // 暂时去掉增加按钮，但是页面逻辑没有删除，去掉注释，按钮可正常使用
            // { 'title': '增加', 'fn': 'addNoticeFn' }
          ],
          'options': [{
            'status': 2,
            'title': '通知类型',
            'placeholder': '请输入通知类型',
            'val': 'noticeType',
            'list': [
              {
                value: '通知',
                label: '通知'
              }, {
                value: '公告',
                label: '公告'
              }]
          }]
        },
        isShowBox: false,
        popData: {
          'titleTotal': '信息',
          'options': [
            {
              'status': 2,
              'title': '通知类型',
              'placeholder': '请选择通知类型',
              'val': 'noticeType',
              'list': [
                {
                  value: '通知',
                  label: '通知'
                }, {
                  value: '公告',
                  label: '公告'
                }, {
                  value: '指令',
                  label: '指令'
                }]
            }, {
              'status': 1,
              'title': '通知标题',
              'placeholder': '请输入通知标题',
              'val': 'noticeTitle',
              'list': []
            }, {
              'status': 1,
              'title': '通知内容',
              'placeholder': '请输入通知内容',
              'val': 'noticeComment',
              'visible': true
            }, {
              'status': 11,
              'title': '接受通知部门',
              'placeholder': '请选择接受通知部门',
              'val': 'deptsId',
              'fn': 'getDeptsFn'
            }
          ]
        },
        editDate: {},
        ops: {},
        filterVal: {},
        deptsIds: [],
        isDepartment: false,
        returnDeptsIds: []
      }
    },
    computed: {
      ...mapState(['currentSip'])
    },
    created() {
      this.getNoticeList();
    },
    watch: {
      deptsIds() {
        if(this.deptsIds.length != 0) {
          this.returnDeptsIds = JSON.parse(JSON.stringify(this.deptsIds));
        }
      }
    },
    methods: {
      ...mapActions(['_getInfo']),
      //获取列表
      getNoticeList() {
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
          api: 'getNoticeList',
          callback: res => {
            this.noticeList = res.rows;
            this.pageTotal = res.records;
          }
        });
      },
      //删除通知
      deleteFn(id) {
        this.oMsgBox.confirm('确定删除通知吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          this._getInfo({
            ops: {
              "ids": id,
            },
            api: 'deleteNotice',
            callback: res => {
              this.message.success('删除成功！');
              this.getNoticeList();
            }
          });
        }).catch(() => {

        });
      },
      //编辑通知
      editFn(val) {
        this.isShowBox = true;
        this.editDate = val;
      },
      //搜索按钮
      btnsFn(info) {
        this[info.fn](info.item);
      },
      //获取部门列表
      getDepartList(list) {
        this.isDepartment = false;
        list.forEach(item => {
          this.deptsIds.push({ 'id': item.id, 'label': item.label });
        });
      },
      //关闭部门列表
      cancelDepartListFn() {
        this.isDepartment = false;
      },
      //获取子集传来的调用方法
      getBtnsFn(fn) {
        this[fn]();
      },
      //调用获取部门的方法
      getDeptsFn() {
        this.deptsIds = [];
        this.isDepartment = true;
      },
      //查询按钮
      checkFn(item) {
        this.currentPage = 1;
        item.noticeType = this.util.trim(item.noticeType);
        this.filterVal = item;
        this.getNoticeList();
      },
      //增加按钮
      addNoticeFn() {
        this.isShowBox = true;
        this.editDate = {};
      },
      //翻页，改变页数方法
      changePages(val) {
        this.currentPage = val;
        this.getNoticeList();
      },
      //弹框保存按钮
      saveFn(val) {

        if(val.noticeComment && val.noticeType) {
          var str = '';
          this.deptsIds.forEach((item, index) => {
            if(index != this.deptsIds.length - 1) {
              str += item.id + ','
            } else {
              str += item.id
            }
          })
          val.deptsId = str;
          let ops = JSON.parse(JSON.stringify(val));

          delete ops.pttMember;
          this.isShowBox = false;
          this._getInfo({
            ops: ops,
            api: 'publishNotice',
            callback: res => {
              if(val.id) {
                this.message.success('编辑成功！');
              } else {
                this.message.success('新增成功！');
              }
              this.getNoticeList();
            }
          });
        } else {
          this.message.error('请填写完整信息！');
        }
      },
      //弹框取消按钮
      cancleFn(val) {
        this.isShowBox = val;
      },
      //获取部门
      delDept(arr) {
        this.deptsIds = [];
        this.deptsIds = arr;
      }
    },
  };
</script>

<style scoped lang="less">
</style>
