// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import inflection from 'inflection';

import App from './App';
import '../semantic/dist/semantic.min';
import '../semantic/dist/semantic.min.css';

Vue.config.productionTip = false;

// Vue.use(require('vue-semantic'));
Vue.use(VueResource);

Vue.filter('singularize', str => inflection.singularize(str));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
