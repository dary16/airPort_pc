<template>
  <div class="group">
    <el-dialog title="建组对讲" :visible.sync="groupVisible" width="660px" class="makegroup-dialog" @close="cancleFn()" :modal-append-to-body='false'>
      <div class="group-transfer-wrap">
        <div class="blueContent">
          <div class="el-row">
            <el-col :span="10" style="margin-top:7px;">
              <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick" class="tab-border">
                <el-tab-pane label="通讯录" name="first">
                  <el-tree class="filter-tree" :data="treeData1" node-key="id" show-checkbox @check="checkStatus" :props="defaultProps" ref="tree1" :default-expanded-keys="treeId"></el-tree>
                </el-tab-pane>
                <el-tab-pane label="对讲组" name="second">
                  <el-tree class="filter-tree" :data="treeData2" node-key="id" show-checkbox @check="checkStatus" :props="defaultProps" ref="tree2" :default-expanded-keys="orgId"></el-tree>
                </el-tab-pane>
              </el-tabs>
            </el-col>
            <el-col :span="4" class="c-arow">
              <img src="../../assets/left.png" @click="addAlternativeUser()" style="margin-bottom:86px;" />

              <img src="../../assets/right.png" @click="removeAlternativeUser()" />
                        </el-col>
              <el-col :span="10">
                <el-form :inline="true">
                  <el-form-item label="组名">
                    <el-input v-model="group.name"></el-input>
                  </el-form-item>
                </el-form>
                <div class="c-transfer">
                  <ul class="itemList">
                    <li v-for="(item, index) in treeLists" @click="removeIndex(item,index)" :class="{chooseActive:index==active}">{{item.label}}</li>
                  </ul>
                </div>
                <el-form :inline="true">
                  <el-form-item label="">
                    <el-radio-group v-model="group.yesOrno">
                      <el-radio label="y">录音</el-radio>
                      <el-radio label="n">不录音</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </el-col>
          </div>

        </div>
      </div>
      <span slot="footer" class="dialog-footer">
          <div class="btnAlone" @click="createdGroup">确 定</div>
          <div class="btnAlone" @click="cancleFn()">取 消</div>
        </span>
    </el-dialog>
  </div>

</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex';
  export default {
    data() {
      return {
        groupVisible: true,
        activeName2: 'first',
        form: {
          name: ''
        },
        treeData1: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        treeData2: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        treeId: [],//通讯录的根id
        orgId: [],//对讲组的根id
        deptOrGroup: '通讯录',
        treeLists: [],
        num: -1,
        listData: [],
        group: {
          name: '',
          listData: '',
          yesOrno: 'n'
        },
        active: -1,
        treeSip: []
      }
    },
    props: [''],
    mounted() {
    },
    created() {
      this.getMailListFn();
      this.getDeptInfoFn();
      this.deptOrGroup == '通讯录';
    },
    computed: {
      ...mapState(['createGroupData', 'currentGroup', 'currentSip'])
    },
    watch: {
      treeLists() {
        if(this.treeLists) {
          if(this.deptOrGroup == '通讯录') {
            var tree1 = [];
            this.treeLists.forEach(item => {
              tree1.push(item.id);
              this.$refs.tree1.setCheckedKeys(tree1);
            })
          } else {
            var tree2 = [];
            this.treeLists.forEach(item => {
              tree2.push(item.id);
              this.$refs.tree2.setCheckedKeys(tree2);
            })
          }
        }
      },
      currentGroup() {
        this.getMailListFn();
        this.getDeptInfoFn();
        this._currentGroup(false);
      }
    },
    methods: {
      ...mapActions(['_getInfo']),
      ...mapMutations(['_createGroupData', '_currentGroup', '_setCheckedArr']),
      //切换tab
      handleClick(tab, event) {
        this.deptOrGroup = tab.label;
        this.treeLists = [];
        this.listData = [];
        this.treeSip = [];
        this.getDeptInfoFn();
      },
      //checkbox状态改变时触发
      checkStatus(data, node) {
        //console.log(data,node);
        this.checkedArr = [];
        node.checkedNodes.forEach(item => {
          if(item.sip && item.sip != 'null' && item.sip != null && item.label != 'null' && item.label != null && item.id !== this.orgId) {

            this.checkedArr.push({ sip: item.sip, label: item.label, id: item.id });
          }
        })
        this.listData = this.checkedArr;
      },
      //通讯录列表
      getMailListFn() {
        this.treeId = [];
        this._getInfo({
          method: 'get',
          api: 'getMailList',
          callback: res => {
            this.treeData1 = JSON.parse(res.treeData);
            this.treeId.push(this.treeData1[0].id);//根id
          }
        });
      },
      //对讲组列表
      getDeptInfoFn() {
        this._getInfo({
          method: 'get',
          api: 'deptInfoQuery',
          callback: res => {
            this.treeData2 = JSON.parse(res.treeData);
            this.orgId.push(this.treeData2[0].id);//根id
          }
        });
      },
      groupClose() {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.groupVisible = false;
          })
          .catch(_ => { });
      },
      //将备选 区已选 中人员增加到右侧例表中
      addAlternativeUser() {
        for(var i = 0; i < this.listData.length; i++) {
          for(var j = i + 1; j < this.listData.length; j++) {
            if(this.listData[i].id.substr(0, 32) === this.listData[j].id.substr(0, 32)) {
              j = ++i;
            }
          }
          this.treeLists.forEach(item => {
            if(!this.treeSip.includes(item.sip)) {
              this.treeSip.push(item.sip);
            }
          });
          //过滤
          if(!this.treeSip.includes(this.listData[i].sip)) {
            this.treeLists.push(this.listData[i]);
          }
        }
        //this.treeLists = this.listData;
      },
      //将右侧例表中 中人员移出
      removeAlternativeUser() {
        this.listData.splice(this.num, 1);
        this.treeLists.splice(this.num, 1);
        if(this.listData.length == 0) {
          this.$refs.tree1.setCheckedKeys([]);
          this.$refs.tree2.setCheckedKeys([]);
        }
      },
      //点击右侧列表事件
      removeIndex(data, index) {
        this.num = index;
        this.active = index;
      },
      //创建组 && this.treeLists.includes(this.currentSip)
      createdGroup() {
        let labelArr = [this.currentSip.userSip];
        this.treeLists.forEach(item => {
          if(item.sip !== this.currentSip.userSip) {
            labelArr.push(item.sip);
          }
        });
        if(this.group.name != '' && this.treeLists.length > 0) {

          let ops = { 'ptt_member': labelArr.join(","), 'ptt_name': this.group.name, 'ptt_recording': this.group.yesOrno };
          this._getInfo({
            ops: ops,
            api: 'addIntercom',
            callback: res => {
              this.message.success('新增成功！');
              if(this.createGroupData) {
                this._createGroupData(false);
              } else {
                this._createGroupData(true);
              }

              this.treeLists = [];
              this.group.name = '';
            }
          });
          this.groupVisible = false;
        } else if(this.group.name == '') {
          this.message.error('请确认组名不为空！');
        } else if(this.treeLists.length == 0) {
          this.message.error('请先选定号码，再建立对讲组！');
        }
      },
      cancleFn() {
        this.groupVisible = false;
        this.$emit('cancelClick', false);
      },
    }
  };
