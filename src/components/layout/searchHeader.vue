<template>
  <div class="search clearfix">
    <div class="searchWidth left">
      <ul v-for="(item,index) in searchData.options" :key="index">
        <li v-if="item.status == 1">
          <span>{{item.title}}：</span>
          <el-input v-model.trim="req[item.val]" v-bind:placeholder="item.placeholder"></el-input>
        </li>
        <li v-if="item.status == 2">
          <span>{{item.title}}：</span>
          <el-select v-model="req[item.val]" v-bind:placeholder="item.placeholder">
            <!-- <el-option key="" label="全部" value=""></el-option> -->
            <el-option v-for="itemSel in item.list" :key="itemSel.value" :label="itemSel.label" :value="itemSel.value">
            </el-option>
          </el-select>
        </li>
        <li v-if="item.status == 3">
          <span>{{item.title}}：</span>
          <el-date-picker v-model="req[item.val1]" format="yyyy-MM-dd HH:mm:ss" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" v-bind:placeholder="item.placeholderS"></el-date-picker>
          <i>至</i>
          <el-date-picker v-model="req[item.val2]" format="yyyy-MM-dd HH:mm:ss" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" v-bind:placeholder="item.placeholderE"></el-date-picker>
        </li>
        <li v-if="item.status == 4">
          <span>{{item.title}}：</span>
          <el-date-picker v-model="req[item.val1]" format="yyyy-MM-dd HH:mm" type="datetime" value-format="yyyy-MM-dd HH:mm" v-bind:placeholder="item.placeholderS"></el-date-picker>
          <i>至</i>
          <el-date-picker v-model="req[item.val2]" format="yyyy-MM-dd HH:mm" type="datetime" value-format="yyyy-MM-dd HH:mm" v-bind:placeholder="item.placeholderE"></el-date-picker>
        </li>
        <li v-if="item.status == 5">
          <span>{{item.title}}：</span>
          <el-input style="width:190px;" :readonly="true" v-model.trim="req[item.val+'Name']" v-bind:placeholder="item.placeholder"></el-input>
          <el-button-group>
            <el-button style="padding:5px 6px" type="primary" size="mini" v-on:click="getUserFn('people')">人</el-button>
            <el-button style="padding:5px 6px" type="primary" size="mini" v-on:click="getUserFn('car')">车</el-button>
          </el-button-group>
        </li>
        <li v-if="item.status == 6">
          <span>{{item.title}}：</span>
          <el-date-picker v-model="req[item.val1]" format="yyyy-MM-dd" type="date" value-format="yyyy-MM-dd" v-bind:placeholder="item.placeholderS"></el-date-picker>
          <i>至</i>
          <el-date-picker v-model="req[item.val2]" format="yyyy-MM-dd" type="date" value-format="yyyy-MM-dd" v-bind:placeholder="item.placeholderE"></el-date-picker>
        </li>
      </ul>
    </div>
    <div class="exportBtn">
      <a href="javascript:;" v-for="(item,index) in searchData.btnShow" v-on:click="btnFn(item.fn)">{{item.title}}</a>
    </div>
    <!--获取人员-->
    <v-get-user v-if="isUser" v-on:checkedUser="getUserList" v-on:closeUserFn="cancelUserListFn"></v-get-user>
    <!--选择车辆-->
    <div class="getCarmask" v-if="isCar">
      <div class="content">
        <div class="header">
          <h3>选择车辆</h3>
          <i class="el-icon-close" v-on:click="cancleFn()"></i>
        </div>
        <el-form ref="form" :model="form" label-width="90px">
          <el-form-item label="车">
            <el-select v-model="form.carCode" placeholder="请选择车">
              <el-option v-for="item in getCarList" :label="item.str" :value="item.car_code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left:60px;">
            <el-button type="primary" @click="saveFn()">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapState } from 'vuex';
  export default {
    data() {
      return {
        req: {},
        isUser: false,
        isCar: false,
        form: {
          carCode: ''
        },
        getCarList: []
      };
    },
    computed: {},
    watch: {
    },
    props: ['searchData'],
    created() {
      // this.optionsShow = JSON.parse(JSON.stringify(this.searchData));
      //设置默认值
      // if(this.searchData.defaultReq) {
      //     this.req = this.searchData.defaultReq;
      // }
      // if(this.searchData){
      //   this.req = this.searchData;
      // }
    },
    methods: {
      ...mapActions(['_getInfo']),
      btnFn(val) {
        var sendInfo = { 'fn': val, 'item': this.req }
        this.$emit('receiveBtnFn', sendInfo);
      },
      //选择车或人
      getUserFn(val) {
        if(val == 'people') {
          this.isUser = true;
        } else {
          this.isCar = true;
          this.getCarPopFn();
        }
      },
      //获取用户列表
      getUserList(list) {
        this.isUser = false;
        if(list.length != 1) {
          this.message.warning('请选择一个人员！')
        }
        this.req.type = "ugps";
        this.req.sip = list[0].id;
        this.req.sipName = list[0].label;
      },
      //关闭获取用户列表
      cancelUserListFn() {
        this.isUser = false;
      },
      cancleFn() {
        this.isCar = false;
      },
      saveFn() {
        this.isCar = false;
        this.req.type = "car";
        this.req.sip = this.form.carCode;
        this.getCarList.forEach(item => {
          if(item.car_code == this.form.carCode) {
            this.req.sipName = item.car_type + '(' + this.form.carCode + ')';
          }
        })
      },
      //获取车
      getCarPopFn() {
        this._getInfo({
          ops: {},
          api: 'listTypeAll',
          callback: res => {
            this.getCarList = res;
            this.getCarList.forEach(item => {
              item.str = item.car_type + '（' + item.car_code + '）'
            })
          }
        });
      }
    }
  };
