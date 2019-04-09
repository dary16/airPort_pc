import store from '../store';

//get params from url
export function getParams(url) {
  url = url || window.location.href;
  if (url.indexOf('#') != -1) {
    url = url.split('#')[1];
  }

  let params = '';

  if (url.indexOf('?') != -1) {
    params = url.substr(url.indexOf('?') + 1);
  }

  let obj = {};

  if (params) {
    let arr = [];

    if (params.indexOf('&') == -1) {
      arr = [params];
    } else {
      arr = params.split('&');
    }
    for (let i = 0; i < arr.length; i++) {
      let s = arr[i].split('=');

      obj[s[0]] = decodeURIComponent(s[1]);
    }
  }
  return obj;
}

//set session
export function setSen(k, val) {
  if (typeof val == 'string') {
    sessionStorage.setItem(k, val);
    return val;
  }
  sessionStorage.setItem(k, JSON.stringify(val));
  return val;
}

//get session
export function getSen(k) {
  let uu = sessionStorage.getItem(k);

  try {
    if (typeof JSON.parse(uu) != 'number') {
      uu = JSON.parse(uu);
    }
  } catch (e) {}
  return uu;
}

//set local
export function setLoc(k, val) {
  if (typeof val == 'string') {
    localStorage.setItem(k, val);
    return val;
  }
  localStorage.setItem(k, JSON.stringify(val));
  return val;
}

//get local
export function getLoc(k) {
  let uu = localStorage.getItem(k);

  try {
    if (typeof JSON.parse(uu) != 'number') {
      uu = JSON.parse(uu);
    }
  } catch (e) {}
  return uu;
}

// 清除浏览器内存数据 @k 需求清除内存字段的键名 @m 指定需要清除的存储空间 有两个值's'或者'l';没有k值则清除内存数据
export function clearKey(k, m) {
  m = m || 's';
  if (k) {
    m == 'l' ? localStorage.removeItem(k) : sessionStorage.removeItem(k);
  } else {
    sessionStorage.clear();
    localStorage.clear();
  }
}

//获取屏幕宽度高度
export function getClient() {
  let clientWidth = document.documentElement.clientWidth;
  let clientHeight = document.documentElement.clientHeight;

  return {
    clientWidth,
    clientHeight
  };
}

//格式化距离
export function formatDistance(distance) {
  if (distance < 0.1) {
    return '<100m';
  } else if (distance >= 0.1 && distance < 1) {
    return distance * 1000 + 'm';
  } else if (distance >= 1) {
    return distance.toFixed(1) + 'km';
  }
}

//序列化对象和数组
export function serialize(data) {
  if (data != null && data != '') {
    try {
      return JSON.parse(JSON.stringify(data));
    } catch (e) {
      if (data instanceof Array) {
        return [];
      }
      return {};
    }
  }
  return data;
}

//计算金额加减时防止金额失去精度
export function calculatePrice(price = 0) {
  if (typeof price === 'string') {
    price = parseFloat(price);
  }

  if (isNaN(price)) {
    return 0;
  }

  return Math.round(price * 100) / 100;
}

//格式化金额
export function formatPrice(price = 0) {
  if (typeof price === 'string') {
    price = parseFloat(price);
  }

  if (isNaN(price)) {
    return 0;
  }

  if (parseInt(price) === price) {
    return price;
  }

  return price.toFixed(2);
}

//判断当前运行的浏览器环境
export function browser() {
  let os = {};
  let ua = window.navigator.userAgent.toLowerCase();

  os.isAndroid = /android/.test(ua); //browser,wechat,android
  os.isIOS = /iphone|ipad|ipod/.test(ua); //browser,wechat,ios
  os.isBrowser = /macintel|win32/.test(navigator.platform.toLowerCase()); //browser
  os.isWeixin = ua.indexOf('micromessenger') != -1; //wechat
  os.isAlipay = ua.indexOf('alipayclient') != -1; //ali
  os.isApp = function() {
    return (this.isAndroid || this.isIOS) && !this.isWeixin && !this.isBrowser && !this.isAlipay;
  };

  return os;
}

//格式化日期
export function getFormatDate(date) {
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate;
  }
  var formatdate = date.getFullYear() + '' + month + '' + strDate + '' + date.getHours() + '' + date.getMinutes() + '' + date.getSeconds();
  return formatdate;
}

