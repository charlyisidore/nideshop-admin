import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import axios from 'axios'
import ElementPlus from 'element-plus'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'

const app = createApp(App)

router.beforeEach((to, from, next) => {
	let token = localStorage.getItem('token') || '';

	// 配置接口信息
	axios.defaults.baseURL = 'http://127.0.0.1:8360/admin/';
	axios.defaults.headers.common['X-Nideshop-Token'] = token;

	if (!token && to.name !== 'login') {
		next({
			path: '/login',
			query: { redirect: to.fullPath }
		})
	} else {
		next()
	}
});

app.use(VueAxios, axios)
app.use(ElementPlus)
app.use(router)

app.mount('#app')