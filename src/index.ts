import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import { addPolyfill } from "./ie_polyfill/index";
import { store } from './store/store';
import Main from './component/main.vue';
// add polyfill
addPolyfill();

// Configure vue setting
Vue.use(Vuetify, {
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
});

// Initiate vue app
var vueApp = new Vue({
    el: '#app',
    store: store,
    render: h => h(Main)
});