// //格式化日期
// Date.prototype.format = function(fmt) {
//   let o = {
//     'M+': this.getMonth() + 1, //月份
//     'd+': this.getDate(), //日
//     'h+': this.getHours(), //小时
//     'm+': this.getMinutes(), //分
//     's+': this.getSeconds(), //秒
//     'q+': Math.floor((this.getMonth() + 3) / 3), //季度
//     S: this.getMilliseconds() //毫秒
//   };

//   if (/(y+)/.test(fmt)) {
//     fmt = fmt.replace(RegExp.$1, String(this.getFullYear()).substr(4 - RegExp.$1.length));
//   }
//   for (let k in o) {
//     if (new RegExp('(' + k + ')').test(fmt)) {
//       fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(String(o[k]).length));
//     }
//   }
//   return fmt;
// };

// //格式化日期
// export function formatDate(nS, format) {
//   //日期格式化
//   if (!nS) {
//     return '';
//   }
//   format = format || 'yyyy-MM-dd hh:mm:ss';
//   return new Date(nS).format(format);
// }

//验证手机号码
export function checkPhone(phone) {
  return Boolean(/^1[3578]\d{9}$/.test(phone));
}

//验证密码
export function checkPassword(pwd) {
  return Boolean(/^[a-z0-9_-]{6,16}$/.test(pwd));
}

//验证验证吗
export function checkVerify(code) {
  return Boolean(/^\d{4}$/.test(code));
}

//去除字符串左右两边的空格
export function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '');
}

//类似于findIndex
Array.prototype.indexOfArr = function(obj) {
  let res = -1;

  this.filter(function(e, i) {
    let keys = '';

    for (let key in obj) {
      keys = key;
    }
    if (obj[keys] == e[keys]) {
      res = i;
    }
  });
  return res;
};

//重写findIndex(某些手机不支持findIndex)
Array.prototype.findIndex = function(func) {
  let result = -1;

  this.forEach((item, index) => {
    var flag = func(item);

    if (flag) {
      result = index;
    }
  });
  return result;
};

//生成随机字符串 @randomFlag是否生成确定长度的字符串
export function randomWord(randomFlag, min, max) {
  var str = '',
    pos,
    range = min,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}

//时间倒计时格式 返回结果 [天数，时分秒，是否结束]
export function countDown(time) {
  if (!time || time < 0) {
    return [0, '00:00:00', 0];
  }
  var d = Math.floor(time / 60 / 60 / 24);
  var h = Math.floor((time / 60 / 60) % 24);
  var m = Math.floor((time / 60) % 60);
  var s = time % 60;

  if (h < 10) {
    h = '0' + h;
  }
  if (m < 10) {
    m = '0' + m;
  }
  if (s < 10) {
    s = '0' + s;
  }
  return [d, h + ':' + m + ':' + s, 1];
}

window.console.print = function(e) {
  let custom = store.getters.custom;

  custom.console.push(e);
  store._actions._custom[0](custom);
};

