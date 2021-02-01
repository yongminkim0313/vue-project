/*!

=========================================================
* Vue Argon Design System - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from "vue";
import App from "./App.vue";
import router from "./starterRouter";
// import router from "./router";
import Argon from "./plugins/argon-kit";
import './registerServiceWorker'
import Axios from "axios";
import VueAxios from "vue-axios";
import Chat from 'vue-beautiful-chat'
import vmodal from 'vue-js-modal';

Vue.use(vmodal, { dialog: true })
Vue.use(Chat)

Vue.config.productionTip = false;
Vue.use(Argon);
Vue.use(VueAxios, Axios);

Axios.defaults.baseURL = 'http://localhost:3000';
Axios.defaults.timeout = 2000;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");