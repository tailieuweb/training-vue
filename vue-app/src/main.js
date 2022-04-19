import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import { createPopper } from '@popperjs/core';
import axios from "axios";
import VueAxios from "vue-axios";

import {store} from "./store/index";

// Vue.use(createPopper);
export const EventBus = new Vue();

Vue.use(VueAxios, axios);

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')