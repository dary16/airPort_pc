<template>
  <div id="centerDiv">
    <div id="map" class="map"></div>
    <!-- 地图工具栏 -->
    <v-toolbar v-bind:enclosure="hideEnclosure" v-on:isShowLayer="layerFn" v-on:setNearbyFn="nearbyFn" v-on:setEnclosure="enclosureFn" v-on:setIsShowEnclosure="isShowEnclosureFn" v-on:setRectangleClick="rectangleFn" v-on:pointSelection="pointSelectionFn"></v-toolbar>
    <div class="leftMapButton" v-bind:class="isShowLeftMenu?'moveRightBtn':'moveLeftBtn'">
    </div>

    <!-- <div onclick="L.widget.activate('../../static/map/widgets/manageBasemaps/widget.js', true)" style="position: absolute;left: 5px; bottom: 25px; width: 36px; height: 36px;padding:5px; background-color: rgba(0, 0, 0, 0.3);z-index:9999;">
            <img src="http://180.76.109.63/leaflet/lib/leaflet-mars/images/layers.png" />
        </div> -->
    <!-- <button v-on:click="clearFn" type="button" class="btn btn-primary" style="position:absolute;height:30px;z-index:1000;right:60px;top:100px;">
            清空
        </button> -->

    <!--添加电子围栏-->
    <v-notice-box v-dialogDrag v-if="isShowBox" v-on:save="saveFn" v-on:cancle="cancleFn" v-bind:popData="popData" v-bind:formData="editDate" title="新建电子围栏"></v-notice-box>
    <!--图层-->
    <v-map-layer v-if="isLayerShow" v-on:layerClose="layerFnClose" v-on:layerData="showLayerFn"></v-map-layer>
    <!--地图上点击人员信息弹框-->
    <v-user-info v-if="isUserList" v-bind:sip="parentSip" v-on:closeClick="closeUserInfoFn"></v-user-info>
    <!--附近-->
    <v-near-user-info v-if="isShowNearUser" v-bind:distancePoint="earthRadius" v-bind:circleIn="circleIn" v-on:closeFn="closeUserFn" v-on:setDistance="getDistanceFn"></v-near-user-info>
  </div>
</template>

