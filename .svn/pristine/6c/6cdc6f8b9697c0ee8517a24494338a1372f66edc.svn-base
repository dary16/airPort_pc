<template>
  <div>
    <div class="mask"></div>
    <div class="popContent netPop">
      <div class="popTitle">
        <h3>{{netInfoData.name}}</h3>
        <i class="el-icon-close" v-on:click="onCancle"></i>
      </div>
      <div class="blueContent">
        <div class="subContent clearfix">
          <el-row>
            <el-col :span="12">
              <span>厂家：</span><em>{{netInfoData.name}}</em>
            </el-col>
            <el-col :span="12">
              <span>型号：</span><em>{{netInfoData.status}}</em>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span>宽度：</span><em>{{netInfoData.width}}</em>
            </el-col>
            <el-col :span="12">
              <span>高度：</span><em>{{netInfoData.highly}}</em>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span>出厂日期：</span><em>{{netInfoData.manufactureDate}}</em>
            </el-col>
            <el-col :span="12">
              <span>使用日期：</span><em>{{netInfoData.useDate}}</em>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span>位置：</span><em>{{netInfoData.lon}},{{netInfoData.lng}}</em>
            </el-col>
          </el-row>
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
        popReq: {}
      };
    },
    props: ['netInfoData'],
    watch: {
    },
    created() {
    },
    methods: {
      ...mapActions(['_getInfo']),
      onCancle() {
        this.$emit('cancle', false);
      },
      createFn() {

      }
    }
  };
</script>
<style lang="less" scoped>
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1998;
  }
  .popContent {
    position: fixed;
    background: #fff;
    width: 622px;
    left: 50%;
    margin-left: -311px;
    top: 20%;
    z-index: 1999;
    overflow: hidden;
    .popTitle {
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
      padding: 5px 0;
      background: linear-gradient(
        180deg,
        rgba(83, 137, 196, 1),
        rgba(83, 137, 196, 1)
      );
      box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.45);
      padding: 5px 20px;
      .subContent {
        margin: 15px 20px;
        font-size: 18px;
        span {
          display: inline-block;
          width: 100px;
          text-align: right;
        }
        em {
          font-style: normal;
        }
      }
    }
  }
</style>
<style>
  .netPop .el-row {
    height: 40px;
    line-height: 40px;
  }
  input[type="file"] {
    display: none !important;
  }
</style>
