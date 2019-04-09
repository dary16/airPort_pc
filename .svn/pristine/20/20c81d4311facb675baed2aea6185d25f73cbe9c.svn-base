<template>
  <div class="groupWrap">
    <div class="header">
      <h3>固定对讲组</h3>
      <i class="el-icon-close" v-on:click="closeFn"></i>
    </div>
    <div class="content">
      <div class="treeWrap">
        <el-tree class="filter-tree" node-key="id" :data="treeData" :props="defaultProps" @node-click="chooseNode" ref="tree2" :default-expanded-keys="spreadArr"></el-tree>
      </div>
      <div class="btns clearfix">
        <div class="btnAlone" @click="addGroupFn">新建对讲组</div>
        <div class="btnAlone" @click="delPttGroup">删除组</div>
        <div class="btnAlone" v-if="isShow" type="primary" @click="makeCall">申请话权</div>
        <div class="btnAlone" v-if="!isShow" type="primary" @click="release">释放话权</div>
      </div>
    </div>
    <!-- 新建对讲组 -->
    <v-intercom-oper v-if="isAddGroup" v-on:cancelClick="cancelFn"></v-intercom-oper>
  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations } from 'vuex';
  export default {
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        treeData: [],
        isShow: true,
        id: '',
        spreadArr: [],
        groupNum: '',
        groupTitle: '',
        isAddGroup: false
      };
    },
    created() {
      this.getDeptInfoFn();
    },
    computed: {
      ...mapState(['createGroupData', 'currentGroup'])
    },
    watch: {
      createGroupData() {
        this.getDeptInfoFn();
      }
      //  this.$refs.tree2.setCheckedKeys([this.treeId]);
    },
    methods: {
      ...mapActions(['_getInfo', '_createGroupData']),
      ...mapMutations(['_currentGroup']),
      getDeptInfoFn() {
        this._getInfo({
          method: 'get',
          api: 'deptInfoQuery',
          callback: res => {
            this.treeData = JSON.parse(res.treeData);
            this.spreadArr.push(this.treeData[0].id);
          }
        });
      },
      makeCall() {
        var _this = this;
        //获取当前组
        //this.cmtWsClient.getPttGroupMemberState(this.groupNum,'2000');

        //判断是否选择对讲组
        if(this.groupNum != "") {
          this.cmtWsClient.makePttCall(this.groupNum, 0, 0);
        } else {
          this.message.warning('请选择对讲组后操作');
        }
        //挂断或未接通的回调
        this.callback.onEventDisconnected = function(code) {
          console.log(code, '挂断或者未接通的回调')
          _this.isShow = true;
          _this.cmtWsClient.requestPtt(0);
        }
        //接通时的回调
        this.callback.onEventConnected = function(code) {
          _this.isShow = false;
          console.log(code, '呼叫成功')
        }
      },
      release() {
        //释放话权
        this.cmtWsClient.requestPtt(0);
        this.isShow = true;
      },
      chooseNode(obj, node, data) {
        if(this.isShow) {
          this.groupNum = obj.id;
          this.id = obj.ptt_id;
          this.groupTitle = obj.label;
          this.cmtWsClient.getGroupState(this.id);
          // this.cmtWsClient.getPttGroupMemberState(this.groupNum, this.id)
        }
      },
      delPttGroup() {
        if(this.id) {
          this._getInfo({
            ops: {
              "ids": this.id,
            },
            api: 'deleteIntercom',
            callback: res => {
              this.message.success('删除成功！');
              this.getDeptInfoFn();
              if(this.currentGroup) {
                this._currentGroup(false);
              } else {
                this._currentGroup(true);
              }
            }
          })
        } else {
          this.$message("请先选择对讲组后再操作");
        }
      },
      addGroupFn() {
        this.isAddGroup = true;
      },
      closeFn() {
        this.$emit('close')
      },
      cancelFn() {
        this.isAddGroup = false;
      }
    }
  };
</script>

<style scoped lang="less">
  .groupWrap {
    text-align: center;
    position: fixed;
    width: 312px;
    height: calc(100% - 101px);
    left: 298px;
    top: 100px;
    z-index: 1001;
    background: linear-gradient(
      180deg,
      rgba(83, 137, 196, 0.8),
      rgba(83, 137, 196, 0.8)
    );
    .header {
      font-weight: 400;
      color: rgba(224, 224, 224, 1);
      text-align: left;
      font-size: 20px;
      line-height: 38px;
      cursor: pointer;
      z-index: 1001;
      width: 312px;
      height: 38px;
      background: linear-gradient(90deg, #004175, #0f6cb2);
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
    .content {
      .treeWrap {
        padding: 15px 13px;
        width: calc(100% - 26px);
        height: calc(100% - 145px);
        position: absolute;
        background: rgba(47, 84, 112, 0.6);
        left: 13px;
        top: 54px;
        overflow-y: auto;
        .el-tree {
          color: #fff;
          background: none;
        }
      }

      .btns {
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
        border-top: 2px solid rgba(0, 0, 0, 0.3);
        // border-top: 1px solid red;
        text-align: center;
        padding: 17px 0 25px 0;
        .btnAlone {
          display: inline-block;
          font-size: 18px;
          color: #fff;
          background: linear-gradient(
            rgba(43, 127, 191, 1),
            rgba(46, 137, 205, 0.63)
          );
          box-shadow: 2px 3px 2px #619ee2 inset,
            1px 1px 4px rgba(22, 93, 174, 0.8);
          // margin-right: 15px;
          text-align: center;
          border-radius: 8px;
          margin: 0 4px;
          padding: 3px 6px;
          cursor: pointer;
        }
      }
    }
  }
</style>
<style>
  .el-tree-node:focus > .el-tree-node__content {
    background-color: #c8ccd1 !important;
  }
  .el-tree-node__content:hover {
    background-color: #c8ccd1 !important;
  }
</style>

