import Vue from 'vue';
import App from "./components/app";
import axios from 'axios';
import router from './router/index.js';
import store from './store/index.js';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

// Install BootstrapVue
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

//PROGRESS
require('./plugins/vue-progress.js');
//NOTIFICATION TOAST
require('./plugins/toast.js');

//DEFINE BASE URL FOR API'S
axios.defaults.baseURL = 'http://127.0.0.1:8000';

//SUBSCRIBE
require('./store/subscribe.js');
store.dispatch('auth/registeredFunc', localStorage.getItem('token')).then(() => {
    new Vue({
        store,
        router,
        render: h => h(App)
    }).$mount("#app");
});
