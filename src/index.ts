import Vue from 'vue';
import Vuetify from 'vuetify';
import { addPolyfill } from "./ie_polyfill/index";
import { store } from './store/store';
import App from './component/app.vue';
// add polyfill
addPolyfill();

// Configure vue setting
Vue.use(Vuetify, {
    theme: {
        primary: '#928b8b',
        secondary: '#664E44',
        tertiary: '#BB5156',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
    }
});

// Initiate vue app
var vueApp = new Vue({
    el: '#app',
    store: store,
    render: h => h(App)
});
