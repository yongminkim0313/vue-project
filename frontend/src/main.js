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
import VueAWN from "vue-awesome-notifications"
import App from "./App.vue";
//import router from "./starterRouter";
import router from "./router";
import Argon from "./plugins/argon-kit";
import './registerServiceWorker'
import Axios from "axios";
import VueAxios from "vue-axios";
import Chat from 'vue-beautiful-chat'
import vmodal from 'vue-js-modal';
import io from "socket.io-client";
import vuetify from './plugins/vuetify';

const socket = io(process.env.VUE_APP_SOCKET_URL, {
    path: "/msg/",
});
Vue.prototype.$socket = socket;

Vue.use(vmodal, { dialog: true })
Vue.use(Chat)
Vue.use(VueAWN, {})

Vue.config.productionTip = false;
Vue.use(Argon);
Vue.use(VueAxios, Axios);

Axios.defaults.baseURL = 'http://localhost:3000';
Axios.defaults.timeout = 2000;

const vue = new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount("#app");

// 응답 인터셉터 추가
Axios.interceptors.response.use(
    function(response) { // 응답 데이터를 가공
        vue.$awn.alert('OK');
        return response;
    },
    function(error) { // 오류 응답을 처리
        var errorStatus = error.response.status;

        if (errorStatus == '400') vue.$awn.alert(error.response.data);
        if (errorStatus == '401') vue.$awn.alert('인증에 실패했습니다.');
        if (errorStatus == '403') vue.$awn.alert('권한이 없습니다.');
        if (errorStatus == '500') vue.$awn.alert('서버에서 오류가 발생하였습니다.');
        return Promise.reject(error);
    }
);