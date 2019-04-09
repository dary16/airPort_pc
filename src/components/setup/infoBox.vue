<template>
  <div>
    <div class="mask"></div>
    <div class="popContent">
      <div class="popTitle">
        <h3>{{popData.titleTotal}}</h3>
        <i class="el-icon-close" v-on:click="onCancle"></i>
      </div>
      <div class="blueContent">
        <div class="subContent clearfix">
          <ul>
            <li class="popBox">
              <span>标题：</span>
              <el-input size="mini" v-model="popData.popContent.noticeTitle" readonly></el-input>
            </li>
            <li class="popBox">
              <span>来自：</span>
              <el-input size="mini" v-model="popData.popContent.userName" readonly></el-input>
            </li>
            <li class="popBox">
              <span>日期：</span>
              <el-input size="mini" v-model="popData.popContent.createTime" readonly></el-input>
            </li>
            <li class="popBox">
              <span>送至：</span>
              <el-input size="mini" v-model="popData.popContent.bak1" readonly></el-input>
            </li>
            <li class="popBox">
              <span>详情：</span>
              <el-input type="textarea" size="mini" v-model="popData.popContent.noticeComment" readonly></el-input>
            </li>
            <li class="popBox">
              <span>附件：</span>
              <div class="el-textarea el-input--mini fileDiv">
                <ul>
                  <li v-for="item in filePath">{{item.file_path}} <a :href="item.file_name"><img src="../../assets/download.png"/></a></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div class="popBtn">
          <a class="addBtn" href="javascript:;" v-on:click="onSubmit">确定</a>
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
        loading: false,
        returnDeptsIds: [],
        fileName: '',
        filePath: ''
      };
    },
    props: ['popData'],
    watch: {},
    created() {
      var infoFile = JSON.parse(JSON.stringify(this.popData.popContent));
      if(infoFile.file.length == 0) {
        // this.fileName = '';
        this.filePath = '';
      } else {
        // this.fileName = infoFile.file[0].file_name;
        // this.filePath = infoFile.file[0].file_path;
        this.filePath = infoFile.file;
      }
    },
    methods: {
      ...mapActions(['_getInfo']),
      onSubmit() {
        this.$emit('cancle', false);
      },
      onCancle() {
        this.$emit('cancle', false);
      },
      btnsFn(val) {
        this.$emit('getBtnFn', val);
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
              width: 108px;
              text-align: right;
            }
          }
          .popBox {
            ul {
              li {
                margin-bottom: 4px;
                a {
                  float: right;
                  img {
                    width: 30px;
                  }
                }
              }
            }
          }
          .fileDiv {
            background-color: #3a6089 !important;
            border-bottom: 2px solid #85dcff;
            border-left: 1px solid #5f9de0;
            border-right: 1px solid #5f9de0;
            border-top: 1px solid #dcdfe6;
            border-radius: 0;
            font-size: 16px;
            color: #c0c4cc;
            height: 72px;
            overflow-y: auto;
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
  // // 分割线
  .el-input--mini {
    width: 440px;
    background: rgba(20, 67, 104, 0);
    border-bottom: 1px solid #85dcff;
    border-left: 1px solid #5f9de0;
    border-right: 1px solid #5f9de0;
    font-size: 16px;
  }
  .el-textarea {
    width: 440px;
  }
  .el-input--mini .el-input__inner {
    height: 31px;
    line-height: 31px;
    border-radius: 0;
    background-color: #144368 !important;
    border-bottom: 1px solid #85dcff;
    border-left: 1px solid #5f9de0;
    border-right: 1px solid #5f9de0;
    font-size: 16px;
  }
</style>
<style>
  input[type="file"] {
    display: none !important;
  }
  .blueContent .el-input__inner {
    background-color: #3a6089 !important;
    border-bottom: 1px solid #85dcff;
    border-left: 1px solid #5f9de0;
    border-right: 1px solid #5f9de0;
    border-radius: 0;
    font-size: 16px;
    color: #c0c4cc;
  }
  .blueContent .el-textarea__inner {
    background-color: #3a6089 !important;
    border-bottom: 1px solid #85dcff;
    border-left: 1px solid #5f9de0;
    border-right: 1px solid #5f9de0;
    border-radius: 0;
    font-size: 16px;
    color: #c0c4cc;
  }
</style>
