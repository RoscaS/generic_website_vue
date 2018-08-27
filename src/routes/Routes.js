import axios from 'axios';
import VueRouter from "vue-router";

axios.defaults.baseURL = 'http://localhost:8000/';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'public',
      component: require('./Public.vue').default,
    },
    {
      path: '/login',
      mane: 'login',
      component: require('./Login').default,
    },
  ]
});

export default router;
