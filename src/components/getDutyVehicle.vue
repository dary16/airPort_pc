<template>
  <div class="mask">
    <div class="content">
      <div class="header">
        <h3>选择车辆</h3>
        <i class="el-icon-close" v-on:click="cancleFn()"></i>
      </div>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="车">
          <el-select v-model="form.car" placeholder="请选择车">
            <el-option v-for="item in getCarList" :label="item.carType" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人">
          <el-select v-model="form.person" placeholder="请选择人">
            <el-option v-for="item in getPersonList" :label="item.userName" :value="item.userSip"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-left:60px;">
          <el-button type="primary" @click="saveFn()">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations } from 'vuex';
  export default {
    data() {
      return {
        form: {},
        getCarList: [],
        getPersonList: []
      };
    },
    computed: {
      ...mapState(['userList'])
    },
    created() {
      this.getCarFn();
      this.getPeopleFn()
    },
    methods: {
      ...mapActions(['_getInfo']),
      //获取车
      getCarFn() {
        this._getInfo({
          ops: {},
          api: 'getListCar',
          callback: res => {
            this.getCarList = res;
          }
        });
      },
      //获取人
      getPeopleFn() {
        this._getInfo({
          ops: {},
          api: 'getListPerson',
          callback: res => {
            this.getPersonList = res;
          }
        });
      },
      saveFn() {
        var obj = {};
        this.getCarList.forEach(item => {
          if(item.id == this.form.car) {
            obj.carType = item.carType;
            obj.carId = item.id;
            obj.carCode = item.carCode;
          }
        })
        this.getPersonList.forEach(item => {
          if(item.userSip == this.form.person) {
            obj.driverId = item.userSip;
            obj.driverName = item.userName;
          }
        })
        this.$emit('checkedCar', obj)
      },
      cancleFn() {
        this.$emit('closeCarFn')
      }
    }
  };
</script>

<style scoped lang="less">
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    z-index: 1998;
    background: rgba(0, 0, 0, 0.3);
    .content {
      position: fixed;
      width: 20%;
      background: #fff;
      left: 44%;
      top: 150px;
      z-index: 1999;
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
