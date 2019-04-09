<template>
  <div class="g-userWrap">
    <v-search-title v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData"></v-search-title>
    <div class="g-table">
      <el-table :data="planList" stripe style="width: 100%;">
        <el-table-column align="center" prop="title" label="标题"></el-table-column>
        <el-table-column align="center" prop="commanderName" label="指挥员"></el-table-column>
        <el-table-column align="center" prop="dutyStaffName" label="值班参谋"></el-table-column>
        <el-table-column align="center" prop="comment" label="备注"></el-table-column>
        <el-table-column align="center" prop="status" label="状态"></el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button v-on:click="editFn(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-on:click="delFn(scope.row.id)" type="text" size="small">删除</el-button>
            <el-button v-if="scope.row.status=='未完成'" v-on:click="updateFn(scope.row.id)" type="text" size="small">完成</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination class="g-pagination" @current-change="changePages" :current-page="currentPage" :total="pageTotal" background layout="prev, pager, next"></el-pagination>
    <div class="mask" v-if="isShowBox">
      <div class="popBox" v-if="isShowBox">
        <div class="header">
          <h3>新增保障计划</h3>
          <i class="el-icon-close" v-on:click="cancleFn()"></i>
        </div>
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="指挥员">
            <el-button type="primary" v-on:click="isGetHead= true">请选择指挥员</el-button>
            {{form.commanderName}}
          </el-form-item>
          <el-form-item label="值班参谋">
            <el-button type="primary" v-on:click="isGetChief= true">请选择值班参谋</el-button>
            {{form.dutyStaffName}}
          </el-form-item>
          <el-form-item label="飞行计划">
            <el-select v-model="form.flightPlanId" placeholder="请选择飞行计划">
              <el-option v-for="item in selectFlightPlan" :label="item.title" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.comment"></el-input>
          </el-form-item>
        </el-form>
        <el-tabs v-model="tabDefaultVal" type="card" @tab-click="handleTabClickFn">
          <el-tab-pane v-for="item in tabList" :label="item.orgName" :name="item.orgId"></el-tab-pane>
        </el-tabs>
        <div class="eachList">
          <ul class="title clearfix">
            <li>到达时间</li>
            <li>到达地点</li>
            <li>类型</li>
            <li>数量</li>
            <li>
              <a v-on:click="addSubFn()" href="javascript:;">增加</a>
            </li>
          </ul>
          <ul class="list clearfix" v-for="(item,index) in show">
            <li>
              <el-date-picker v-model="item.arrivalTime" value-format="yyyy-MM-dd" type="date" placeholder="选择到达时间"></el-date-picker>
            </li>
            <li>
              <el-input v-model="item.arrivalPlace"></el-input>
            </li>
            <li>
              <el-select v-model="item.carType" placeholder="请选择类型">
                <el-option v-for="item in typeList" :label="item" :value="item"></el-option>
              </el-select>
            </li>
            <li>
              <el-input v-model="item.carNum"></el-input>
            </li>
            <li>
              <a href="javascript:;" v-on:click="delSubFn(item.id,index)">删除</a>
            </li>
          </ul>
        </div>
        <div class="btnsStyle">
          <el-button type="primary" @click="saveFn()">确定</el-button>
          <el-button type="" @click="cancleFn()">关闭</el-button>
        </div>
        <div class="allocationShow" v-if="allocationList.length!=0">
          <div v-for="item in allocationList">
            <dl v-if="item.type_name=='人员'">
              <dt>{{item.type_name}}</dt>
              <dd v-for="subItem in item.listInfo">
                <span>名称：{{subItem.pepoleName}}</span>
                <span>角色：{{subItem.pepoleRole}}</span>
                <span>级别：{{subItem.pepoleLevel}}</span>
              </dd>
            </dl>
            <dl v-else>
              <dt>{{item.type_name}}</dt>
              <dd v-for="subItem in item.listInfo">
                <span>车名称：{{subItem.carName}}</span>
                <span>车牌号：{{subItem.carCode}}</span>
                <span>车辆类型：{{subItem.carMode}}</span>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <v-get-user v-if="isGetHead" v-on:checkedUser="getHeadList" v-on:closeUserFn="cancelHeadListFn"></v-get-user>
    <v-get-user v-if="isGetChief" v-on:checkedUser="getChiefList" v-on:closeUserFn="cancelChiefListFn"></v-get-user>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    data() {
      return {
        planList: [],
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
            'title': '指挥员',
            'placeholder': '请输入指挥员名称',
            'val': 'commanderName'
          }],
          defaultReq: {
            planName: '测试默认'
          }
        },
        form: {},
        isGetHead: false,
        isGetChief: false,
        selectFlightPlan: [],
        tabList: [],
        show: [],
        listTeam0: [],
        listTeam1: [],
        listTeam2: [],
        listTeam3: [],
        listTeam4: [],
        listTeam5: [],
        listTeam6: [],
        listTeam7: [],
        listTeam8: [],
        listTeam: [],
        curTeamId: '',
        curTeamName: '',
        curTabIndex: 0,
        typeList: [],
        tabDefaultVal: '',
        allocationList: [],
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
          api: 'flightSupportMgtList',
          callback: res => {
            this.planList = res.rows;
            this.pageTotal = res.records;
          }
        });
      },
      //编辑角色
      editFn(val) {
        this.form = JSON.parse(JSON.stringify(val));
        this.listTeam = this.form.listTeam;
        //获取飞行计划列表，下拉
        this.getFlightPlanFn();
        this.getLeafOrgListFn();
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
            api: 'flightSupportMgtDel',
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
        item.commanderName = this.util.trim(item.commanderName);
        this.filterData = item;
        this.getPlanList();
      },
      //增加按钮
      addFn() {
        this.form = {};
        this.listTeam = [];
        this.isShowBox = true;
        //获取飞行计划列表，下拉
        this.getFlightPlanFn();
        this.getLeafOrgListFn();
      },
      getFlightPlanFn() {
        this._getInfo({
          ops: {},
          api: 'flightPlanMgtList',
          callback: res => {
            this.selectFlightPlan = res.rows;
          }
        });
      },
      //翻页，改变页数方法
      changePages(val) {
        this.currentPage = val;
        this.getPlanList();
      },
      //弹框保存按钮
      saveFn() {
        if(!this.form.commanderName) {
          this.message.error('请选择指挥员！');
          return false;
        }
        if(!this.form.dutyStaffName) {
          this.message.error('请选择值班参谋！');
          return false;
        }
        this.listTeam = [];
        this.tabList.forEach((item, index) => {
          this['listTeam' + index].forEach(subItem => {
            if(subItem.carType) {
              this.listTeam.push(subItem);
            }
          })
        })
        this.form.listTeam = this.listTeam;
        this._getInfo({
          ops: this.form,
          api: 'flightSupportMgtAdd',
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
      //关闭选取指挥员的弹框
      cancelHeadListFn() {
        this.isGetHead = false;
      },
      //获取指挥员数据
      getHeadList(list) {
        var nameUser = [];
        var idUser = [];
        this.isGetHead = false;
        list.forEach(item => {
          nameUser.push(item.label);
          idUser.push(item.id)
        })
        this.form.commanderName = nameUser.join(',');
        this.form.commanderId = idUser.join(',')
      },
      //关闭选取值班参谋的弹框
      cancelChiefListFn() {
        this.isGetChief = false;
      },
      //获取值班参谋数据
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
      //获取连队列表
      getLeafOrgListFn() {
        this._getInfo({
          ops: {},
          api: 'getLeafOrgList',
          callback: res => {
            this.tabList = res;
            if(this.listTeam.length != 0) {
              this.tabList.forEach((item, index) => {
                this['listTeam' + index] = [];
                this.listTeam.forEach(subItem => {
                  if(item.orgId == subItem.teamId) {
                    this['listTeam' + index].push(subItem);
                  }
                })
              })
            } else {
              this.tabList.forEach((item, index) => {
                this['listTeam' + index] = [];
              })
            }
            this.handleTabClickFn();
            this.tabDefaultVal = this.tabList[0].orgId;
          }
        });
      },
      //选项卡点击事件
      handleTabClickFn(tab, event) {
        if(tab && tab.index) {
          this.curTabIndex = tab.index;
        } else {
          this.curTabIndex = 0;
        }
        this.show = this['listTeam' + this.curTabIndex];
        this.curTeamId = this.tabList[this.curTabIndex].orgId;
        this.curTeamName = this.tabList[this.curTabIndex].orgName;
        this._getInfo({
          ops: { type: this.tabList[this.curTabIndex].orgCode },
          api: 'getOrgType',
          callback: res => {
            this.typeList = [];
            var keyArr = [];
            for(var i in res) {
              this.typeList.push(res[i]);
              keyArr.push(i);
            }
            //此处 this.listTeam == 0  认为是新建
            if(this.listTeam.length == 0) {
              // this['listTeam' + this.curTabIndex] = [];
              if(this['listTeam' + this.curTabIndex].length == 0) {
                keyArr.forEach((item, index) => {
                  if(item.substring(item.length - 2) == '_1') {
                    this['listTeam' + this.curTabIndex].push({
                      'teamId': this.curTeamId,
                      'teamName': this.curTeamName,
                      'arrivalTime': '',
                      'arrivalPlace': '',
                      'carType': this.typeList[index],
                      'carNum': ''
                    })
                  }
                })
                this.show = this['listTeam' + this.curTabIndex];
                // this.listTeam = this['listTeam' + this.curTabIndex];
              }
            }
            if(this.form && this.form.id) {
              this._getInfo({
                ops: {
                  planId: this.form.id,
                  orgId: this.curTeamId
                },
                api: 'getTeamDetail',
                callback: res => {
                  this.allocationList = res;
                }
              });
            }
          }
        });
      },
      addSubFn() {
        this['listTeam' + this.curTabIndex].push({
          'teamId': '',
          'teamName': '',
          'arrivalTime': '',
          'arrivalPlace': '',
          'carType': '',
          'carNum': ''
        });
        this['listTeam' + this.curTabIndex].forEach(item => {
          item.teamId = this.curTeamId;
          item.teamName = this.curTeamName;
        })
      },
      delSubFn(id, delIndex) {
        if(id) {
          this['listTeam' + this.curTabIndex].forEach((subItem, subIndex) => {
            if(subItem.id == id) {
              this['listTeam' + this.curTabIndex].splice(subIndex, 1);
            }
          })

          this.listTeam.forEach((item, index) => {
            if(item.id == id) {
              this.listTeam.splice(index, 1);
            }
          })
        } else {
          this.tabList.forEach((item, index) => {
            this['listTeam' + index].forEach((subItem, subIndex) => {
              this['listTeam' + subIndex].splice(delIndex, 1);
            })
          })
        }
      },
      //更新当前列，完成
      updateFn(id) {
        this._getInfo({
          ops: {
            id: id
          },
          api: 'updateStatus',
          callback: res => {
            this.message.success('更新成功！');
            this.getPlanList();
          }
        });
      }
    }
  };
</script>

<style scoped lang="less">
  .g-userWrap {
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
      background: #cfd6f3;
      position: fixed;
      width: 900px;
      left: 50%;
      margin-left: -450px;
      top: 30px;
      height: 800px;
      overflow-y: auto;
      .header {
        font-weight: 400;
        color: rgba(224, 224, 224, 1);
        text-align: left;
        font-size: 20px;
        line-height: 38px;
        cursor: pointer;
        z-index: 1001;
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
      }
    }
  }
  .btnsStyle {
    text-align: center;
    padding: 20px 0px;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .eachList {
    .title {
      margin-top: 8px;
      position: relative;
      li {
        width: 22%;
        float: left;
        text-align: center;
        font-weight: bold;
        height: 30px;
        line-height: 30px;
      }
      li:last-child {
        width: 12%;
        text-align: center;
      }
    }
    .list {
      li {
        width: 22%;
        float: left;
        padding: 10px;
      }
      li:last-child {
        text-align: center;
        width: 12%;
        line-height: 40px;
      }
    }
  }
  .allocationShow {
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.3);
    div {
      dt {
        line-height: 30px;
      }
      dd {
        line-height: 30px;
        overflow: hidden;
        span {
          float: left;
          margin-right: 20px;
        }
      }
    }
  }
</style>
