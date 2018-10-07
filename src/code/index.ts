import Vue from 'vue';
import Main from './component/main.vue';
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.min.css";
import { addPolyfill } from "./ie_polyfill/index";

//add polyfill
addPolyfill();

// Configure vue setting
Vue.use(BootstrapVue);

// Initiate vue app
var vue_app = new Vue({
    el: '#app',
    render: h => h(Main)
});
