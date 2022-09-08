// import { Vue } from 'vue'
// import VueRouter from 'vue-router'
import { createWebHistory, createRouter } from "vue-router";
import Dashboard from '../views/Dashboard.vue';
import Home from '../views/Home.vue';

// Vue.use(VueRouter)

// const routes = [
//   // {
//   //   path: '/home',
//   //   name: 'Home',
//   //   component: Home
//   // },
//   {
//     path: '/',
//     name: 'Dashboard',
//     component: Dashboard
//   },
  
// ]

// const router = new VueRouter({
//   mode: 'hash',
//   // base: process.env.BASE_URL,
//   routes
// })

// export default router

const routes = [
  {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
  {
    path: '/home',
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
