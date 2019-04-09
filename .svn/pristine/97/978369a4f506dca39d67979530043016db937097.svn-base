<template>
  <div class="net">
    <header class="exportBtn">
      <h2>{{netLeftData.name}}</h2>
      <a href="javascript:;" @click="infoNetList(netLeftData);">详情</a>
    </header>
    <section class="clearfix">
      <el-form label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态:">
              <span>{{netLeftData.currentState}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时间:">
              <span>{{netLeftData.currentTime}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="质量状况:">
              <span>{{netLeftData.status}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="型号:">
              <span>{{netLeftData.status}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="位置:">
              <span>{{netLeftData.lon}},{{netLeftData.lng}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <v-net-info-box
      v-if="netInfoBox"
      v-bind:netInfoData="netInfoData"
      v-on:cancle="hideInfoBox"
    ></v-net-info-box>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        netInfoBox: false,
        netInfoData: {}
      }
    },
    props: ['netLeftData'],
    methods: {
      infoNetList(val) {
        this.netInfoBox = true;
        this.netInfoData = val;
      },
      hideInfoBox() {
        this.netInfoBox = false;
      }
    }
  }
</script>

<style lang="less" scoped>
  .net {
    color: #e0e0e0;
    background: #144368;
    width: 625px;
    header {
      text-align: center;
      position: relative;
      height: 40px;
      h2{
        height: 40px;
        line-height: 40px;
      }
      .info {
        position: absolute;
        right: 20px;
        top: 0px;
      }
    }
  }
  .exportBtn {
      height: 36px;
      a {
          display: block;
          width: 70px;
          height: 35px;
          padding: 0 10px;
          line-height: 35px;
          text-align: center;
          // background: #54596e;
          background: url(../../assets/btn_common.png) no-repeat;
          background-size: 100% 100%;
          font-size: 18px;
          color: #ffffff;
          text-decoration: none;
          position: absolute;
          right: 20px;
          top: 5px;
      }
  }
</style>
<style>
  .net .el-form-item {
    margin-bottom: 0 !important;
    font-size:18px !important;
  }
  .net .el-form-item__label{
    color:#e0e0e0 !important;
    font-size:18px !important;
    font-weight: normal !important;
  }
  .net .el-form-item__content{
    font-size:18px !important;
  }
</style>



