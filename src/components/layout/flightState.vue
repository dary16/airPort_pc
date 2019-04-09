<template>
  <div>
    <div class="mask">
      <div class="wrap" id="duty">
        <div class="popHeader">
          <h3>飞行情况统计</h3>
          <i class="el-icon-close" v-on:click="closeFn"></i>
        </div>
        <div class="content">
          <ul class="header">
            <li>
              <span>日期</span>
              <span>架次</span>
              <span>科目</span>
              <span>参训飞机</span>
              <span>空中时间</span>
              <span>任务</span>
              <span>航线</span>
              <span>驻训日期</span>
              <span>耗油量</span>
              <span>累计时间</span>
              <span>累计架次</span>
              <span>累计场次</span>
              <span>累计耗油量</span>
              <span>场次</span>
              <span>操作</span>
            </li>
            <li v-for="item in dutyList">
              <div v-if="item.optState == 'off'">
                <span>{{item.flight_date}}</span>
                <span>{{item.flights}}</span>
                <span>{{item.subjects}}</span>
                <span>{{item.participation_plane}}</span>
                <span>{{item.air_time}}</span>
                <span>{{item.task}}</span>
                <span>{{item.routes}}</span>
                <span>{{item.train_date}}</span>
                <span>{{item.oil_num}}</span>
                <span>{{item.total_air_time}}</span>
                <span>{{item.total_flights}}</span>
                <span>{{item.total_matches}}</span>
                <span>{{item.total_oil_num}}</span>
                <span>{{item.matches}}</span>
                <span></span>
              </div>
              <div v-else-if="item.showBtn == 'false' && item.optState == 'on'">
                <span>{{item.flight_date}}</span>
                <span>
                  <el-input v-model="item.flights">{{item.flight}}</el-input>
                </span>
                <span>
                  <el-input v-model="item.subjects">{{item.subject}}</el-input>
                </span>
                <span>{{item.participation_plane}}</span>
                <span>{{item.air_time}}</span>
                <span>
                  <el-input v-model="item.task">{{item.task}}</el-input>
                </span>
                <span>
                   <el-select v-model="item.routes" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </span>
                <span>
                  <el-date-picker
                    v-model="item.train_date"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="日期">
                  </el-date-picker>
                </span>
                <span>{{item.oil_num}}</span>
                <span>{{item.total_air_time}}</span>
                <span>{{item.total_flights}}</span>
                <span>{{item.total_matches}}</span>
                <span>{{item.total_oil_num}}</span>
                <span>{{item.matches}}</span>
                <span class="exportBtn">
                  <a @click="saveFn()" v-if="item.showBtn == 'false'" href="javascript:void(0)">保存</a>
                </span>
              </div>
              <div v-else="item.optState == 'on'">
                <span>{{item.flight_date}}</span>
                <span>{{item.flights}}</span>
                <span>{{item.subjects}}</span>
                <span>{{item.participation_plane}}</span>
                <span>{{item.air_time}}</span>
                <span>{{item.task}}</span>
                <span>{{item.routes}}</span>
                <span>{{item.train_date}}</span>
                <span>{{item.oil_num}}</span>
                <span>{{item.total_air_time}}</span>
                <span>{{item.total_flights}}</span>
                <span>{{item.total_matches}}</span>
                <span>{{item.total_oil_num}}</span>
                <span>{{item.matches}}</span>
                <span></span>
              </div>
            </li>
          </ul>
          <el-pagination class="g-pagination" @current-change="changePages" :current-page="currentPage" :total="pageTotal" background layout="prev, pager, next"></el-pagination>
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
        dutyList: [],
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0,
        indexNow: -1,
        options: [{
          value: '去向',
          label: '去向'
        }, {
          value: '来向',
          label: '来向'
        }],
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
          ops: {},
          api: 'flightStateCount',
          callback: res => {
            this.dutyList = res.rows;
            this.pageTotal = res.records;
            for(var i = 0; i <= this.dutyList.length; i++) {
              if(this.dutyList[i].optState == 'off') {
                break;
              } else if(this.dutyList[i].optState == 'on') {
                this.dutyList[i].showBtn = 'false';
                this.indexNow = i;
                break;
              }
            }
          }
        });
      },
      //翻页，改变页数方法
      changePages(val) {
        this.currentPage = val;
        this.getDetailFn();
      },
      //关闭
      closeFn() {
        this.$emit('closeClick', false)
      },
      saveFn() {
        this._getInfo({
          ops: this.dutyList[this.indexNow],
          api: 'flightStateSave',
          callback: res => {
            this.getDetailFn();
          }
        });
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
      width: 1500px;
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
        .header {
          padding: 10px 12px;
          text-align: center;
          overflow: hidden;
          li {
            height: 35px;
            line-height: 35px;
            span {
              height: 35px;
              line-height: 28px;
              float: left;
              font-size: 16px;
              color: #e0e0e0;
              width: 6.6%;
              background: linear-gradient(
                0deg,
                rgba(18, 107, 175, 1),
                rgba(32, 119, 194, 1)
              );
              border: 2px solid rgba(20, 93, 151, 1);
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
  .exportBtn {
    height: 36px;
    a {
      display: block;
      width: 70px;
      height: 32px;
      padding: 0 10px;
      line-height: 32px;
      text-align: center;
      // background: #54596e;
      background: url(../../assets/btn_common.png) no-repeat;
      background-size: 100% 100%;
      font-size: 16px;
      color: #ffffff;
      text-decoration: none;
      margin: 0 auto;
    }
  }
</style>
