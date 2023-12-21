
import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import ImageUploader from 'vue-image-upload-resize'
import {UploaderPlugin} from "@syncfusion/ej2-vue-inputs/dist/es6/ej2-vue-inputs.es5";
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

window.Vue = Vue;
Vue.use(VueRouter);
Vue.use(ImageUploader);
Vue.use(UploaderPlugin);
Vue.use(Vuetify);

window.axios = axios;
window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}