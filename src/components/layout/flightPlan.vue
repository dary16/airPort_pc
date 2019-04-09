<template>
  <div>
    <div class="masks"></div>
    <div class="popContent">
      <div class="popTitle">
        <h3>飞行计划</h3>
        <i class="el-icon-close" v-on:click="onCancle"></i>
      </div>
      <div class="blueContent clearfix">
        <div class="left">
          <dl class="top clearfix">
            <dt>日期</dt>
            <dd>{{planInfo.dateType}}</dd>
            <dt>值班人</dt>
            <dd>{{planInfo.dutyHeadName}}/{{planInfo.dutyStaffName}}</dd>
            <dt>时间</dt>
            <dd><span>{{planInfo.startTime}}</span><span>{{planInfo.endTime}}</span></dd>
            <dt>占场时间</dt>
            <dd>{{planInfo.accountTime}}</dd>
            <dt>总时间</dt>
            <dd>{{planInfo.countTime}}</dd>
            <dt>总架次</dt>
            <dd>{{planInfo.totalVehicles}}</dd>
            <dt>参训飞机</dt>
            <dd>{{planInfo.flyPlane}}</dd>
            <dt>参飞人数</dt>
            <dd>{{planInfo.flyNumber}}</dd>
          </dl>
          <dl class="bottom">
            <dt>备注</dt>
            <dd>{{planInfo.comment}}</dd>
          </dl>
        </div>
        <div class="right">
          <dt class="title">值班车辆</dt>
          <dd class="content">
            <ul>
              <li v-for="item in planInfo.listCar">
                <span>车辆：{{item.carType}}</span>
                <span>车牌号：{{item.carCode}}</span>
                <span>驾驶员：{{item.driverName}}</span>
              </li>
            </ul>
          </dd>
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
        planInfo: ''
      };
    },
    created() {
      this.getPlanListFn();
    },
    methods: {
      ...mapActions(['_getInfo']),
      getPlanListFn() {
        this._getInfo({
          ops: {
            dateType: this.util.formatDate('', 2)
            // dateType: '2019-02-19'
          },
          api: 'getPlanList',
          callback: res => {
            this.planInfo = res.rows[0];
          }
        });
      },
      onCancle() {
        this.$emit('cancle', false);
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
    width: 668px;
    left: 50%;
    margin-left: -334px;
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
      padding: 13px 13px 35px 13px;
      background: #5389c4;
      box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.45);
      .left {
        width: 435px;
        dl.top {
          background: #3a6089;
          padding: 7px 7px 3px 9px;
          dt,
          dd {
            float: left;
            margin-right: 4px;
            margin-bottom: 3px;
            font-size: 16px;
            text-align: center;
          }
          dt {
            font-weight: normal;
            width: 94px;
            height: 44px;
            line-height: 40px;
            border: 2px solid #145d97;
            background: linear-gradient(90deg, #126baf, #2077c2);
          }
          dd {
            width: 107px;
            height: 44px;
            line-height: 40px;
            border: 2px solid #325276;
            background: #fff;
            color: #144368;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: block;
            span {
              display: block;
              height: 22px;
              line-height: 22px;
            }
            span:nth-child(1) {
              border-bottom: 1px solid #144368;
            }
          }
        }
        dl.bottom {
          padding-top: 8px;
          dt {
            font-weight: normal;
            font-size: 18px;
            text-indent: 1em;
            line-height: 28px;
            height: 28px;
          }
          dd {
            background-color: #3a6089 !important;
            border-bottom: 1px solid #85dcff;
            border-left: 1px solid #5f9de0;
            border-right: 1px solid #5f9de0;
            color: #fff;
            height: 93px;
            line-height: 26px;
            font-size: 16px;
            overflow-y: auto;
            padding: 6px 10px;
          }
        }
      }
      div.right {
        width: 200px;
        background: #3a6089;
        border-bottom: 1px solid #85dcff;
        border-left: 1px solid #5f9de0;
        border-right: 1px solid #5f9de0;
        dt.title {
          background: #284360;
          height: 38px;
          line-height: 38px;
          font-size: 18px;
          color: #fff;
          font-weight: normal;
          text-indent: 1em;
          border-bottom: 1px solid #5f9de0;
        }
        dd.content {
          height: 288px;
          overflow-y: auto;
          ul {
            padding: 2px 16px;
            li {
              font-size: 16px;
              border-bottom: 1px solid #144368;
              padding: 4px 0px;
              span {
                line-height: 28px;
                display: block;
              }
            }
            li:last-child {
              border-bottom: none;
            }
          }
        }
      }
    }
  }
</style>

