<template>
  <div class="userMask">
    <dl class="content">
      <dt>选择人员
        <i class="el-icon-close" v-on:click="cancelFn"></i>
      </dt>
      <dd>
        <el-tree :data="userList" node-key="id" :default-expanded-keys="[1]" show-checkbox @check="checkedFn" :props="defaultProps" ref="tree2"></el-tree>
      </dd>
      <dd style="text-align:center;">
        <el-button type="primary" size="mini" v-on:click="submitFn">确定</el-button>
        <!-- <el-button size="mini" v-on:click="cancelFn">取消</el-button> -->
      </dd>
    </dl>
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
        checkedItemArr: []
      };
    },
    computed: {
      ...mapState(['userList'])
    },
    created() { },
    methods: {
      ...mapActions(['_getInfo']),
      checkedFn(data, node) {
        //传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象，
        //包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
        this.checkedItemArr = [];
        node.checkedNodes.forEach(item => {
          if(item.sip && item.sip != 'null' && item.sip != null) {
            //即时信息需要的数据
            this.checkedItemArr.push(item);
          }
        })
      },
      submitFn() {
        if(this.checkedItemArr.length == 0) {
          this.message.error('请至少选择一个人员！');
          return false;
        }
        this.$emit('checkedUser', this.checkedItemArr)
      },
      cancelFn() {
        this.$emit('closeUserFn')
      }
    }
  };
</script>

<style scoped lang="less">
  .userMask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    z-index: 9998;
    background: rgba(0, 0, 0, 0.3);
    .content {
      position: fixed;
      width: 30%;
      height: 530px;
      background: #fff;
      left: 35%;
      top: 100px;
      z-index: 9999;
      overflow-y: auto;
      dt {
        height: 36px;
        line-height: 36px;
        text-align: center;
        position: relative;
        background: #ccc;
        .el-icon-close {
          position: absolute;
          top: 10px;
          right: 10px;
        }
      }
      dd {
        margin-left: 20px;
        margin-top: 10px;
      }
    }
  }
</style>
