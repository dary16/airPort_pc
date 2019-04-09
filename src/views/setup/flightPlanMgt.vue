<template>
  <div class="g-userWrap">
    <v-search-title v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData"></v-search-title>
    <div class="g-table">
      <el-table :data="planList" stripe style="width: 100%;">
        <el-table-column align="center" prop="title" label="标题"></el-table-column>
        <el-table-column align="center" prop="startTime" label="昼时间"></el-table-column>
        <el-table-column align="center" prop="endTime" label="夜时间"></el-table-column>
        <el-table-column align="center" prop="dateType" label="日期"></el-table-column>
        <el-table-column align="center" prop="dutyHeadName" label="值班首长"></el-table-column>
        <el-table-column align="center" prop="dutyStaffName" label="值班参谋"></el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button v-on:click="editFn(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-on:click="delFn(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination class="g-pagination" @current-change="changePages" :current-page="currentPage" :total="pageTotal" background layout="prev, pager, next"></el-pagination>
    <div class="mask" v-if="isShowBox">
      <div class="popBox" v-if="isShowBox">
        <div class="header">
          <h3>新增</h3>
          <i class="el-icon-close" v-on:click="cancleFn()"></i>
        </div>
        <el-form :inline="true" ref="form" :model="form" label-width="120px">
          <!-- <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item> -->
          <el-form-item label="日期">
            <!-- <el-select v-model="form.dateType" placeholder="请选择类型">
                            <el-option label="昼间计划" value="昼间计划"></el-option>
                            <el-option label="夜间计划" value="夜间计划"></el-option>
                        </el-select> -->
            <el-date-picker v-model="form.dateType" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="昼时间">
            <el-time-picker is-range v-model="dayArr" format="HH:mm" value-format="HH:mm" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
            <!-- <el-date-picker v-model="form.startTime" value-format="yyyy-MM-dd" type="date" placeholder="选择开始日期"></el-date-picker> -->
          </el-form-item>
          <el-form-item label="夜时间">
            <el-time-picker is-range v-model="nightArr" format="HH:mm" value-format="HH:mm" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
            <!-- <el-date-picker v-model="form.endTime" value-format="yyyy-MM-dd" type="date" placeholder="选择结束日期"></el-date-picker> -->
          </el-form-item>

          <el-form-item label="总时间">
            <el-input v-model="form.countTime"></el-input>
          </el-form-item>

          <el-form-item label="参训飞机">
            <el-input v-model="form.flyPlane"></el-input>
          </el-form-item>
          <el-form-item label="占场时间">
            <el-input v-model="form.accountTime"></el-input>
          </el-form-item>
          <el-form-item label="总架次">
            <el-input v-model="form.totalVehicles"></el-input>
          </el-form-item>
          <el-form-item label="参飞人数">
            <el-input v-model="form.flyNumber"></el-input>
          </el-form-item>
          <el-form-item label="值班首长">
            <el-button type="primary" v-on:click="isGetHead= true">请选择值班首长</el-button>
            {{form.dutyHeadName}}
          </el-form-item>
          <el-form-item label="值班参谋">
            <el-button type="primary" v-on:click="isGetChief= true">请选择值班参谋</el-button>
            {{form.dutyStaffName}}
          </el-form-item>
          <el-form-item label="值班车辆">
            <el-button type="primary" v-on:click="isCheckedCar = true">请选择值班车辆</el-button>
            <span v-for="item in getCarArr">车:{{item.carType}} 人:{{item.driverName}}</span>
          </el-form-item>
          <el-form-item label="备注" style="width:80%;">
            <el-input type="textarea" v-model="form.comment"></el-input>
          </el-form-item>
          <el-form-item style="width:100%;text-align:center;">
            <el-button type="primary" @click="saveFn()">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <v-get-user v-if="isGetHead" v-on:checkedUser="getHeadList" v-on:closeUserFn="cancelHeadListFn"></v-get-user>
    <v-get-user v-if="isGetChief" v-on:checkedUser="getChiefList" v-on:closeUserFn="cancelChiefListFn"></v-get-user>
    <v-get-duty-vehicle v-if="isCheckedCar" v-on:checkedCar="getCarDataFn" v-on:closeCarFn="closeCarFn"></v-get-duty-vehicle>
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
            { 'title': '查询', 'fn': 'checkFn' },
            { 'title': '增加', 'fn': 'addFn' }
          ],
          'options': [{
            'status': 1,
            'title': '标题',
            'placeholder': '请输入标题',
            'val': 'title'
          }],
          defaultReq: {
            planName: '测试默认'
          }
        },
        form: {},
        isGetHead: false,
        isGetChief: false,
        curUser: [],
        curIndex: 0,
        isCheckedCar: false,
        getCarArr: [],
        filterData: {},
        dayArr: ["00:00", "00:00"],
        nightArr: ["00:00", "00:00"]
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
        } else {
          this.ops = pagination;
        }
        this._getInfo({
          ops: this.ops,
          api: 'flightPlanMgtList',
          callback: res => {
            this.planList = res.rows;
            this.pageTotal = res.records;
          }
        });
      },
      //编辑角色
      editFn(val) {
        this.dayArr = val.startTime.split('-');
        this.nightArr = val.endTime.split('-');
        this.form = val;
        this.getCarArr = val.listCar;
        this.isShowBox = true;
      },
      //删除
      delFn(id) {
        this.oMsgBox.confirm('确定删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          this._getInfo({
            ops: {
              'ids': id
            },
            api: 'flightPlanMgtDel',
            callback: res => {
              this.message.success('删除成功！');
              this.getPlanList();
            }
          });
        }).catch(() => {

        });
      },
      //搜索按钮
      btnsFn(info) {
        this[info.fn](info.item);
      },
      //查询按钮
      checkFn(item) {
        this.currentPage = 1;
        item.title = this.util.trim(item.title);
        this.filterData = item;
        this.getPlanList(item);
      },
      //增加按钮
      addFn() {
        this.form = {};
        this.dayArr = ["00:00", "00:00"];
        this.nightArr = ["00:00", "00:00"];
        this.getCarArr = [];
        this.isShowBox = true;
      },
      //翻页，改变页数方法
      changePages(val) {
        this.currentPage = val;
        this.getPlanList();
      },
      //弹框保存按钮
      saveFn() {
        // if(!this.form.title) {
        //   this.message.error('请输入标题！');
        //   return false;
        // }
        if(!this.form.dateType) {
          this.message.error('请选择日期！');
          return false;
        }
        if(!this.form.countTime) {
          this.message.error('请输入总时间！');
          return false;
        }
        if(!this.form.flyPlane) {
          this.message.error('请输入参训飞机！');
          return false;
        }
        this.form.startTime = this.dayArr.join('-');
        this.form.endTime = this.nightArr.join('-');
        this._getInfo({
          ops: this.form,
          api: 'flightPlanMgtAdd',
          callback: res => {
            this.isShowBox = false;
            this.message.success('新增成功！');
            this.getPlanList();
          }
        });
      },
      //弹框取消按钮
      cancleFn(val) {
        this.isShowBox = val;
      },
      //关闭选取值班首长的弹框
      cancelHeadListFn() {
        this.isGetHead = false;
      },
      //获取值班首长数据
      getHeadList(list) {
        var nameUser = [];
        var idUser = [];
        this.isGetHead = false;
        list.forEach(item => {
          nameUser.push(item.label);
          idUser.push(item.id)
        })
        this.form.dutyHeadName = nameUser.join(',');
        this.form.dutyHeadId = idUser.join(',')
      },
      //关闭选取值班参谋长的弹框
      cancelChiefListFn() {
        this.isGetChief = false;
      },
      //获取值班参谋长数据
      getChiefList(list) {
        var nameUser = [];
        var idUser = [];
        this.isGetChief = false;
        list.forEach(item => {
          nameUser.push(item.label);
          idUser.push(item.id)
        })
        this.form.dutyStaffName = nameUser.join(',');
        this.form.dutyStaffId = idUser.join(',')
      },
      //获取车
      getCarDataFn(obj) {
        this.getCarArr.push(obj);
        this.isCheckedCar = false;
        this.form.listCar = this.getCarArr;
      },
      //关闭获取车的弹框
      closeCarFn() {
        this.isCheckedCar = false;
      }
    }
  };
