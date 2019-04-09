<template>
  <div>
    <div class="mask"></div>
    <div class="popContent">
      <div class="popTitle">
        <h3>新建告警</h3>
        <i class="el-icon-close" v-on:click="onCancle"></i>
      </div>
      <div class="blueContent">
        <div class="left">
          <span>选择接收人员</span>
          <div id="noticeTree">
            <el-tree :data="treeData" node-key="id" show-checkbox @check="checkedFn" @node-click="handleNodeClick" :props="defaultProps" :default-expanded-keys="spreadArr"></el-tree>
          </div>
          <div class="noticeRadio">
            <el-radio-group v-model="notice.noticeType">
              <el-radio label="通知">通知</el-radio>
              <el-radio label="公告">公告</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="subContent clearfix">
          <div class="right">
            <div class="title">
              <label>通知标题：</label>
              <el-input v-model="notice.noticeTitle" placeholder="请输入标题"></el-input>
            </div>
            <div>
              <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="notice.noticeComment">
              </el-input>
            </div>
            <div class="upload">
              <el-upload class="upload-demo" :action="uploadUrl" :on-success="successFileFn" :before-upload="beforeFileUpload" :show-file-list="true" mulitple :limit="10">
                <button class="chooseBtn">点击上传</button>
              </el-upload>
            </div>
            <div class="popBtn">
              <a class="addBtn" href="javascript:;" v-on:click="onSubmit">确定</a>
            </div>
          </div>
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
        popReq: {},
        loading: false,
        optionsShow: [],
        treeData: [],
        checkedItemArr: [],
        spreadArr: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        uploadUrl: 'http://192.168.0.108:8080/airPortService/inter/upload',
        returnDeptsIds: [],
        notice: {
          deptsId: '',
          noticeTitle: '',
          noticeComment: '',
          noticeType: '公告',
          noticeFile: ''
        },
        urlArr: []
      };
    },
    props: [],
    created() {
      this.getSysOrgFn();
      this.getDepartmentFn();
    },
    methods: {
      ...mapActions(['_getInfo']),
      onSubmit() {
        // this.$emit('save', this.notice);
        var str = '';
        this.checkedItemArr.forEach((item, index) => {
          if(index != this.checkedItemArr.length - 1) {
            str += item.id + ','
          } else {
            str += item.id
          }
        });
        this.notice.deptsId = str;
        if(!this.notice.noticeComment) {
          this.message.error('请输入通知内容！');
          return false;
        }
        if(!this.notice.noticeType) {
          this.message.error('请选择通知类型！');
          return false;
        }
        if(!this.notice.noticeTitle) {
          this.message.error('请输入通知标题！');
          return false;
        }
        if(!this.notice.deptsId) {
          this.message.error('请选择接受通知部门！');
          return false;
        }
        // this.isShowBox = false;
        this._getInfo({
          ops: this.notice,
          api: 'publishNotice',
          callback: res => {
            this.message.success('新增成功！');
            this.$emit('cancle', false)
          }
        });
      },
      onCancle() {
        this.$emit('cancle', false);
      },
      btnsFn(val) {
        this.$emit('getBtnFn', val);
      },
      radio(data) {
        console.log(data);
      },
      getDepartmentFn() {
        this._getInfo({
          method: 'get',
          api: 'getDepartment',
          callback: res => {
            this.treeData = JSON.parse(res.treeData);
            this.spreadArr.push(this.treeData[0].id);
          }
        });
      },
      checkedFn(data, node) {
        //传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象，
        //包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
        this.checkedItemArr = node.checkedNodes;
        this.getcheckedLine = data;
      },
      //点击节点返回数据
      handleNodeClick(data) {
        this.getcheckedLine = data;
      },
      //获取组织树
      getSysOrgFn() {
        this._getInfo({
          method: 'get',
          api: 'getSysOrg',
          callback: res => {
            this.treeData = JSON.parse(res.treeData);
          }
        });
      },
      handleNodeClick(data) {
        console.log(data.id);
        // this.popReq.orgName = data.label;
        // this.popReq.orgCode = data.code;
        // this.popReq.orgId = data.id;
      },
      //-------------上传-------------//
      //文件
      successFileFn(file) {
        // 通知文件
        // this.notice.noticeFile = file.body.url;
        this.urlArr.push(file.body.url);
        this.notice.noticeFile = this.urlArr.join(',');
        console.log(this.notice.noticeFile);
      },
      beforeFileUpload() {

      },
      tagCloseFn(index) {
        this.returnDeptsIds.splice(index, 1);
        this.$emit('returnDeptsIds', this.returnDeptsIds)
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
      color: #e0e0e0;
      .left {
        border-right: 2px solid #3f6794;
        width: 180px;
        span {
          height: 50px;
          line-height: 50px;
          display: block;
          text-align: center;
          font-size: 18px;
          border-bottom: 2px solid #3f6794;
        }
        #noticeTree {
          height: 234px;
          overflow: auto;
          border-bottom: 2px solid #3f6794;
        }
        .noticeRadio {
          height: 46px;
          line-height: 46px;
          text-align: center;
        }
      }
      .right {
        float: left;
        .title {
          height: 50px;
          line-height: 50px;
          border-bottom: 2px solid #3f6794;
        }
        label {
          width: 96px;
          font-size: 18px;
          text-align: center;
          font-weight: normal;
        }
      }
      .subContent {
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
              width: 140px;
              text-align: right;
            }
          }
        }
      }
      .popBtn {
        text-align: right;
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
          background: #2a70a4;
          box-shadow: 2px 3px 2px #619ee2 inset,
            0px 3px 8px rgba(31, 79, 133, 0.8);
          margin-top: 6px;
          margin-right: 24px;
          float: right;
        }
      }
    }
  }
  .chooseBtn {
    background-color: #0c5e9e;
    padding: 7px 15px;
    border: 1px solid rgba(79, 110, 179, 1);
    border-radius: 6px 6px 6px 6px;
    color: #c0c4cc;
    margin: 5px;
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
  .el-select--mini {
    width: 440px;
    background: rgba(20, 67, 104, 0);
    border-bottom: 1px solid #85dcff;
    border-left: 1px solid #5f9de0;
    border-right: 1px solid #5f9de0;
    font-size: 16px;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 440px;
    vertical-align: top;
    border-radius: 5px;
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
  .el-tag {
    width: auto !important;
    background: rgba(0, 32, 57, 0.1);
    border: 1px solid rgba(79, 110, 179, 0.1);
    color: #fff;
    margin-right: 8px;
    height: 32px !important;
    line-height: 30px !important;
    font-size: 16px !important;
  }
</style>
<style>
  #noticeTree .el-tree {
    background: #5389c4 !important;
    color: #e0e0e0;
  }
  .el-tag .el-icon-close {
    color: #fff !important;
  }
  .noticeRadio .el-radio__label {
    color: #e0e0e0 !important;
  }
  .noticeRadio .el-radio__input.is-checked .el-radio__inner {
    background: url("../../assets/greenRadio.png") no-repeat;
    width: 16px;
    height: 16px;
    background-size: 100% 100%;
  }
  .right .el-input {
    width: 326px !important;
  }
  .right .el-upload-list {
    height: 80px;
    overflow-y: auto;
  }
  .right .el-upload-list__item-name {
    color: #e0e0e0;
  }
  .right .el-input__inner {
    margin-top: -8px;
  }
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
