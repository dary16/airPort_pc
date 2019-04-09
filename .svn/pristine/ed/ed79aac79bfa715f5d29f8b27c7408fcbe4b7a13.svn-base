<template>
    <div class="g-home-layout-top">
        <!--top-->
        <ul class="title-list clearfix">
            <li class="left">
                <img class="logo" src="../../assets/title/plane.png" />
                <div class="name">
                    <h3>民航机场保障支撑系统</h3>
                    <h6>CHINA AIR FORCE</h6>
                </div>
                <div class="weather" v-on:click="showMoreWeather();">
                    <span>{{weather}}</span>
                    <span>{{direction}}</span>
                    <span>{{temperature}}</span>
                </div>
            </li>
            <li class="right">
                <span class="time" v-on:click="setClockFn">
                    <h2>{{dateShow}} {{curDayWeek}}</h2>
                    <h1>{{curTime}}</h1>
                </span>
                <span v-on:click="goToSysFn">系统管理</span>
            </li>
        </ul>
        <v-notice-box v-if="setClockVal" v-dialogDrag v-on:save="saveClockFn" v-on:cancle="cancleClockFn" v-bind:popData="popClockData" v-bind:formData="editDate"></v-notice-box>
        <!--天气预报-->
        <v-show-weather v-if="moreWeather" v-on:hideWeather="hideWeatherFn"></v-show-weather>
    </div>
</template>

<script>
    import { mapMutations, mapActions } from 'vuex';
    export default {
        data() {
            return {
                dateShow: '',
                weekArr: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                curDayWeek: '',
                curTime: '',
                popClockData: {
                    'titleTotal': '设置提醒时钟',
                    'options': [{
                        'status': 3,
                        'title': '时间',
                        'placeholder': '请选择时间',
                        'val': 'clockTime'
                    }, {
                        'status': 4,
                        'title': '内容',
                        'placeholder': '请输入内容',
                        'val': 'clockComment'
                    }]
                },
                editDate: {},
                setClockVal: false,
                currentTime: '',
                weatherData: [],
                weather: '',
                direction: '',
                temperature: '',
                moreWeather: false
            };
        },
        created() {
            this.clockFn();
            this.getClockListFn();
            this.getWeatherFn();
        },
        methods: {
            ...mapActions(['_getInfo']),
            ...mapMutations(['_clearLogin']),
            clockFn() {
                this.dateShow = this.util.formatDate('', 2);
                this.curDayWeek = this.weekArr[new Date().getDay()];
                this.curTime = this.util.formatDate('', 1);
                setTimeout(() => {
                    this.clockFn();
                }, 1000);
            },
            //设置提醒
            setClockFn() {
                this.setClockVal = true;
            },
            saveClockFn(ops) {
                this._getInfo({
                    ops: ops,
                    api: 'setClock',
                    callback: res => {
                        this.setClockVal = false;
                        this.message.success('设置成功');
                        this.getClockListFn();
                    }
                });
            },
            cancleClockFn() {
                this.setClockVal = false;
            },
            getClockListFn() {
                this._getInfo({
                    ops: {
                        "curPage": "1",
                        "pageSize": "1000"
                    },
                    api: 'getClockList',
                    callback: res => {
                        this.list = res.rows;
                        this.currentTimeFn();
                    }
                });
            },
            currentTimeFn() {
                this.currentTime = this.util.formatDate();
                // console.log(this.currentTime, '现在的时间')
                this.list.forEach(item => {
                    // console.log(item.clockTime, '列表的时间');
                    if(new Date(item.clockTime).getTime() == new Date(this.currentTime).getTime()) {
                        this.$notify.info({
                            title: '提示',
                            message: item.clockComment
                        });
                    }
                })
                setTimeout(() => {
                    this.getClockListFn();
                }, 60000);
            },
            //系统管理
            goToSysFn() {
                this.$router.push('managementSystem');
            },
            //获取天气列表
            getWeatherFn() {
                this._getInfo({
                    ops: {
                        "curPage": 1,
                        "pageSize": 1
                    },
                    api: 'weatherList',
                    callback: res => {
                        this.weatherData = res.rows;
                        this.weather = this.weatherData[0].weather;
                        this.direction = this.weatherData[0].windDirection;
                        this.temperature = this.weatherData[0].temperature;
                    }
                });
            },
            showMoreWeather() {
                this.moreWeather = true;
            },
            hideWeatherFn(val) {
                console.log(val);
                this.moreWeather = val;
            }
        }
    }
</script>

<style scoped lang="less">
    .g-home-layout-top {
        background: linear-gradient(180deg, rgba(33, 78, 139, 1), rgba(35, 115, 177, 0.51));
        box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.45);
        .title-list {
            padding: 17px 30px 10px 30px;
            position: relative;
            li {
                width: 50%;
            }
            .left {
                color: #e0e0e0;
                img.logo {
                    width: 153px;
                    height: 69px;
                }
                .name {
                    vertical-align: bottom;
                    margin: auto;
                    position: absolute;
                    top: 50%;
                    left: 21%;
                    -webkit-transform: translate(-50%, -50%);
                    -ms-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
                    padding-right: 40px;
                    h3 {
                        font-size: 30px;
                        line-height: 30px;
                    }
                    h6 {
                        font-size: 18px;
                        padding-top: 10px;
                    }
                }
                .weather {
                    vertical-align: bottom;
                    margin: auto;
                    position: absolute;
                    top: 34%;
                    left: 33%;
                    padding-left: 40px;
                    cursor: pointer;
                    span {
                        display: inline-block;
                        margin-right: 10px;
                        font-size: 20px;
                    }
                }
                .lineLeft {
                    margin: auto;
                    position: absolute;
                    top: 60%;
                    left: 31.5%;
                    width: 1px;
                    height: 48px;
                    -webkit-transform: translate(-50%, -50%);
                    -ms-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
                }
            }
            .right {
                float: right;
                text-align: right;
                margin-top: 11px;
                span {
                    float: right;
                    height: 48px;
                    line-height: 48px;
                    text-align: center;
                    padding: 0px 35px;
                    color: #fff;
                    cursor: pointer;
                }
                span.time {
                    h1 {
                        font-size: 30px;
                        margin: 0;
                    }
                }
                span:nth-child(1) {
                    border-left: 1px solid #e0e0e0;
                }
            }
        }
    }
</style>