export function formatDate(time, type) {
  let format = '';
  let data = '';

  if (time) {
    data = new Date(parseInt(time));
  } else {
    data = new Date();
  }

  var o = {
    'M+': data.getMonth() + 1, //月份
    'd+': data.getDate(), //日
    'h+': data.getHours(), //小时
    'm+': data.getMinutes(), //分
    's+': data.getSeconds() //秒
  };

  format = type == 1 ? 'hh:mm:ss' : type == 2 ? 'yyyy-MM-dd' : type == 3 ? 'yyyy-MM-dd hh:mm:ss' : type == 4 ? 'yyyy-MM' : type == 5 ? 'MM' : type == 6 ? 'yyyy' : type == 7 ? 'hh:mm' : type == 8 ? 'yyyyMMdd' : 'yyyy-MM-dd hh:mm';

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (data.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return format;
}

/**
 * 2019-1-20 �켣�ط��࣬By:zz
 * ά�Z���������Ƽ����޹�˾
 */
//��չMarker���ýǶ���
(function() {
  // save these original methods before they are overwritten
  var proto_initIcon = L.Marker.prototype._initIcon;
  var proto_setPos = L.Marker.prototype._setPos;

  var oldIE = L.DomUtil.TRANSFORM === 'msTransform';

  L.Marker.addInitHook(function() {
    var iconOptions = this.options.icon && this.options.icon.options;
    var iconAnchor = iconOptions && this.options.icon.options.iconAnchor;
    if (iconAnchor) {
      iconAnchor = iconAnchor[0] + 'px ' + iconAnchor[1] + 'px';
    }
    this.options.rotationOrigin = this.options.rotationOrigin || iconAnchor || 'center center';
    this.options.rotationAngle = this.options.rotationAngle || 0;

    // Ensure marker keeps rotated during dragging
    this.on('drag', function(e) {
      e.target._applyRotation();
    });
  });

  L.Marker.include({
    _initIcon: function() {
      proto_initIcon.call(this);
    },

    _setPos: function(pos) {
      proto_setPos.call(this, pos);
      this._applyRotation();
    },

    _applyRotation: function() {
      if (this.options.rotationAngle) {
        this._icon.style[L.DomUtil.TRANSFORM + 'Origin'] = this.options.rotationOrigin;

        if (oldIE) {
          // for IE 9, use the 2D rotation
          this._icon.style[L.DomUtil.TRANSFORM] = 'rotate(' + this.options.rotationAngle + 'deg)';
        } else {
          // for modern browsers, prefer the 3D accelerated version
          this._icon.style[L.DomUtil.TRANSFORM] += ' rotateZ(' + this.options.rotationAngle + 'deg)';
        }
      }
    },

    setRotationAngle: function(angle) {
      this.options.rotationAngle = angle;
      this.update();
      return this;
    },

    setRotationOrigin: function(origin) {
      this.options.rotationOrigin = origin;
      this.update();
      return this;
    }
  });
})();

//����·���ƶ�Marker
L.interpolatePosition = function(p1, p2, duration, t) {
  var k = t / duration;
  k = k > 0 ? k : 0;
  k = k > 1 ? 1 : k;
  return L.latLng(p1.lat + k * (p2.lat - p1.lat), p1.lng + k * (p2.lng - p1.lng));
};

L.Marker.MovingMarker = L.Marker.extend({
  statics: {
    notStartedState: 0,
    endedState: 1,
    pausedState: 2,
    runState: 3
  },

  options: {
    autostart: false,
    loop: false
  },

  initialize: function(latlngs, durations, options) {
    L.Marker.prototype.initialize.call(this, latlngs[0], options);

    this._latlngs = latlngs.map(function(e, index) {
      return L.latLng(e);
    });

    this._durations = durations;
    this._currentDuration = 0;
    this._currentIndex = 0;

    this._state = L.Marker.MovingMarker.notStartedState;
    this._startTime = 0;
    this._startTimeStamp = 0;
    this._pauseStartTime = 0;
    this._animId = 0;
    this._animRequested = false;
    this._currentLine = [];
  },

  isRunning: function() {
    return this._state === L.Marker.MovingMarker.runState;
  },

  isEnded: function() {
    return this._state === L.Marker.MovingMarker.endedState;
  },

  isStarted: function() {
    return this._state !== L.Marker.MovingMarker.notStartedState;
  },

  isPaused: function() {
    return this._state === L.Marker.MovingMarker.pausedState;
  },

  start: function() {
    if (this.isRunning()) {
      return;
    }

    if (this.isPaused()) {
      this.resume();
    } else {
      this._loadLine(0);
      this._startAnimation();
      this.fire('start');
    }
  },

  resume: function() {
    if (!this.isPaused()) {
      return;
    }
    this._currentLine[0] = this.getLatLng();
    this._currentDuration -= this._pauseStartTime - this._startTime;
    this._startAnimation();
  },

  addLatLng: function(latlng, duration) {
    this._latlngs.push(L.latLng(latlng));
    this._durations.push(duration);
  },

  moveTo: function(latlng, duration) {
    this._stopAnimation();
    this._latlngs = [this.getLatLng(), L.latLng(latlng)];
    this._durations = [duration];
    this._state = L.Marker.MovingMarker.notStartedState;
    this.start();
    this.options.loop = false;
  },

  addStation: function(pointIndex, duration) {
    if (pointIndex > this._latlngs.length - 2 || pointIndex < 1) {
      return;
    }
    var t = this._latlngs[pointIndex];
    this._latlngs.splice(pointIndex + 1, 0, t);
    this._durations.splice(pointIndex, 0, duration);
  },

  _startAnimation: function() {
    this._startTime = Date.now();
    this._state = L.Marker.MovingMarker.runState;
    this._animId = L.Util.requestAnimFrame(
      function(timestamp) {
        this._startTimeStamp = timestamp;
        this._animate(timestamp);
      },
      this,
      true
    );
    this._animRequested = true;
  },

  _resumeAnimation: function() {
    if (!this._animRequested) {
      this._animId = L.Util.requestAnimFrame(
        function(timestamp) {
          this._animate(timestamp);
        },
        this,
        true
      );
    }
  },

  _stopAnimation: function() {
    if (this._animRequested) {
      L.Util.cancelAnimFrame(this._animId);
      this._animRequested = false;
    }
  },

  _loadLine: function(index) {
    this._currentIndex = index;
    this._currentDuration = this._durations[index];
    this._currentLine = this._latlngs.slice(index, index + 2);
  },

  _updateLine: function(timestamp) {
    var elapsedTime = timestamp - this._startTimeStamp;

    if (elapsedTime <= this._currentDuration) {
      return elapsedTime;
    }

    var lineIndex = this._currentIndex;
    var lineDuration = this._currentDuration;

    while (elapsedTime > lineDuration) {
      elapsedTime -= lineDuration;
      lineIndex++;

      if (lineIndex >= this._latlngs.length - 1) {
        if (this.options.loop) {
          lineIndex = 0;
          this.fire('loop', {
            elapsedTime: elapsedTime
          });
        } else {
          this.setLatLng(this._latlngs[this._latlngs.length - 1]);
          this.stop(elapsedTime);
          return null;
        }
      }
      lineDuration = this._durations[lineIndex];
    }

    this._loadLine(lineIndex);
    this._startTimeStamp = timestamp - elapsedTime;
    this._startTime = Date.now() - elapsedTime;
    return elapsedTime;
  },

  _animate: function(timestamp, noRequestAnim) {
    var elapsedTime;
    this._animRequested = false;
    elapsedTime = this._updateLine(timestamp);

    if (elapsedTime === null) {
      return;
    }
    var p = L.interpolatePosition(this._currentLine[0], this._currentLine[1], this._currentDuration, elapsedTime);
    debugger;
    var angle = this.getAngle(this._latlng.lng, this._latlng.lat, p.lng, p.lat);
    console.log(angle);
    this.setLatLng(p);
    debugger;
    this.setRotationAngle(angle);

    if (!noRequestAnim) {
      this._animId = L.Util.requestAnimFrame(this._animate, this, false);
      this._animRequested = true;
    }
  },
  getAngle: function(startx, starty, endx, endy) {
    var tan = 0;
    if (endx == startx) {
      tan = 90;
    } else {
      tan = (Math.atan(Math.abs((endy - starty) / (endx - startx))) * 180) / Math.PI;
    }

    if (endx >= startx && endy >= starty) {
      //��һ����
      return -tan;
    } else if (endx > startx && endy < starty) {
      //��������
      return tan;
    } else if (endx < startx && endy > starty) {
      //�ڶ�����
      return tan - 180;
    } else {
      return 180 - tan; //��������
    }
  },
  onAdd: function(map) {
    L.Marker.prototype.onAdd.call(this, map);

    if (this.options.autostart && !this.isStarted()) {
      this.start();
      return;
    }

    if (this.isRunning()) {
      this._resumeAnimation();
    }
  },

  onRemove: function(map) {
    L.Marker.prototype.onRemove.call(this, map);
    this._stopAnimation();
  },

  pause: function() {
    if (!this.isRunning()) {
      return;
    }

    this._pauseStartTime = Date.now();
    this._state = L.Marker.MovingMarker.pausedState;
    this._stopAnimation();
    this._animate(this._startTimeStamp + (this._pauseStartTime - this._startTime), true);
  },

  stop: function(elapsedTime) {
    if (this.isEnded()) {
      return;
    }

    this._stopAnimation();

    if (typeof elapsedTime === 'undefined') {
      elapsedTime = 0;
      this._animate(this._startTimeStamp + (Date.now() - this._startTime), true);
    }

    this._state = L.Marker.MovingMarker.endedState;
    this.fire('end', {
      elapsedTime: elapsedTime
    });
  }
});
export function movingMarker(latlngs, duration, options) {
  return new L.Marker.MovingMarker(latlngs, duration, options);
}
// L.Marker.movingMarker = function(latlngs, duration, options) {
//   return new L.Marker.MovingMarker(latlngs, duration, options);
// };
