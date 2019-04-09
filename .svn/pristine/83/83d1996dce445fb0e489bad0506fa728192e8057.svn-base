<template>
  <div>
    <div class="masks"></div>
    <div class="popContent">
      <div class="popTitle">
        <h3>历史记录</h3>
        <i class="el-icon-close" v-on:click="onCancle"></i>
      </div>
      <div class="blueContent">
        <dl>
          <!-- <dt>签到列表</dt> -->
          <dd v-for="item in dutyData" v-on:click="signInfo(item.signId)">{{item.planComment}}</dd>
        </dl>
      </div>
    </div>
    <v-org-sign-info v-if="showInfo" v-bind:infoData="infoData" v-on:cancle="closeInfo"></v-org-sign-info>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  export default {
    data() {
      return {
        dutyData: [],
        showInfo: false
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
          api: 'orgHistoryList',
          callback: res => {
            this.dutyData = res.rows;
          }
        });
      },
      onCancle() {
        this.$emit('cancle', false);
      },
      signInfo(val) {
        this._getInfo({
          ops: { id: val },
          api: 'orgInfo',
          callback: res => {
            this.showInfo = true;
            this.infoData = res;
            this.dutyData = [];
            // this.$emit('cancelInfo', false);
          }
        });
      },
      closeInfo() {
        this.signData();
        this.showInfo = false;
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
      dt {
        text-align: center;
      }
      dd {
        cursor: pointer;
      }
    }
  }
  .exportBtn {
    height: 36px;
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
      float: left;
      margin-left: 15px;
      margin-top: 5px;
    }
  }
</style>
