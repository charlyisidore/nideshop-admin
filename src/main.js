import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'zh',
    messages: {
        en: await import('./locales/en.json'),
        zh: await import('./locales/zh.json'),
    },
})

router.beforeEach((to, from, next) => {
	let token = localStorage.getItem('token') || '';

	// 配置接口信息
	// Configure interface information
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
app.use(i18n)
app.use(router)

app.mount('#app')