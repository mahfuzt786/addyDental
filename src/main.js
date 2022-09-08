import { createApp } from 'vue'
import App from './App.vue'
// import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

// createApp(App)
//   .use(vuetify)
//   .mount('#app')


import '../resources/js/bootstrap';
// import '../resources/css/app.css'; 

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
// import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

// import App from '../src/App.vue'

const app = createApp(App)

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

import router from './router'
// import store from './store'
// import VueSimpleAlert from "vue-simple-alert"


// app.config.productionTip = false

// app.use(VueSimpleAlert)

app.use(vuetify)
app.use(router)
app.mount('#app')



// new Vue({
//   router,
//   store,
//   vuetify,
//   render: h => h(App)
// }).$mount('#app')


