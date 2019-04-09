<template>
  <div class="search clearfix">
    <div class="searchWidth left">
      <ul v-for="(item,index) in searchData.options" :key="index">
        <li v-if="item.status == 1">
          <span>{{item.title}}：</span>
          <el-input v-model.trim="req[item.val]" size="mini" v-bind:placeholder="item.placeholder"></el-input>
        </li>
        <li v-if="item.status == 2">
          <span>{{item.title}}：</span>
          <el-select v-model="req[item.val]" v-bind:placeholder="item.placeholder" size="mini">
            <el-option key="" label="全部" value=""></el-option>
            <el-option v-for="itemSel in item.list" :key="itemSel.value" :label="itemSel.label" :value="itemSel.value">
            </el-option>
          </el-select>
        </li>
        <li v-if="item.status == 3">
          <span>{{item.title}}：</span>
          <el-date-picker v-model="req[item.val1]" format="yyyy-MM-dd" type="datetime" value-format="yyyy-MM-dd" v-bind:placeholder="item.placeholderS" size="mini"></el-date-picker>
          <i>至</i>
          <el-date-picker v-model="req[item.val2]" format="yyyy-MM-dd" type="datetime" value-format="yyyy-MM-dd" v-bind:placeholder="item.placeholderE" size="mini"></el-date-picker>
        </li>
      </ul>
    </div>
    <div class="exportBtn">
      <a href="javascript:;" v-for="(item,index) in searchData.btnShow" v-on:click="btnFn(item.fn)">{{item.title}}</a>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapState } from 'vuex';
  export default {
    data() {
      return {
        req: {}
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
      btnFn(val) {
        var sendInfo = { 'fn': val, 'item': this.req }
        this.$emit('receiveBtnFn', sendInfo);
      },

    }
  };
</script>
<style lang="less" scoped>
  .search {
    margin: 20px;
    margin-top: 0px;
  }
  .el-input--mini {
    width: 140px;
    background: none;
    font-size: 14px !important;
    margin-top: 7px;
  }
  .el-select--mini {
    width: 140px;
    background: none;
    font-size: 14px !important;
    margin-top: 7px;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 200px;
    vertical-align: top;
    font-size: 14px !important;
    margin-top: 7px;
    border: 1px solid red !important;
  }
  .searchWidth {
    border: 1px solid #2f4554;
    overflow: hidden;
    padding-left: 33px;
    padding-right: 20px;
    border-radius: 10px;
    position: relative;
    background: #2f4554;
    ul {
      float: left;
      margin-right: 10px;
      li {
        overflow: hidden;
        color: #fff;
        span {
          float: left;
          font-size: 20px;
          height: 46px;
          line-height: 46px;
        }
        i {
          font-size: 20px;
          height: 46px;
          line-height: 46px;
          font-style: normal;
        }
      }
    }
  }
  .exportBtn {
    overflow: hidden;
    height: 46px;
    a {
      display: block;
      min-width: 58px;
      padding: 0 10px;
      line-height: 36px;
      text-align: center;
      background: #54596e;
      font-size: 18px;
      color: #ffffff;
      border-radius: 6px;
      box-shadow: 1px 3px 1px rgba(0, 0, 0, 0.3);
      text-decoration: none;
      float: left;
      margin-left: 15px;
      margin-top: 5px;
    }
  }
</style>
