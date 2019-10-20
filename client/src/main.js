import Vue from 'vue';
import App from './App.vue';
import TailwindUI from './plugins/TailwindUI';

Vue.config.productionTip = false;

// TODO Task-3: notice that you have to import the library before use it :D
Vue.use(TailwindUI);

new Vue({
  render: h => h(App)
}).$mount('#app');
