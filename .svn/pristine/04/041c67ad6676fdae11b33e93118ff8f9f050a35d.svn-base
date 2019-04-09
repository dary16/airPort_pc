<template>
  <div class="weatherWrap">
    <div class="weather">
      <div>
        <span class="title">气象信息与天气实况</span>
        <span class="right">
          <i
            class="el-icon-close"
            @click="hideWeatherFn();"
          ></i>
        </span>
        <span class="right" style="display:none;" v-on:click="addWeatherFn"><i class="addWeather"></i>新增天气</span>
      </div>
    </div>
    <transition name="fade">
      <div class="weatherList">
        <dl class="flex-c">
          <dd v-for="item in weatherListData">
            <ul>
              <li>{{item.timestemp}}分钟</li>
              <li>{{item.weather}}</li>
              <li>{{item.temperature}}</li>
              <li>{{item.windDirection}}{{item.windPower}}</li>
              <li>云量{{item.cloudAmount}}</li>
            </ul>
          </dd>
        </dl>
      </div>
    </transition>
    <transition name="top">
      <div style="display:none;" class="to-close" v-on:click="hideWeatherFn"></div>
    </transition>

    <!-- <v-add-weather v-if="isAddWeather" v-on:closeFn="closeAddFn" style="background: #fff; padding: 20px; position: absolute; right: 50%; top: 100px; z-index: 1001;"></v-add-weather> -->
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  export default {
    data() {
      return {
        weatherListData: []
      };
    },
    computed: {
      ...mapState([''])
    },
    created() {
      this.getWeatherFn();
    },
    methods: {
      ...mapActions(['_getInfo']),
      hideWeatherFn() {
        this.$emit("hideWeather", false);
      },
      //新增天气
      addWeatherFn() {
        this.$router.push('weather');
        //this.isAddWeather = true;
      },
      //关闭天气
      closeAddFn() {
        //this.isAddWeather = false;
        this.getWeatherFn();
      },
      //获取天气列表
      getWeatherFn() {
        this._getInfo({
          ops: {
            "curPage": "1",
            "pageSize": "100"
          },
          api: 'weatherList',
          callback: res => {
            this.weatherListData = res.rows.slice(0, 4);
          }
        });
      }
    }
  };
</script>

<style scoped lang="less">
  .weatherWrap {
      position: absolute;
      z-index: 1002;
      top: 30px;
      right: 598px;
  }
  .weather {
      position: absolute;
      top: 70px;
      left: 10px;
      font-weight: 400;
      color: rgba(224, 224, 224, 1);
      text-align: left;
      font-size: 20px;
      line-height: 38px;
      cursor: pointer;
      z-index: 1001;
      width: 587px;
      height: 38px;
      background: linear-gradient(90deg, rgba(0, 65, 117, 1), rgba(15, 108, 178, 1));
      box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.8);

      .right {
          float: right;
          padding-right: 21px;
          .addWeather {
              width: 29px;
              height: 29px;
              background: url('../../assets/weather/add.png') no-repeat;
              background-size: 100% 100%;
              border-radius: 6px;
              display: inline-block;
              vertical-align: middle;
          }
      }

      .title {
          font-size: 20px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(224, 224, 224, 1);
          padding-left: 12px;
      }
  }
  .to-open {
      position: absolute;
      top: 109px;
      left: 10px;
      background: url('../../assets/weather/to_bottom.png') no-repeat;
      width: 587px;
      height: 35px;
      background-size: 100% 100%;
      z-index: 1000;
      cursor: pointer;
  }
  .weatherList {
      position: absolute;
      width: 587px;
      height: 240px;
      top: 109px;
      left: 10px;
      background: url('../../assets/weather/weather_bg.png') no-repeat;
      background-size: 100% 100%;
      box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.45);
      color: #fff;
      z-index: 1000;
      overflow: auto;
      .flex-c {
          display: flex;
          flex-direction: column;
          flex-direction: column;
          padding-top: 14px;
      }
      h3 {
          text-align: right;
          height: 42px;
          line-height: 42px;
          cursor: pointer;
          i {
              margin-right: 20px;
          }
      }
      dd {
          flex: 1;
          width: 100%;
          padding: 5px 30px;
          background: url('../../assets/weather/weather_item.png') no-repeat;
          background-size: 100% 100%;
          margin-bottom: 7px;
          border-bottom: 1px solid #3e84b9;
          li {
              line-height: 30px;
              display: inline-block;
              width: 19%;
          }
      }
  }
  .to-close {
      position: absolute;
      top: 349px;
      left: 10px;
      background: url('../../assets/weather/to-top.png') no-repeat;
      width: 587px;
      height: 35px;
      background-size: 100% 100%;
      z-index: 1000;
      cursor: pointer;
  }
  .fade-enter-active,
  .fade-leave-active {
      transition: opacity 1s;
  }
  .fade-enter,
  .fade-leave-to {
      opacity: 0;
  }
  .top-enter-active,
  .top-leave-active {
      transition: opacity 1s;
  }
  .top-enter,
  .top-leave-to {
      opacity: 0;
  }
</style>
