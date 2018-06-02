import Vue from 'vue';
import Main from './component/main.vue';
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.min.css";
import VueClipboard from "vue-clipboard";

// Configure vue setting
Vue.use(BootstrapVue);
Vue.use(VueClipboard);

Vue.config.keyCodes.f5 = 116;

// Initiate vue app
var vue_app = new Vue({
    el: '#app',
    render: h => h(Main)
});
