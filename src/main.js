import { createApp } from 'vue'

import { createVuetify } from "vuetify";
import 'vuetify/styles'
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import '@mdi/font/css/materialdesignicons.css';

import router from './router'

import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.vue'

const vuetify = createVuetify({
    components,
    directives
});

createApp(App).use(router).use(vuetify).mount('#app');
