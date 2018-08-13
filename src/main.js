import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import {library} from '@fortawesome/fontawesome-svg-core'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(solid);
library.add(regular);
library.add(brands);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
