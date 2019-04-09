<template>
  <div>
    <div class="mask">
      <div class="wrap">
        <div class="popHeader">
          <h3>{{flightName}}</h3>
          <i class="el-icon-close" v-on:click="closeFn"></i>
        </div>
        <div class="content">
          <ul class="header">
            <li>
              <span>序号</span>
              <span>内容</span>
              <span>完成情况</span>
            </li>
          </ul>
          <ul class="step">
            <li v-for="item in detailList">
              <span>{{flightStep}}-{{item.flightPhaseStep}}</span>
              <span>{{item.flightPhaseInfo}}</span>
              <span v-if="item.flightPhaseName == '完成'">
              <img src="../../assets/ok.png" alt="">
              </span>
              <span v-else>{{item.flightPhaseName}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex';
  export default {
    data() {
      return {
        detailList: [],
        flightStep: '',
        flightName: ''
      };
    },
    props: ['flightCurId'],
    created() {
      this.getDetailFn();
    },
    methods: {
      ...mapActions(['_getInfo']),
      //获取每一步骤详情
      getDetailFn() {
        this._getInfo({
          ops: {
            'id': this.flightCurId
          },
          api: 'getItemPlan',
          callback: res => {
            this.flightStep = res.flightStep;
            this.detailList = res.flightPhaseList;
            this.flightName = res.flightName;
          }
        });
      },
      //关闭
      closeFn() {
        this.$emit('closeClick', false)
      }
    }
  }
</script>

<style scoped lang="less">
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 9998;
    background: rgba(0, 0, 0, 0.5);
    .wrap {
      position: fixed;
      z-index: 9999;
      width: 622px;
      height: 330px;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      background: #fff;
      .popHeader {
        font-weight: 400;
        color: rgba(224, 224, 224, 1);
        text-align: left;
        font-size: 20px;
        line-height: 38px;
        cursor: pointer;
        z-index: 1001;
        width: 622px;
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
        }
        .el-icon-close {
          position: absolute;
          top: 10px;
          right: 12px;
        }
      }
      .content {
        height: 292px;
        width: 622px;
        background: linear-gradient(
          180deg,
          rgba(83, 137, 196, 1),
          rgba(83, 137, 196, 1)
        );
        box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.45);
        .header {
          padding: 10px 12px;
          text-align: center;
          li {
            height: 31px;
            line-height: 31px;
            span {
              display: inline-block;
              font-size: 16px;
              color: #e0e0e0;
              background: linear-gradient(
                0deg,
                rgba(18, 107, 175, 1),
                rgba(32, 119, 194, 1)
              );
              border: 2px solid rgba(20, 93, 151, 1);
            }
            span:nth-child(1) {
              width: 24%;
            }
            span:nth-child(2) {
              width: 50%;
            }
            span:nth-child(3) {
              width: 24%;
            }
          }
        }
        .step {
          z-index: 9999;
          width: 622px;
          height: 225px;
          background: #19587d;
          text-align: center;
          padding: 10px 12px;
          overflow: auto;
          li {
            span {
              display: inline-block;
              height: 31px;
              line-height: 31px;
              font-size: 16px;
            }
            span:nth-child(1) {
              width: 24%;
              color: #144368;
              background: rgba(255, 255, 255, 0.74);
              box-shadow: 1px 2px 0px 1px rgba(0, 0, 0, 0.14);
              border-bottom: 2px solid #325276;
            }
            span:nth-child(2) {
              width: 50%;
              color: #144368;
              background: rgba(255, 255, 255, 0.74);
              box-shadow: 1px 2px 0px 1px rgba(0, 0, 0, 0.14);
              border-bottom: 2px solid #325276;
            }
            span:nth-child(3) {
              width: 24%;
              background: #284360;
              color: #e0e0e0;
              border: 1px solid rgba(0, 0, 0, 0.06);
              box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 0.5),
                0px 1px 3px 0px rgba(0, 0, 0, 0.4);
              border-bottom: 1px solid #527ba5;
            }
          }
        }
      }
    }
    ul.step {
      li {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
      }
    }
    div.more {
      position: fixed;
      z-index: 1999;
      width: 70%;
      height: 560px;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      background: #fff;
      border-radius: 10px;
      padding-top: 20px;
      h3 {
        text-align: right;
        a {
          margin-right: 20px;
        }
      }
      ul {
        height: 420px;
        overflow-y: auto;
        li {
          line-height: 32px;
          margin-left: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
          span {
            float: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span:nth-child(1),
          span:nth-child(2) {
            width: 10%;
          }
          span:nth-child(3) {
            width: 60%;
          }
          span:nth-child(4) {
            width: 20%;
          }
        }
      }
    }
  }
</style>