<script>
  import { polygonClickFn, clearClickFn, Intersect } from '../utils/map/event.js';
  import { mapActions, mapState, mapMutations } from 'vuex';
  import Vue from 'vue';
  var markersCar = [];
  var markersUgps = [];
  export default {
    data() {
      return {
        myStyle: {
          "color": "#00f",
          "weight": 1,
          "opacity": 0.5,
          // 'fill':true,
          // 'stroke':true,
          // 'fillOpacity':0.8
        },
        hideEnclosure: false,
        isUserList: false,
        isShowBox: false,
        parentSip: '',
        popData: {
          'titleTotal': '新建电子围栏',
          'options': [{
            'status': 1,
            'title': '名称',
            'placeholder': '请输入名称',
            'val': 'fence_name'
          }, {
            'status': 2,
            'title': '类型',
            'placeholder': '请选择类型',
            'list': [{
              "value": "禁入", "label": "禁入"
            }, {
              "value": "禁出", "label": "禁出"
            }],
            'val': 'fence_type'
          }]
        },
        editDate: {},
        //电子围栏多个点经纬度集合
        enclosureArr: [],
        setPolygonArr: [],
        markers: [],
        //分层
        typeLayered: '',
        carObj: {},
        peopleObj: {},
        organization: [],
        isLayerShow: false,
        earthRadius: 2000,
        circleIn: [],
        nearGpsData: [],
        isShowNearUser: false,
        currentCenter: [],
        enclosureLayers: [],
        enclosureGatherArr: [],
        mapLayerObj: {
          carShow: 'show',
          personShow: 'show'
        },
        treeData: [],
        isPointSelection: false,
        timer: null
      };
    },
    mounted() { },
    created() {
      this.createMap();
    },
    watch: {
      isShowLeftMenu() {
        if(this.isShowLeftMenu) {
          console.log(1)
        } else {
          console.log(2);
        }
      }
    },
    computed: {
      ...mapState(['isShowLeftMenu'])
    },
    beforeDestroy() {
      clearTimeout(this.timer);
    },
    methods: {
      ...mapActions(['_getInfo']),
      ...mapMutations(['_setCheckedArr', '_setAloneUserVoiceSip', '_setAloneUserVideoSip', '_setCheckedItemArr', '_setAloneUserMsgSip', '_setRectangle']),
      //是否点选
      pointSelectionFn() {
        this.isPointSelection = true;
      },
      //创建地图 //根据配置文件初始化系统界面
      createMap() {
        var _this = this;
        if(window.parent && window.parent.setStyleByTheme) {
          haoutil.storage.add('theme', 'blue');
          window.parent.setStyleByTheme();
        }
        var request = haoutil.system.getRequest();
        var configfile = 'static/map/config.json';
        if(request.config) configfile = '../leaflet-example/config/' + request.config + '.json';

        haoutil.loading.show();

        L.mars.createMap({
          id: 'map',
          url: configfile + '?time=20180905',
          layerToMap: this.layerToMap,
          success: function(_map, gisdata, jsondata) {
            haoutil.loading.hide();
            Vue.prototype.mapGlobal = _map;
            _this.mapGlobal.on('click', function(e) {
              console.log(e);
            })

            //如果配置默认有图层控制控件，移除（与widget功能重复）
            if(gisdata.controls && gisdata.controls.layers) {
              _this.mapGlobal.removeControl(gisdata.controls.layers);
            }

            //初始化widget管理器
            if(haoutil.isutil.isNotNull(request.widget)) {
              jsondata.widget.widgetsAtStart = [];
            }
            L.widget.init(_map, jsondata.widget);

            //如果url传参，激活对应widget
            if(haoutil.isutil.isNotNull(request.widget)) L.widget.activate(request.widget);

            //如果有xyz传参，进行定位
            if(haoutil.isutil.isNotNull(request.x) && haoutil.isutil.isNotNull(request.y) && haoutil.isutil.isNotNull(request.z)) {
              var x = Number(request.x);
              var y = Number(request.y);
              var z = Number(request.z);
              _this.mapGlobal.setView([y, x], z);
            }
            // L.geoJSON(mapData, {
            //   style: _this.myStyle
            // }).addTo(_this.mapGlobal);
            //初始化画图工具
            _this.initDraw();
            //获取部门id
            _this.getDepartmentFn();
          }
        });
      },
      //获取部门id
      getDepartmentFn() {
        this._getInfo({
          method: 'get',
          api: 'getDepartment',
          callback: res => {
            this.treeData = JSON.parse(res.treeData);
            var arr = [];
            this.treeData.forEach(item => {
              arr.push(item.id);
              if(item.children) {
                item.children.forEach(subItem => {
                  arr.push(subItem.id);
                })
              }
            })
            this.mapLayerObj.deptId = arr.join(',')
            //初始上来获取地图上的点
            this.getPointListFn();
          }
        });
      },
      //图层
      showLayerFn(obj) {
        this.mapLayerObj = obj;
        this.isLayerShow = false;
        this.getPointListFn();
      },
      //自定义图层添加方法
      layerToMap(config, layer) {
      },
      //初始化画图工具
      initDraw() {
        var _this = this;
        Vue.prototype.drawTool = new L.mars.Draw({
          map: this.mapGlobal,
          isOnly: true,
          hasDel: true,
          onEvnet: true,
          onStartEditing: function(layer) { },
          onStopEditing: function(featurelayer) {
            //绘制电子围栏
            _this.setEnclosureFn(featurelayer);
            //多边形转成string
            var polygonstring = JSON.stringify(featurelayer.toGeoJSON());
            //把string转成GeoJson格式
            var polygonJson = JSON.parse(polygonstring);
          }
        });
        this.mapGlobal.addLayer(this.drawTool.getLayer());
        //地图加载完获取已有电子围栏
        this.getElectronicFenceFn();
      },
      //获取地图上的点
      getPointListFn() {
        var _this = this;
        this._getInfo({
          ops: this.mapLayerObj,
          api: 'getPointList',
          callback: res => {
            this.nearGpsData = res.gpsData;
            // var latArr = [];
            // latArr.push(res.gpsData[0].lat, res.gpsData[0].lon)
            // this.mapGlobal.setView(latArr, 13)
            //地图上打点
            var airMarker;
            this.markers = [];
            markersCar = [];
            markersUgps = [];
            res.gpsData.forEach((item, index) => {
              if(item.obj != null) {
                var carContent = `
                                <div class="userShowBox">
                                    <div class="show clearfix">
                                        <img src="${item.obj.carpicture}"/>
                                        <ul class="userInfo">
                                            <li>车牌号：${item.obj.carCode}</li>
                                            <li>单位：${item.obj.orgName}</li>
                                            <li>车类型：${item.obj.carType}</li>
                                            <li>驾驶员：${item.obj.driverName}</li>
                                        </ul>
                                    </div>
                                    <ul class="btns clearfix">
                                        <li class="voice" sip="${item.user}">语音</li>
                                        <li class="video" sip="${item.user}">视频</li>
                                        <li class="message" curId="${item.obj.id}" sip="${item.user}" name="${item.obj.userName}">指令</li>
                                        <li class="trajectory" sip="${item.user}">轨迹</li>
                                    </ul>
                                </div>
                                `
                var peopleContent = `
                                <div class="userShowBox">
                                    <div class="show clearfix">
                                        <img src="${item.obj.userPic}"/>
                                        <ul class="userInfo">
                                            <li>姓名：${item.obj.userName}</li>
                                            <li>单位：${item.obj.orgName}</li>
                                            <li>专业：${item.obj.userProfession}</li>
                                            <li>军衔：${item.obj.userRank}</li>
                                        </ul>
                                    </div>
                                    <ul class="btns clearfix">
                                        <li class="voice" sip="${item.user}">语音</li>
                                        <li class="video" sip="${item.user}">视频</li>
                                        <li class="message" curId="${item.obj.id}" sip="${item.user}" name="${item.obj.userName}">指令</li>
                                        <li class="trajectory" sip="${item.user}">轨迹</li>
                                    </ul>
                                </div>
                                `
              }

              if(item.type == 'car') {
                airMarker = L.marker(L.latLng(item.lat, item.lon), {
                  title: '汽车',
                  icon: L.icon({
                    iconUrl: './static/map/img/car.png',
                    iconSize: [50, 50]
                  })
                });
                airMarker.on('click', function() {
                  if(this.isPointSelection) {
                    console.log('车')
                    this.isPointSelection = false;
                  }
                })
                markersCar.push(airMarker);
                // airMarker.bindPopup(carContent).openPopup();
                airMarker.bindPopup(carContent).on('popupopen', function() {
                  //对讲
                  document.getElementsByClassName("voice")[0].onclick = function() {
                    var sip = this.getAttribute('sip');
                    _this.talkbackFn(sip);
                  }
                  //视频
                  document.getElementsByClassName("video")[0].onclick = function() {
                    var sip = this.getAttribute('sip');
                    _this.videoFn(sip)
                  }
                  //指令
                  document.getElementsByClassName("message")[0].onclick = function() {
                    var obj = {}
                    obj.label = this.getAttribute('name');
                    obj.sip = this.getAttribute('sip');
                    obj.id = this.getAttribute('curId');
                    _this.messageFn(obj);
                  }
                  //轨迹
                  document.getElementsByClassName("trajectory")[0].onclick = function() {
                    var sip = this.getAttribute('sip');
                    _this.trajectoryBackFn(sip, 'car')
                  }
                })
              } else if(item.type == 'ugps') {
                airMarker = L.marker(L.latLng(item.lat, item.lon), {
                  title: '人员',
                  icon: L.icon({
                    iconUrl: './static/map/img/people.png',
                    iconSize: [50, 50]
                  })
                });
                airMarker.on('click', (e) => {
                  if(this.isPointSelection) {
                    this._setRectangle([item.user])
                    this.isPointSelection = false;
                  }
                })
                markersUgps.push(airMarker);
                airMarker.bindPopup(peopleContent).on('popupopen', function() {
                  _this.parentSip = document.getElementsByClassName("voice")[0].getAttribute('sip')
                  _this.isUserList = true;
                  //对讲
                  document.getElementsByClassName("voice")[0].onclick = function() {
                    _this.isUserList = false;
                    var sip = this.getAttribute('sip');
                    _this.talkbackFn(sip);
                  }
                  //视频
                  document.getElementsByClassName("video")[0].onclick = function() {
                    _this.isUserList = false;
                    var sip = this.getAttribute('sip');
                    _this.videoFn(sip)
                  }
                  //指令
                  document.getElementsByClassName("message")[0].onclick = function() {
                    _this.isUserList = false;
                    var obj = {}
                    obj.label = this.getAttribute('name');
                    obj.sip = this.getAttribute('sip');
                    obj.id = this.getAttribute('curId');
                    _this.messageFn(obj);
                  }
                  //轨迹
                  document.getElementsByClassName("trajectory")[0].onclick = function() {
                    _this.isUserList = false;
                    var sip = this.getAttribute('sip');
                    _this.trajectoryBackFn(sip, 'ugps')
                  }
                })
              }
              //设置标注的自定义属性值
              Object.defineProperties(airMarker, {
                sip: {
                  value: item.user
                },
                lon: {
                  value: item.lon
                },
                lat: {
                  value: item.lat
                },
                id: {
                  value: index + 1
                }
              });
              //   // airMarker.on('click', MarkerClickEvent);
              this.markers.push(airMarker);
            });
            this.mapGlobal.removeLayer(this.carObj);
            this.mapGlobal.removeLayer(this.peopleObj);
            this.carObj = L.layerGroup(markersCar);
            this.peopleObj = L.layerGroup(markersUgps);
            this.carObj.addTo(this.mapGlobal);
            this.peopleObj.addTo(this.mapGlobal);
            this.timer = setTimeout(() => {
              this.getPointListFn();
            }, 10000)
          }
        });
      },
      //对讲
      talkbackFn(sip) {
        this._setAloneUserVoiceSip([]);
        var sipArr = [];
        sipArr.push(sip);
        this._setAloneUserVoiceSip(sipArr);
        this._setCheckedArr(sipArr);
      },
      //视频
      videoFn(sip) {
        this._setAloneUserVideoSip([]);
        var sipArr = [];
        sipArr.push(sip);
        this._setAloneUserVideoSip(sipArr);
        this._setCheckedArr(sipArr);
      },
      //短信
      messageFn(obj) {
        this._setAloneUserMsgSip([]);
        var sipArr = [];
        sipArr.push(obj);
        this._setAloneUserMsgSip(sipArr);
        this._setCheckedItemArr(sipArr);
      },
      //轨迹回放
      trajectoryBackFn(sip, type) {
        this._getInfo({
          ops: { "startTime": this.util.formatDate('', 2) + ' 00:00:00', "endTime": this.util.formatDate('', 2) + ' 23:59:59', "sip": sip, type: type },
          api: 'trajectoryBack',
          callback: res => {
            if(res == 'null') {
              return false;
            }
            if(res.length == 0) {
              this.$message.error('暂无轨迹！');
              return false;
            }
            var arrTrajectory = [];
            res.forEach((item, index) => {
              var subArr = [];
              subArr.push(parseFloat(item.lat), parseFloat(item.lon));
              arrTrajectory.push(subArr);
            })
            this.isShowTrajectory = false;
            if(arrTrajectory.length != 0) {
              this.mapGlobal.setView(arrTrajectory[parseInt(arrTrajectory.length / 2)], 4);
              if(type == "ugps") {
                var myIcon = L.icon({
                  iconUrl: './static/map/img/people.png',
                  iconSize: [50, 50]
                });
              } else {
                var myIcon = L.icon({
                  iconUrl: './static/map/img/car.png',
                  iconSize: [50, 50]
                });
              }
              this.util.movingMarker(arrTrajectory, [2000, 2000, 2000, 2000, 2000], { autostart: true, icon: myIcon }).addTo(this.mapGlobal);
              L.polyline(arrTrajectory, { color: 'red' }).addTo(this.mapGlobal);
            }
          }
        });
      },
      //添加电子围栏保存
      saveFn(val) {
        val = { ...val, ...{ fence_points: this.enclosureArr } };
        this._getInfo({
          ops: val,
          api: 'setElectronicFence',
          callback: res => {
            this.message.success('电子围栏添加成功！');
            this.isShowBox = false;
            this.drawTool.clearDraw();
            this.getElectronicFenceFn();
          }
        });
      },
      //添加电子围栏取消
      cancleFn() {
        this.isShowBox = false;
        this.drawTool.clearDraw();
      },
      //绘制电子围栏
      setEnclosureFn(featurelayer) {
        //多边形转成string
        var polygonstring = JSON.stringify(featurelayer.toGeoJSON());
        //把string转成GeoJson格式
        var polygonJson = JSON.parse(polygonstring);

        if(featurelayer.properties.type == "polygon") {
          //电子围栏
          this.isShowBox = true;
          this.enclosureArr = [];
          this.enclosureArr = polygonJson.geometry.coordinates;
        } else if(featurelayer.properties.type == "rectangle") {
          //圈选
          //与点位进行相交查询
          var setArr = [];  //存储数组，显示在通讯录
          $.each(this.markers, (i, m) => {
            var latlng = m.getLatLng();
            var coor = [latlng.lng, latlng.lat];
            var isIntersect = Intersect(coor, polygonJson.geometry.coordinates);

            //如果相交输出标注的ID
            if(isIntersect) {
              setArr.push(m.sip);
            }
          });
          if(setArr.length > 0) {
            this._setRectangle(setArr)
          } else {
            this.$message.error('没有圈选中的人员,请重新选择！')
          }
          //   console.log(setArr, 'setArr')
        }
      },
      //获取已有电子围栏
      getElectronicFenceFn() {
        if(this.enclosureGatherArr.length != 0) {
          this.mapGlobal.removeLayer(this.enclosureGatherArr);
        }
        var _this = this;
        this._getInfo({
          ops: {},
          api: 'getElectronicFence',
          callback: res => {
            this.setPolygonArr = [];
            res.rows.forEach((item, index) => {
              this.setPolygonArr.push({ arr: JSON.parse(item.fence_points)[0], title: item.fence_name, id: item.id });
            })
            this.setPolygonArr.forEach(item => {
              item.arr.forEach(subItem => {
                [subItem[0], subItem[1]] = [subItem[1], subItem[0]];
              })
            })
            this.enclosureLayers = [];
            this.setPolygonArr.forEach((item, index) => {
              var polygon = L.polygon(item.arr, {
                color: 'red',
                id: item.id //res.rows[index].id
              })
              // .addTo(this.mapGlobal);
              polygon.bindPopup(`title:${item.title}`);
              polygon.bindContextMenu({
                contextmenu: true,
                contextmenuInheritItems: false,
                contextmenuItems: [{
                  text: '删除',
                  iconCls: 'fa fa-trash',
                  context: layer,
                  callback: function(e) {
                    _this.delElectronicFenceFn(polygon.options.id, polygon);
                  }
                }]
              });
              this.enclosureLayers.push(polygon)
            })
            this.enclosureGatherArr = [];
            this.enclosureGatherArr = L.layerGroup(this.enclosureLayers);
            //是否显示电子围栏
            this.isShowEnclosureFn();
          }
        });
      },
      //删除电子围栏
      delElectronicFenceFn(id, polygon) {
        this._getInfo({
          ops: {
            id: id
          },
          api: 'delElectronicFence',
          callback: res => {
            this.hideEnclosure = false;
            this.getElectronicFenceFn();
            this.message.success('当前电子围栏删除成功！');
          }
        })
      },
      //圈选
      rectangleFn() {
        var polygon = {
          name: '矩形',
          iconClass: 'mp_icon_rect',
          type: 'rectangle',
          style: {
            fill: true,
            color: '#0000ff',
            weight: 3
          }
        };
        this.drawTool.startDraw(polygon.type, polygon);
      },
      //图层
      layerFn() {
        if(this.isLayerShow) {
          this.isLayerShow = false;
        } else {
          this.isLayerShow = true;
        }
      },
      //关闭图层
      layerFnClose() {
        this.isLayerShow = false;
      },
      //添加电子围栏
      enclosureFn() {
        if(this.hideEnclosure) {
          this.hideEnclosure = false;
          this.mapGlobal.removeLayer(this.enclosureGatherArr);
        }
        this.message('请在地图上绘制电子围栏！')
        var polygon = { name: '面', iconClass: 'mp_icon_area', type: 'polygon', style: { fill: true, color: '#0000ff', weight: 3 } };
        this.drawTool.startDraw(polygon.type, polygon);
      },
      //是否显示电子围栏
      isShowEnclosureFn() {
        if(this.hideEnclosure) {
          //隐藏电子围栏
          this.hideEnclosure = false;
          this.mapGlobal.removeLayer(this.enclosureGatherArr);
        } else {
          //显示电子围栏
          this.hideEnclosure = true;
          this.mapGlobal.addLayer(this.enclosureGatherArr);
        }
      },
      //附近功能
      nearbyFn() {
        this.currentCenter = [];
        this.mapGlobal.on('click', (e) => {
          this.currentCenter.push(e.latlng.lat.toFixed(5), e.latlng.lng.toFixed(5));
          L.circle(this.currentCenter, this.earthRadius, {
            color: 'transparent', //颜色
            fillColor: '#f03',
            fillOpacity: 0 //透明度
          }).addTo(this.mapGlobal);
          //获取在范围内的点
          this.nearGpsDataFn();
        });
      },
      nearGpsDataFn() {
        this.circleIn = [];
        if(this.nearGpsData.length != 0) {
          this.nearGpsData.forEach(item => {
            var pointIn = L.latLng(this.currentCenter).distanceTo([item.lat, item.lon]);
            if(pointIn < this.earthRadius) {
              var distanceIn = Math.round(L.latLng(this.currentCenter).distanceTo([item.lat, item.lon]));
              this.circleIn.push({
                distance: distanceIn,
                sip: item.obj.userSip,
                type: item.type
              });
            } else {
              return false;
            }
          })
          if(this.circleIn.length == 0) {
            return false;
          } else {
            this.isShowNearUser = true;
          }
        }
      },
      //关闭附近人员的框
      closeUserFn() {
        this.isShowNearUser = false;
      },
      //不同距离获取
      getDistanceFn(distance) {
        this.earthRadius = distance;
        this.nearGpsDataFn();
      },
      //关闭人员信息弹框
      closeUserInfoFn(val) {
        this.isUserList = val;
      }
    }
  };
