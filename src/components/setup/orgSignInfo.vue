<template>
  <div>
    <div class="mask2"></div>
    <div class="popContent" v-if="initPop">
      <div class="popTitle">
        <h3>签到详情</h3>
        <i class="el-icon-close" v-on:click="onCancle"></i>
      </div>
      <div class="blueContent">
        <div class="dutyPeople clearfix">
          <ul>
            <li>单位</li>
            <li>{{infoData.orgName}}</li>
            <li>到场时间</li>
            <li>{{infoData.createTime}}</li>
            <li>值班干部</li>
            <li>{{infoData.userName}}</li>
            <li>准备情况</li>
            <li>{{infoData.signCondition}}</li>
            <li>准备评价</li>
            <li style="width:75%;">{{infoData.signAssess}}</li>
            <li>值班首长</li>
            <li>{{infoData.signLeaderName}}</li>
            <li>值班员</li>
            <li>{{infoData.signDutyName}}</li>
          </ul>
          <div class="exportBtn"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  export default {
    data() {
      return {
        dutyData: [],
        showHistory: false,
        initPop: true
      };
    },
    props: ['infoData'],
    created() {
      // this.signData();
      console.log();
    },
    methods: {
      ...mapActions(['_getInfo']),
      onCancle() {
        this.$emit('cancle', false);
      },
      hideList() {
        this.showHistory = false;
        this.initPop = true;
      }
    }
  };
</script>
<style lang="less" scoped>
  .mask2 {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10000;
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
      padding: 5px 10px 10px 10px;
      background: #3a6089;
      box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.45);
      .dutyPeople {
        width: 100%;
        margin-top: 10px;
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

