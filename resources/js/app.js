import './bootstrap';
import '../css/app.css'; 

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

import App from '../src/App.vue'

// createApp(App).mount('#app');

const app = createApp(App)

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

app.use(vuetify)
app.mount('#app')
