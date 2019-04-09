<template>
  <div class="videoWrap">
    <div class="header">
      <h3>固定监控视频</h3>
      <i class="el-icon-close" v-on:click="closeFn"></i>
    </div>
    <dl>
      <dt>监控信息（10）</dt>
      <dd v-for="item in cameraList">
        <img src="../../assets/list.png" />
        <div class="videoList">
          <span>{{item.cameraName}}</span>
          <img src="../../assets/play.png" />
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations } from 'vuex';
  export default {
    data() {
      return {
        cameraList: []
      };
    },
    created() {
      this.getSystemCameraFn();
    },
    computed: {
      ...mapState(['createGroupData', 'currentGroup'])
    },
    methods: {
      ...mapActions(['_getInfo', '_createGroupData']),
      ...mapMutations(['_currentGroup']),
      closeFn() {
        this.$emit('close', true)
      },
      getSystemCameraFn() {
        this._getInfo({
          api: 'getSystemCameraList',
          callback: res => {
            this.cameraList = res.rows;
            console.log(res);
          }
        });
      }
    }
  };
</script>

<style scoped lang="less">
  .videoWrap {
      position: fixed;
      width: 312px;
      height: calc(100% - 101px);
      left: 298px;
      top: 101px;
      background: linear-gradient(180deg, rgba(83, 137, 196, 0.8), rgba(83, 137, 196, 0.8));
      z-index: 10001;
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
      dl {
          background: rgba(47, 84, 112, 0.6);
          margin: 15px;
          padding: 10px;
          height: 800px;
          overflow-y: auto;
          dt {
              font-size: 18px;
              color: #e0e0e0;
              font-weight: normal;
          }
          dd {
              color: #e0e0e0;
              font-size: 18px;
              .videoList {
                  display: inline-block;
                  border-bottom: 2px solid #a8b7c7;
                  img {
                      margin-bottom: 3px;
                  }
              }
              span {
                  color: #e0e0e0;
                  font-size: 18px;
                  display: inline-block;
                  width: 200px;
              }
              img {
                  vertical-align: middle;
              }
          }
      }
  }
</style>

