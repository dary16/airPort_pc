import Vue from 'vue';
import * as util from './index';

//时间
//type   1: [12:40:30]   2:[2017-12-12]   3:[2017-12-12 12:40]  4:[2017-12-12 12:40:30]
Vue.filter('date', function(val, type) {
  let newDate = '';
  // if(val && !isNaN(val)) {
  if (val) {
    newDate = util.formatDate(val, type);
  } else {
    newDate = '';
  }
  return newDate;
});
