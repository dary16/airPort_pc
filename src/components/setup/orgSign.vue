<template>
  <div>
    <div class="masks"></div>
    <div class="popContent" v-if="initPop">
      <div class="popTitle">
        <h3>部门签到</h3>
        <a href="javascript:;" @click="showList()">查看历史</a>
        <i class="el-icon-close" v-on:click="onCancle"></i>
      </div>
      <div class="blueContent">
        <div class="tableWrap">
          <el-table :data="dutyData" style="width: 100%">
            <el-table-column prop="orgName" label="单位" width="100">
            </el-table-column>
            <el-table-column prop="createTime" label="到场时间" width="190">
            </el-table-column>
            <el-table-column prop="signLeaderName" label="值班干部（签字）" width="180">
            </el-table-column>
            <el-table-column prop="signCondition" label="准备情况" width="130">
            </el-table-column>
            <el-table-column prop="signAssess" label="准备评价">
            </el-table-column>
          </el-table>
        </div>
        <div class="dutyPeople clearfix">
          <ul>
            <li>值班首长</li>
            <li>{{leaderName}}</li>
            <li>值班员</li>
            <li>{{dutyName}}</li>
          </ul>
          <div class="exportBtn"></div>
        </div>
      </div>
    </div>
    <v-sign-history v-if="showHistory" v-on:cancle="hideList" v-on:cancelInfo="hideInfoList"></v-sign-history>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  export default {
    data() {
      return {
        dutyData: [],
        showHistory: false,
        initPop: true,
        leaderName: '',
        dutyName: ''
      };
    },
    props: [],
    created() {
      this.signData();
    },
    methods: {
      ...mapActions(['_getInfo']),
      signData() {
        this._getInfo({
          ops: {},
          api: 'orgSignList',
          callback: res => {
            this.dutyData = res.rows;
            if(this.dutyData.length > 0) {
              this.leaderName = res.rows[0].signLeaderName;
              this.dutyName = res.rows[0].signDutyName;
            }
          }
        });
      },
      onCancle() {
        this.$emit('cancle', false);
      },
      showList() {
        this.showHistory = true;
        this.initPop = false;
      },
      hideList() {
        this.showHistory = false;
        this.initPop = true;
      },
      hideInfoList() {
        this.showHistory = false;
      }
    }
  };
</script>
<style lang="less" scoped>
  .masks {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
  }
  .popContent {
    position: fixed;
    background: #fff;
    width: 750px;
    left: 50%;
    margin-left: -311px;
    top: 30%;
    z-index: 99999;
    overflow: hidden;
    color: #e0e0e0;
    font-size: 18px;
    .popTitle {
      font-weight: 400;
      color: rgba(224, 224, 224, 1);
      text-align: left;
      font-size: 20px;
      line-height: 38px;
      cursor: pointer;
      z-index: 1001;
      width: 100%;
      height: 38px;
      background: linear-gradient(
        90deg,
        rgba(0, 65, 117, 1),
        rgba(15, 108, 178, 1)
      );
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
        cursor: pointer;
      }
    }
    .blueContent {
      padding: 5px 10px 50px 10px;
      background: #3a6089;
      box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.45);
      .dutyPeople {
        width: 100%;
        margin-top: 50px;
        li {
          width: 25%;
          float: left;
          height: 36px;
          line-height: 36px;
          text-align: center;
          border: 1px solid #325276;
        }
        li:nth-child(2n) {
          background: #ccd6e0;
          color: #144368;
        }
        li:nth-child(2n + 1) {
          background: #1b73bc;
        }
      }
    }
  }
  .popTitle {
    a {
      display: block;
      width: 100px;
      height: 35px;
      padding: 0 10px;
      line-height: 32px;
      text-align: center;
      // background: #54596e;
      background: url(../../assets/btn_common.png) no-repeat;
      background-size: 100% 100%;
      font-size: 16px;
      color: #ffffff;
      text-decoration: none;
      float: right;
      margin-right: 70px;
      margin-top: 3px;
    }
  }
</style>
<style>
  .tableWrap .el-table th {
    background: #1b73bc;
    color: #fff;
    text-align: center;
    font-weight: normal;
    font-size: 18px;
    border: 2px solid #145d97;
  }
  .tableWrap .el-table td {
    font-size: 18px;
    border: 2px solid #145d97;
    text-align: center;
    color: #144368;
    background: #ccd6e0;
  }
  .tableWrap .el-table tr td:first-child {
    background: #1b73bc !important;
    color: #fff !important;
  }
  .tableWrap .el-table th,
  .tableWrap .el-table td {
    padding: 4px 0 !important;
  }
  .tableWrap .el-table::before {
    height: 0 !important;
  }
</style>

