import Vue from 'vue';
import Router from 'vue-router';
import routes from './router';
import {
  getLoc,
  getSen
} from '../utils';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  linkActiveClass: 'is-active',
  routes
});

// 路由拦截
router.beforeEach(function(to, from, next) {
  //   const userInfo = getSen('userInfo') || '';

  //   if (!userInfo.accountId && to.path != '/login') {
  //     return next({ path: '/login' });
  //   } else if (userInfo.accountId && (to.path == '/' || to.path == '/login')) {
  //     return next({ path: '/' });
  //   } else {
  return next();
  //   }
});

export default router;