</script>
<style lang="less" scoped>
  .listTrajectory .search {
    // width: 100%;
    padding: 20px 15px;
    margin: 20px;
  }
  .el-input {
    width: 152px;
    background: none;
    font-size: 14px !important;
    margin-top: 7px;
    height: 33px !important;
    line-height: 33px !important;
    vertical-align: top;
  }
  .el-select {
    width: 152px;
    background: none;
    font-size: 14px !important;
    margin-top: 4px;
    height: 33px !important;
    line-height: 33px !important;
  }
  .getCarmask {
    .el-select {
      width: 210px;
    }
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 214px;
    vertical-align: top;
    font-size: 14px !important;
    margin-top: 7px;
    height: 33px !important;
    line-height: 33px !important;
  }
  .searchWidth {
    // border: 1px solid #2f4554;
    overflow: hidden;
    max-width: 90%;
    position: relative;
    background: rgba(20, 67, 104, 1);
    font-size: 16px;
    box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 0.5);
    height: 50px;
    line-height: 50px;
    padding-right: 30px;
    ul {
      float: left;
      //   width: 20%;
      padding-left: 20px;
      li {
        overflow: hidden;
        color: #606266;
        span {
          float: left;
          height: 50px;
          line-height: 50px;
          color: #e0e0e0;
          font-size: 18px;
        }
        i {
          font-size: 20px;
          height: 50px;
          line-height: 50px;
          font-style: normal;
          color: #e0e0e0;
          font-size: 18px;
        }
      }
    }
    ul:last-child {
      //   width: 40%;
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
      float: left;
      margin-left: 15px;
      margin-top: 5px;
    }
  }
  .getCarmask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    z-index: 9998;
    background: rgba(0, 0, 0, 0.3);
    .content {
      position: fixed;
      width: 20%;
      background: #fff;
      left: 44%;
      top: 150px;
      z-index: 9999;
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
        background: #cfd6f3;
      }
      dt {
        height: 36px;
        line-height: 36px;
        text-align: center;
      }
      dd {
        margin-left: 20px;
        margin-top: 10px;
      }
    }
  }
</style>
<style lang="less">
  .el-input__inner {
    height: 33px !important;
    line-height: 33px !important;
    font-size: 18px;
  }
  .getCarmask {
    .el-form-item__label {
      font-size: 20px !important;
      font-weight: normal;
      line-height: 42px;
    }
  }
</style>

