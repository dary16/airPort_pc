<template>
  <div>
    <div class="mask">
      <div class="wrap">
        <div class="popHeader">
          <h3>告警统计</h3>
          <i class="el-icon-close" v-on:click="closeFn"></i>
        </div>
        <div class="content">
          <v-search-header v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData"></v-search-header>
          <div class="chartShow" v-if="alarmArr.length">
            <v-pie-chart style="margin:0px auto;" v-bind:pieDataConfig="pieDataConfig" v-bind:pieDataArr="showAlarmList"></v-pie-chart>
          </div>
          <div class="noData" v-else>暂无数据</div>
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
        searchData: {
          'btnShow': [
            { 'title': '查询', 'fn': 'checkFn' }
          ],
          'options': [{
            'status': 6,
            'title': '时间',
            'placeholderS': '请选择开始时间',
            'placeholderE': '请选择结束时间',
            'val1': 'startTime',
            'val2': 'endTime'
          }]
        },
        showAlarmList: [],
        pieDataConfig: {
          styleObject: {
            width: '460px',
            height: '460px'
          },
          id: 'alarmPie',
          title: '告警统计'
        },
        alarmArr: []
      };
    },
    props: [],
    created() {
      this.getDetailFn();
    },
    methods: {
      ...mapActions(['_getInfo']),
      //获取详情
      getDetailFn() {
        this._getInfo({
          ops: this.filterData,
          api: 'alermTypeStatistics',
          callback: res => {
            this.alarmArr = res;
            if(this.alarmArr.length != 0) {
              this.showAlarmList = [];
              res.forEach(item => {
                this.showAlarmList.push({ 'name': item.alermType, 'y': parseFloat(item.count) })
              })
            }
          }
        });
      },
      //关闭
      closeFn() {
        this.$emit('closeClick', false)
      },
      //搜索按钮
      btnsFn(info) {
        this[info.fn](info.item);
      },
      //查询按钮
      checkFn(item) {
        if(new Date(item.startTime).getTime() >= new Date(item.endTime).getTime()) {
          this.$message.error('开始时间不得大于等于结束时间！');
          return false;
        }
        this.filterData = item;
        this.getDetailFn();
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
      width: 720px;
      height: 546px;
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
        }
        .el-icon-close {
          position: absolute;
          top: 10px;
          right: 12px;
        }
      }
      .content {
        width: 100%;
        height: 538px;
        background: linear-gradient(
          180deg,
          rgba(83, 137, 196, 1),
          rgba(83, 137, 196, 1)
        );
        box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.45);
        padding-top: 15px;
        padding-left: 40px;
        .chartShow {
          margin-left: -40px;
        }
        .noData {
          margin-left: -40px;
          text-align: center;
          color: #fff;
          line-height: 360px;
        }
      }
    }
  }
</style>

