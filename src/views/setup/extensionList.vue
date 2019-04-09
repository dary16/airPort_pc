<template>
  <div class="g-userWrap">
    <v-search-title v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData"></v-search-title>
    <div class="g-table">
      <el-table :data="roleList" stripe>
        <el-table-column align="center" prop="number" label="分机号" width="300"></el-table-column>
        <el-table-column align="center" prop="password" label="分机密码" width="300"></el-table-column>
        <el-table-column align="center" prop="" label="呼入录音">
          <template slot-scope="scope">
            {{scope.row.incoming=='Always'?'总是':'从不'}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="" label="呼出录音">
          <template slot-scope="scope">
            {{scope.row.exhale=='Always'?'总是':'从不'}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="" label="视频录音">
          <template slot-scope="scope">
            {{scope.row.videoRecord==0?'否':'是'}}
          </template>
        </el-table-column>
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
            'title': '分机号',
            'placeholder': '请输入分机号',
            'val': 'number'
          }],
          defaultReq: {
            number: '测试默认'
          }
        },
        isShowBox: false,
        popData: {
          'titleTotal': '信息',
          'options': [{
            'status': 1,
            'title': '分机号',
            'placeholder': '请输入分机号',
            'val': 'number',
            'visible': false,
            'disabled': false
          }, {
            'status': 7,
            'title': '分机密码',
            'placeholder': '请输入分机密码',
            'val': 'password',
            'visible': true
          }, {
            'status': 6,
            'title': '呼入录音',
            'placeholder': '请选择呼入录音',
            'val': 'incoming',
            'list': [{ "value": "Never", "label": "从不" }, { "value": "Always", "label": "总是" }]
          }, {
            'status': 6,
            'title': '呼出录音',
            'placeholder': '请选择呼出录音',
            'val': 'exhale',
            'list': [{ "value": "Never", "label": "从不" }, { "value": "Always", "label": "总是" }]
          }, {
            'status': 6,
            'title': '视频录音',
            'placeholder': '请选择视频录音',
            'val': 'videoRecord',
            'list': [{ "value": "0", "label": "是" }, { "value": "1", "label": "否" }]
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
          api: 'getExtensionList',
          callback: res => {
            this.roleList = res.rows;
            this.pageTotal = res.records;
          }
        });
      },
      //删除角色
      deleteFn(id) {
        this.oMsgBox.confirm('确定删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          this._getInfo({
            ops: {
              "ids": id,
            },
            api: 'deleteExtension',
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
        this.popData.options[0].disabled = true;
      },
      //搜索按钮
      btnsFn(info) {
        this[info.fn](info.item);
      },
      //查询按钮
      checkFn(item) {
        this.currentPage = 1;
        item.number = this.util.trim(item.number);
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
        if(val.exhale && val.incoming && val.videoRecord && (this.util.trim(val.password) !== '')) {
          this.isShowBox = false;
          this._getInfo({
            ops: val,
            api: 'addExtension',
            callback: res => {
              if(val.id) {
                this.message.success('编辑成功！');
              } else {
                this.message.success('新增成功！');
              }
              this.getRoleList();
            }
          });
        } else {
          this.message.error('请填写完整信息！');
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
