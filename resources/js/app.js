import './bootstrap';

import Vue from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue'
import { InertiaProgress } from '@inertiajs/progress'
import vuetify from './Plugins/vuetify'
import { Link } from "@inertiajs/inertia-vue";
import store from './store'

InertiaProgress.init({ color: "#4B5563" })
createInertiaApp({
    title: title => `${title} - Addy.Dental`,
    resolve: name => import(`./Pages/${name}`),
    setup({ el, App, props, plugin }) {
        Vue.use(plugin)
        Vue.prototype.$route = route
        Vue.component("Link", Link);
        Vue.mixin({ methods: { route: window.route } });


        new Vue({
            vuetify,
            store,
            render: h => h(App, props),
        }).$mount(el)
    },
})
