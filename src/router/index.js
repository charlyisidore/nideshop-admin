import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            name: 'dashboard',
            redirect: '/dashboard'
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('@/components/DashboardPage.vue'),
            children: [
                {
                    path: '/',
                    name: 'welcome',
                    component: () => import('@/components/WelcomePage.vue')
                },
                {
                    path: 'goods',
                    name: 'goods',
                    component: () => import('@/components/Goods/GoodsPage.vue')
                },
                {
                    path: 'goods/add',
                    name: 'goods_add',
                    component: () => import('@/components/Goods/GoodsAddPage.vue')
                },
                {
                    path: 'category',
                    name: 'category',
                    component: () => import('@/components/Category/CategoryPage.vue')
                },
                {
                    path: 'category/add',
                    name: 'category_add',
                    component: () => import('@/components/Category/CategoryAddPage.vue')
                },
                {
                    path: 'brand',
                    name: 'brand',
                    component: () => import('@/components/Brand/BrandPage.vue')
                },
                {
                    path: 'brand/add',
                    name: 'brand_add',
                    component: () => import('@/components/Brand/BrandAddPage.vue')
                },
                {
                    path: 'order',
                    name: 'order',
                    component: () => import('@/components/Order/OrderPage.vue')
                },
                {
                    path: 'order/detail',
                    name: 'order_detail',
                    component: () => import('@/components/Order/OrderDetailPage.vue')
                },
                {
                    path: 'operate/topic',
                    name: 'topic',
                    component: () => import('@/components/Topic/TopicPage.vue')
                },
                {
                    path: 'operate/topic/add',
                    name: 'topic_add',
                    component: () => import('@/components/Topic/TopicAddPage.vue')
                },
                {
                    path: 'user',
                    name: 'user',
                    component: () => import('@/components/User/UserPage.vue')
                },
                {
                    path: 'user/add',
                    name: 'user_add',
                    component: () => import('@/components/User/UserAddPage.vue')
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/components/LoginPage.vue')
        },
        {
            path: '/.*',
            redirect: '/dashboard'
        }
    ]
})

export default router