</script>

<style scoped lang="less">
  .group {
    .makegroup-dialog {
      .group-transfer-wrap {
        .blueContent {
          .itemList {
            padding: 5px;
            li {
              color: #e0e0e0;
            }
          }
        }
        .c-transfer {
          background: #3a6089;
          height: 360px;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
            0 0 6px 0 rgba(0, 0, 0, 0.04);
          overflow-y: auto;
          ul {
            text-align: left;
          }
          li.chooseActive {
            background: #dddddd !important;
          }
          ul li:hover {
            background: #ddd;
          }
        }
        .c-arow {
          margin-top: 140px;
          cursor: pointer;
          i {
            font-size: 28px;
          }
          .el-icon-d-arrow-right {
            margin-bottom: 10px;
          }
        }
      }
    }
    .btnAlone {
      display: inline-block;
      font-size: 18px;
      color: #fff;
      background: linear-gradient(
        rgba(43, 127, 191, 1),
        rgba(46, 137, 205, 0.63)
      );
      box-shadow: 2px 3px 2px #619ee2 inset, 1px 1px 4px rgba(22, 93, 174, 0.8);
      // margin-right: 15px;
      text-align: center;
      border-radius: 8px;
      margin: 0 4px;
      padding: 3px 18px;
      cursor: pointer;
    }
  }
</style>
<style>
  .group-transfer-wrap .el-tabs__content {
    height: 400px !important;
    overflow-y: auto !important;
    background: #3a6089;
  }
  .group-transfer-wrap .el-tabs__content .el-tree {
    background: #3a6089;
    color: #e0e0e0;
  }
  .group .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    color: #e0e0e0;
    background-color: #3a6089;
  }
  .group .el-dialog__header {
    padding: 10px 20px;
    background: linear-gradient(90deg, #004175, #0f6cb2);
    box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.8);
  }
  .group .el-dialog__header .el-dialog__title {
    color: #e0e0e0;
    font-size: 20px;
  }
  .group .el-dialog__headerbtn {
    top: 13px;
  }
  .group .el-dialog__headerbtn .el-dialog__close {
    color: #e0e0e0;
    font-size: 20px;
  }
  .group .el-tabs__nav-scroll {
    background: #5389c4;
    color: #e0e0e0;
  }
  .group .el-tabs--border-card > .el-tabs__header .el-tabs__item {
    color: #e0e0e0;
    background: #244769;
    border: none;
  }
  .group .el-dialog__body {
    background: #5389c4;
    box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.45);
    padding: 11px 16px;
  }
  .group .el-form-item {
    margin-bottom: 6px;
  }
  .group .el-form-item__label {
    color: #e0e0e0;
    font-size: 16px;
    font-weight: normal;
  }
  .group .el-tabs--border-card {
    box-shadow: none;
    border: none;
  }
  .group .el-radio__label {
    color: #e0e0e0;
    font-size: 16px;
  }
  .group .el-radio__input.is-checked + .el-radio__label {
    color: #e0e0e0;
    font-size: 16px;
  }
  .group .el-radio__inner {
    border: none;
    background: #3a6089;
    box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 0.5),
      inset 0px 1px 3px 0px rgba(0, 0, 0, 0.4);
  }
  .group .el-radio__input.is-checked .el-radio__inner {
    background: url("../../assets/greenRadio.png") no-repeat;
    width: 16px;
    height: 16px;
    background-size: 100% 100%;
  }
  .group .el-input__inner {
    height: 35px;
    line-height: 35px;
    background-color: #3a6089 !important;
    border-bottom: 1px solid #85dcff;
    border-left: 1px solid #5f9de0;
    border-right: 1px solid #5f9de0;
    border-radius: 0;
    font-size: 16px;
    color: #c0c4cc;
  }
  .group .el-dialog__footer {
    background: #5389c4;
    border-top: 2px solid #3f6794;
  }
</style>

