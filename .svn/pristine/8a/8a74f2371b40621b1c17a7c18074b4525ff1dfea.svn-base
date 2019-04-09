<template>
  <div class="userDetails">
    <!-- <h3 class="title"></h3> -->
    <div class="popTitle">
      <h3>人员信息</h3>
      <i class="el-icon-close" v-on:click="onCancle"></i>
    </div>
    <div class="list">
      <ul class="listUl">
        <li v-for="item in userList">
          <span class="marker">
                        <img v-if="item.status && item.status==1" src="../../assets/marker02.png"/>
                        <img v-else src="../../assets/marker01.png"/>
                    </span>
          <h3>{{item.time}}</h3>
          <span class="content">{{item.place}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations } from 'vuex';
  export default {
    data() {
      return {
        userList: []
      };
    },
    props: ['sip'],
    created() {
      this.getListFn();
    },
    computed: {
    },
    methods: {
      ...mapActions(['_getInfo']),
      getListFn() {
        this._getInfo({
          ops: {
            sip: this.sip
          },
          api: 'workProgress',
          callback: res => {
            this.userList = res.work;
          }
        });
      },
      onCancle() {
        this.$emit('closeClick', false)
      }
    }
  };
</script>

<style scoped lang="less">
  .userDetails {
    width: 298px;
    position: fixed;
    right: 0px;
    bottom: 0px;
    background: linear-gradient(rgba(0, 74, 132, 0.9), rgba(53, 106, 146, 0.51));
    z-index: 9999;
    .popTitle {
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
    div.list {
      ul.listUl {
        border-left: 30px solid rgba(0, 0, 0, 0.3);
        padding-bottom: 36px;
        li {
          width: 224px;
          height: 64px;
          margin-left: 6px;
          margin-top: 6px;
          padding-left: 28px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.3);
          color: #fff;
          padding-top: 8px;
          position: relative;
          h3 {
            font-size: 18px;
            font-weight: bold;
            line-height: 24px;
          }
          span.content {
            display: block;
            font-size: 18px;
            line-height: 24px;
          }
          span.marker {
            position: absolute;
            top: 50%;
            margin-top: -15px;
            left: -18px;
          }
        }
      }
    }
  }
</style>

