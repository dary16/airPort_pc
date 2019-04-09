<template>
  <div>
    <div class="mask">
      <div class="wrap" id="duty">
        <div class="popHeader">
          <h3>值班统计</h3>
          <i class="el-icon-close" v-on:click="closeFn"></i>
        </div>
        <div class="content">
          <v-search-header v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData"></v-search-header>
          <ul class="header">
            <li class="headerLi">
              <span>姓名</span>
              <span>保障次数</span>
              <span>昼时长（分钟）</span>
              <span>夜时长（分钟）</span>
            </li>
            <li v-for="item in dutyList">
              <span>{{item.username}}</span>
              <span>{{item.security_number}}</span>
              <span>{{item.day_time}}</span>
              <span>{{item.night_time}}</span>
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
        filterData: {
          "startTime": '',
          "endTime": ''
        },
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
        let pagination = {
          "curPage": this.currentPage,
          "pageSize": this.pageSize
        };
        if(this.filterData) {
          this.ops = { ...this.filterData, ...pagination }
        } else {
          this.ops = pagination;
        }
        this._getInfo({
          ops: this.ops,
          api: 'dutyCount',
          callback: res => {
            this.dutyList = res.rows;
            this.pageTotal = res.records;
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
      //查询按钮
      checkFn(item) {
        this.filterData = item;
        this.getDetailFn();
      },
      //搜索按钮
      btnsFn(info) {
        this[info.fn](info.item);
      },
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
      width: 1300px;
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
        height: 523px;
        background: linear-gradient(
          180deg,
          rgba(83, 137, 196, 1),
          rgba(83, 137, 196, 1)
        );
        box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.45);
        padding-top: 15px;
        padding-left: 40px;
        .header {
          padding: 10px 12px;
          text-align: center;
          overflow: hidden;
          li {
            height: 31px;
            line-height: 31px;
            &.headerLi {
              span {
                background: #085996;
                height: 35px;
                line-height: 35px;
                float: left;
                font-size: 16px;
                color: #e0e0e0;
                width: 24%;
                border: 2px solid rgba(20, 93, 151, 1);
              }
            }
            span {
              height: 35px;
              line-height: 35px;
              float: left;
              font-size: 16px;
              color: #e0e0e0;
              width: 24%;
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
</style>
<style>
  #duty .el-input--suffix .el-input__inner {
    padding-right: 20px !important;
  }
</style>