</script>

<style scoped lang="less">
  .childListStyle {
    li {
      input {
        width: 80%;
        border: none;
      }
      div {
        border-bottom: 1px solid #ccc;
        input {
          width: 80%;
          border: none;
          margin-left: 30px;
        }
        h3 {
          width: 80%;
          margin-left: 30px;
          font-weight: bold;
          padding-top: 10px;
        }
        .chooseUser {
          background: #f7f7f7;
          padding-left: 30px;
          border-bottom: none;
          cursor: pointer;
        }
      }
    }
  }
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
    width: 750px;
    left: 50%;
    margin-left: -300px;
    top: 50px;
    overflow-y: auto;
    .header {
      font-weight: 400;
      color: rgba(224, 224, 224, 1);
      text-align: left;
      font-size: 20px;
      line-height: 38px;
      cursor: pointer;
      z-index: 1001;
      width: 750px;
      height: 38px;
      background: linear-gradient(90deg, #222551, #34195c);
      box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.8);
      position: relative;
      h3 {
        display: inline-block;
        padding-left: 12px;
        font-weight: normal;
        font-size: 20px;
      }
      .el-icon-close {
        position: absolute;
        top: 10px;
        right: 12px;
      }
    }
    form {
      padding: 20px 10px;
      background: #cfd6f3;
      .el-form-item {
        width: 48%;
      }
    }
  }
  .el-date-editor--timerange.el-input__inner {
    width: 220px;
  }
</style>
