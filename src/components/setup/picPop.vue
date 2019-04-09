<template>
  <div>
    <div class="mask"></div>
    <div class="popContent">
      <div class="popTitle">
        <h3>详情</h3>
        <i class="el-icon-close" v-on:click="onCancle"></i>
      </div>
      <div class="blueContent">
        <img v-if="picData.content" :src="picData.content"/>
        <div v-else>暂无数据</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  export default {
    data() {
      return {
        popReq: {}
      };
    },
    props: ['picData'],
    created() {
    },
    methods: {
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
    width: 750px;
    left: 50%;
    margin-left: -311px;
    top: 10%;
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
      background: linear-gradient(
        180deg,
        rgba(83, 137, 196, 1),
        rgba(83, 137, 196, 1)
      );
      box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.45);
      img {
        width: 750px;
      }
      .subContent {
        margin-top: 15px;
        ul {
          li {
            padding-left: 5px;
            color: #e0e0e0;
            margin-bottom: 8px;
            overflow: hidden;
            span {
              float: left;
              font-size: 18px;
              height: 35px;
              line-height: 35px;
              width: 140px;
              text-align: right;
            }
          }
        }
      }
      .popBtn {
        text-align: center;
        margin-top: 10px;
        margin-bottom: 15px;
        border-top: 2px solid #3f6794;
        a.addBtn {
          display: block;
          text-align: center;
          color: #fff;
          width: 85px;
          height: 34px;
          line-height: 34px;
          border-radius: 10px;
          margin: 0px auto;
          margin-top: 20px;
          background: #2a70a4;
          box-shadow: 2px 3px 2px #619ee2 inset,
            0px 3px 8px rgba(31, 79, 133, 0.8);
        }
      }
    }
  }
</style>
