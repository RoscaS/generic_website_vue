import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Callback from './views/Callback';
import Login from './views/Login';

Vue.use(Router);

// const router = new Router({
export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
		},
		{
			path: '/callback',
			name: 'callback',
			component: Callback,
		}
	]
})

