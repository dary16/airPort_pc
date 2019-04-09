<template>
  <div class="g-userWrap">
    <v-search-title v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData"></v-search-title>
    <div class="g-table">
      <el-table :data="planList" stripe style="width: 100%;">
        <el-table-column align="center" label="标题">
          <template slot-scope="scope">
            <span>测试{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="content" label="路径"></el-table-column>
        <el-table-column align="center" label="图片">
          <template slot-scope="scope">
            <img class="zoomPic" :src="scope.row.content" alt="">
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button v-on:click="editFn(scope.row)" type="text" size="small">查看大图</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination class="g-pagination" :page-size="6" @current-change="changePages" :current-page="currentPage" :total="pageTotal" background layout="prev, pager, next"></el-pagination>
    <v-pic-pop v-if="isShowBox" v-bind:picData="picData" v-on:cancle="cancelPic"></v-pic-pop>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    data() {
      return {
        planList: [],
        currentPage: 1,
        pageSize: 6,
        pageTotal: 1,
        searchData: {
          'btnShow': [
            { 'title': '查询', 'fn': 'checkFn' }
          ],
          'options': [{
            'status': 1,
            'title': '标题',
            'placeholder': '请输入标题',
            'val': 'createTime'
          }],
        },
        form: {},
        filterData: {},
        isShowBox: false,
        picData: {}
      }
    },
    mounted() {

    },
    created() {
      this.getPicList();
    },
    watch: {},
    methods: {
      ...mapActions(['_getInfo']),
      //获取列表
      getPicList() {
        let pagination = {
          "curPage": this.currentPage,
          "pageSize": this.pageSize
        };
        if(JSON.stringify(this.filterData) != '{}') {
          this.ops = { ...this.filterData, ...pagination }
        } else {
          this.ops = pagination;
        }

        this._getInfo({
          ops: this.ops,
          api: 'pictureList',
          callback: res => {
            this.planList = res.rows;
            this.pageTotal = res.records;
          }
        });
      },
      //编辑角色
      editFn(val) {
        this.picData = val;
        this.isShowBox = true;
      },
      //搜索按钮
      btnsFn(info) {
        this[info.fn](info.item);
      },
      //查询按钮
      checkFn(item) {
        this.currentPage = 1;
        item.createTime = this.util.trim(item.createTime);
        this.filterData = item;
        this.getPicList();
      },
      //翻页，改变页数方法
      changePages(val) {
        this.currentPage = val;
        this.getPicList();
      },
      cancelPic() {
        this.isShowBox = false;
      }
    }
  };
</script>

<style scoped lang="less">
  .g-userWrap {
    .zoomPic {
      width: 50px;
    }
    .mask {
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 4;
      background: rgba(0, 0, 0, 0.6);
    }
    .popBox {
      background: #cfd6f3;
      position: fixed;
      width: 900px;
      left: 50%;
      margin-left: -450px;
      top: 30px;
      height: 800px;
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
      }
    }
  }
  .btnsStyle {
    text-align: center;
    padding: 20px 0px;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .eachList {
    .title {
      margin-top: 8px;
      position: relative;
      li {
        width: 22%;
        float: left;
        text-align: center;
        font-weight: bold;
        height: 30px;
        line-height: 30px;
      }
      li:last-child {
        width: 12%;
        text-align: center;
      }
    }
    .list {
      li {
        width: 22%;
        float: left;
        padding: 10px;
      }
      li:last-child {
        text-align: center;
        width: 12%;
        line-height: 40px;
      }
    }
  }
  .allocationShow {
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.3);
    div {
      dt {
        line-height: 30px;
      }
      dd {
        line-height: 30px;
        overflow: hidden;
        span {
          float: left;
          margin-right: 20px;
        }
      }
    }
  }
</style>
