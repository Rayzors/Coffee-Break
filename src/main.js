import Vue from 'vue';
import Fragment from 'vue-fragment';
import App from './App.vue';
import router from './router';
import utils from './utils.js';
import './registerServiceWorker';

Vue.use(Fragment.Plugin);
Vue.config.productionTip = false;

Vue.mixin({ methods: { ...utils } });

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
