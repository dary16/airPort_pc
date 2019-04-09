import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import components from './components';
import router from './router';
import store from './store';
import filters from './utils/filters';
import * as util from './utils';
import ElementUI from 'element-ui';
import * as cmtWsClientHelper from './utils/cmtWsClientHelper';
import * as callbackFn from './utils/callbackPage';
import './utils/directives';

// element ui
Vue.use(ElementUI);
Vue.prototype.notify = ElementUI.Notification;
Vue.prototype.message = ElementUI.Message;
Vue.prototype.oMsgBox = ElementUI.MessageBox;

// 全局
Vue.prototype.util = util;
Vue.prototype.callback = callbackFn.callbackHandlerFn();
Vue.prototype.cmtWsClient = cmtWsClientHelper.cmtWsClientFn();

// 自定义组件格式，全局可用
Object.keys(components).forEach(key => {
  // 首字母大写
  var name = key.replace(/(\w)/, v => v.toUpperCase());

  //使用标签时前缀需要加 v- 以示区别
  Vue.component(`v${name}`, components[key]);
});

Vue.config.productionTip = false;

//创建vue实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root');
