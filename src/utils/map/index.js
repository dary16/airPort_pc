import { MarkerClickEvent } from './event.js';
var markers = [];
var airMarker;

//当前页面业务相关
export function initWork(points) {
  //添加模拟点
  points.forEach((item, index) => {
    var popContent = `sip号：${item.user}<br>类型：${item.type}<br>经度：${item.lon}<br>纬度：${item.lat}`;
    var airMarker = L.marker(L.latLng(item.lat, item.lon), {
      title: item.type == 'ugps' ? '人员' : '车辆',
      icon: item.type == 'ugps' ? peopleIcon : carIcon
    }).addTo(this.mapGlobal);
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
    markers.push(airMarker);
    // airMarker.on('click', MarkerClickEvent);
    airMarker.bindPopup(popContent).openPopup();
  });
}
//外部页面调用
function activateWidget(item) {
  L.widget.activate(item);
}
function activateFunByMenu(fun) {
  eval(fun);
}