</script>

<style scoped lang="less">
  #centerDiv {
    position: relative;
  }
</style>
<style lang="less">
  .layerShow .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #e0e0e0;
  }
  .layerShow .el-checkbox__label {
    display: inline-block;
    font-size: 18px !important;
  }
  .layerShow .el-checkbox__input.is-checked .el-checkbox__inner,
  .layerShow .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #3a6089;
    border-color: #3a6089;
  }
  .userShowBox {
    .show {
      img {
        width: 110px;
        height: 169px;
        float: left;
      }
      .userInfo {
        margin-left: 110px;
        padding: 0px 10px;
        width: 132px;
        li {
          font-size: 16px;
          color: #244a66;
          line-height: 28px;
          text-overflow: ellipsis;
          white-space: nowrap;
          position: relative;
        }
      }
    }
    .btns {
      padding: 4px 0px;
      padding-top: 6px;
      li {
        float: left;
        width: 50px;
        height: 30px;
        line-height: 32px;
        font-size: 16px;
        color: #fff;
        background: linear-gradient(#2b7fbf, rgba(46, 137, 205, 0.63));
        box-shadow: 2px 3px 2px #619ee2 inset, 1px 1px 4px rgba(22, 93, 174, 0.8);
        text-align: center;
        border-radius: 8px;
        margin: 0 5px;
        cursor: pointer;
      }
    }
  }
  .carShowBox {
    ul {
      width: 132px;
      padding: 5px 0px;
      li {
        color: #244a66;
        line-height: 26px;
        font-size: 16px;
      }
    }
  }
</style>
