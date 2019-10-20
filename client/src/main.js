import Vue from 'vue';
import App from './App.vue';
import TailwindUI from './plugins/TailwindUI';

Vue.config.productionTip = false;
Vue.use(TailwindUI);

new Vue({
  render: h => h(App)
}).$mount('#app');
