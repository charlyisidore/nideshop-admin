import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: '/',
            name: 'dashboard',
            redirect: '/dashboard'
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: require('@/components/DashboardPage.vue'),
            children: [
                {
                    path: '/',
                    name: 'welcome',
                    component: require('@/components/WelcomePage.vue')
                },
                {
                    path: 'goods',
                    name: 'goods',
                    component: require('@/components/Goods/GoodsPage.vue')
                },
                {
                    path: 'goods/add',
                    name: 'goods_add',
                    component: require('@/components/Goods/GoodsAddPage.vue')
                },
                {
                    path: 'category',
                    name: 'category',
                    component: require('@/components/Category/CategoryPage.vue')
                },
                {
                    path: 'category/add',
                    name: 'category_add',
                    component: require('@/components/Category/CategoryAddPage.vue')
                },
                {
                    path: 'brand',
                    name: 'brand',
                    component: require('@/components/Brand/BrandPage.vue')
                },
                {
                    path: 'brand/add',
                    name: 'brand_add',
                    component: require('@/components/Brand/BrandAddPage.vue')
                },
                {
                    path: 'order',
                    name: 'order',
                    component: require('@/components/Order/OrderPage.vue')
                },
                {
                    path: 'order/detail',
                    name: 'order_detail',
                    component: require('@/components/Order/OrderDetailPage.vue')
                },
                {
                    path: 'operate/topic',
                    name: 'topic',
                    component: require('@/components/Topic/TopicPage.vue')
                },
              {
                path: 'operate/topic/add',
                name: 'topic_add',
                component: require('@/components/Topic/TopicAddPage.vue')
              },
              {
                path: 'user',
                name: 'user',
                component: require('@/components/User/UserPage.vue')
              },
              {
                path: 'user/add',
                name: 'user_add',
                component: require('@/components/User/UserAddPage.vue')
              },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: require('@/components/LoginPage.vue')
        },
        {
            path: '*',
            redirect: '/dashboard'
        }
    ]
})
