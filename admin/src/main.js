// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/style/index.scss';
import App from './App';
import router from './router';
import Ajax from './lib/ajax';
import store from './store';
import './icons/index';
import Moment from 'vue-moment';
import elDragDialog from './directive/dialog/index';

import * as filters from './filters' // global filters
Vue.use(Moment);
Vue.use(ElementUI);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(Ajax);

Vue.directive('elDragDialog', elDragDialog);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
