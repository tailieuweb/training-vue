import Vue from 'vue'
import App from './App.vue'


import 'bootstrap/dist/css/bootstrap.min.css'


import {library} from '@fortawesome/fontawesome-svg-core'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

Vue.use.BootstrapVue;
Vue.config.productionTip = false
library.add(faSpinner)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  render: h => h(App),
}).$mount('#app')
