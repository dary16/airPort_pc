<template>
  <div class="msgGroup">
    <div class="btnAlone" v-on:click="msgBoxFn">指令</div>
    <!--即时信息-->
    <el-dialog title="即时信息" :visible.sync="messageVisible" width="502px" :before-close="messageClose" :modal-append-to-body='false'>
      <div class="receiver">
        <span class="add">接收者</span>
        <div class="itemChecked">
          <el-tag v-if="checkedShowArr && checkedShowArr.length != 0" v-for="(tag,index) in checkedShowArr" :key="tag.label" closable @close="tagCloseFn(index)">
            {{tag.label}}({{tag.sip}})
          </el-tag>
        </div>
        <i class="addPeople" v-on:click="getMoreFn"></i>
      </div>
      <el-form :model="message" label-width="90px">
        <el-form-item label="信息内容">
          <el-input type="textarea" v-model="message.desc" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <div class="footer">
        <div class="btnAlone" @click="sendMsgFn">发送</div>
      </div>
    </el-dialog>
    <v-selection-staff v-if="isTransfer" v-bind:isTransfer="isTransfer" v-on:cancel="cancelFn" v-on:confirm="confirmFn"></v-selection-staff>
    <!-- <v-message-box v-dialogDrag v-if="isMsgBox" v-on:close="closeFn"></v-message-box> -->
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        messageVisible: false,
        message: {
          name: '',
          desc: ''
        },
        isTransfer: false, //是否显示人员选择框
        // showArr: [],
        entryArr: [],
        checkedShowArr: [],
        isMsgBox: false
      }
    },
    computed: {
      ...mapState(['checkedItem', 'aloneUserMsgSip'])
    },
    watch: {
      aloneUserMsgSip() {
        console.log(this.aloneUserMsgSip, '哈哈哈哈')
        this.msgBoxFn();
      }
    },
    created() {
    },
    methods: {
      msgBoxFn() {
        this.checkedShowArr = [];
        if(this.checkedItem.length != 0) {
          this.checkedItem.forEach(item => {
            this.checkedShowArr.push(item);
          })
        }
        this.messageVisible = true;
        this.message.desc = "";
      },
      sendMsgFn() {
        if(this.checkedShowArr.length != 1) {
          this.$message.error('请选择一个用户！');
          return false;
        }
        this.cmtWsClient.sendSMS(this.checkedShowArr[0].sip, this.message.desc);
        this.messageVisible = false;
        this.checkedShowArr = [];
      },
      getMoreFn() {
        this.isTransfer = true;
      },
      //关闭选人员的框
      cancelFn(val) {
        this.isTransfer = val;
      },
      //关闭选人员框，并取选中人员的值
      confirmFn(list) {
        this.isTransfer = false;
        var checkList = [];
        this.checkedShowArr = [];

        checkList = list.concat(this.checkedShowArr);
        //去重
        for(var i = 0; i < checkList.length; i++) {
          for(var j = i + 1; j < checkList.length; j++) {
            if(checkList[i].id.substr(0, 32) === checkList[j].id.substr(0, 32)) {
              j = ++i;
            }
          }
          this.checkedShowArr.push(checkList[i]);
        }
        this.message.name = '';
      },
      tagCloseFn(index) {
        this.checkedShowArr.splice(index, 1);
      },
      messageClose() {
        this.$confirm('确认关闭即时信息？')
          .then(_ => {
            this.checkedShowArr = [];
            this.entryArr = [];
            this.messageVisible = false;
          })
          .catch(_ => { });
      }
    }
  }
</script>

<style scoped lang="less">
  div.btnAlone {
    display: inline-block;
    width: 70px;
    line-height: 30px;
    font-size: 18px;
    color: #fff;
    background: linear-gradient(rgba(43, 127, 191, 1), rgba(46, 137, 205, 0.63));
    box-shadow: 2px 3px 2px #619ee2 inset, 1px 1px 4px rgba(22, 93, 174, 0.8);
    // margin-right: 15px;
    text-align: center;
    border-radius: 8px;
    margin: 0 4px;
    cursor: pointer;
  }
  .receiver {
    height: 200px;
    background: #5389c4;
    color: #e0e0e0;
    padding-top: 15px;
    font-size: 18px;
    position: relative;
    .add {
      vertical-align: top;
      width: 83px;
      display: inline-block;
    }
    .itemChecked {
      display: inline-block;
      width: 370px;
      height: 167px;
      background: #3a6089;
      border-bottom: 1px solid #85dcff;
      border-left: 1px solid #5f9de0;
      border-right: 1px solid #5f9de0;
      padding: 10px;
      text-align: left;
      overflow-y: auto;
    }
  }
  .footer {
    background: #5389c4;
    height: 63px;
    line-height: 63px;
    border-top: 2px solid #3f6794;
  }
  .addPeople {
    width: 29px;
    height: 29px;
    background: url("../../assets/weather/add.png") no-repeat;
    background-size: 100% 100%;
    border-radius: 6px;
    display: inline-block;
    vertical-align: middle;
    position: absolute;
    left: 45px;
    top: 50px;
  }
  .el-tag {
    width: auto !important;
    background: rgba(0, 32, 57, 0.1);
    border: 1px solid rgba(79, 110, 179, 0.1);
    color: #e0e0e0;
    margin-right: 8px;
    height: 32px !important;
    line-height: 30px !important;
    font-size: 16px !important;
    margin-bottom: 3px;
  }
</style>
<style>
  .msgGroup .el-dialog__header {
    padding: 10px 20px;
    background: linear-gradient(90deg, #004175, #0f6cb2);
    box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.8);
  }
  .msgGroup .el-dialog__header .el-dialog__title {
    color: #e0e0e0;
    font-size: 20px;
  }
  .msgGroup .el-dialog__headerbtn {
    top: 13px;
  }
  .msgGroup .el-dialog__headerbtn .el-dialog__close {
    color: #e0e0e0;
    font-size: 20px;
  }
  .msgGroup .el-tag .el-icon-close {
    color: #e0e0e0;
  }
  .msgGroup .el-form {
    background: #5389c4;
    box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.45);
    padding: 0 22px 10px 20px;
  }
  .msgGroup .el-dialog__body {
    padding: 0;
  }
  .msgGroup .el-form-item__label {
    color: #e0e0e0;
    font-size: 18px;
    font-weight: normal;
  }
  .msgGroup .el-textarea__inner {
    background-color: #3a6089 !important;
    border-bottom: 1px solid #85dcff;
    border-left: 1px solid #5f9de0;
    border-right: 1px solid #5f9de0;
    border-radius: 0;
    font-size: 16px;
    color: #e0e0e0;
    height: 167px;
  }
  .msgGroup .el-form-item {
    margin-bottom: 9px;
  }
</style>

