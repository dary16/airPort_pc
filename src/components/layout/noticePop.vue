<template>
  <div>
    <!--发送通知-->
    <v-tree-list-box v-if="showNoticeBox" v-dialogDrag v-on:cancle="cancleFn"></v-tree-list-box>
  </div>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex';
  export default {
    data() {
      return {
        editDate: {},
        deptsIds: [],
        isDepartment: false,
        showNoticeBox: true
      };
    },
    props: [''],
    created() {

    },
    methods: {
      ...mapActions(['_getInfo']),
      //获取子集传来的调用方法
      btnsFn(fn) {
        this[fn]();
      },
      //弹框取消按钮
      cancleFn(val) {
        console.log("取消了");
        this.showNoticeBox = false;
      }
    }
  }
</script>

<style scoped lang="less">
</style>
