<template>
    <div class="left-box">
        <div class="logo">
            <img src="/static/images/logo.png" />
        </div>
        <el-menu class="sidebar" :unique-opened="true" :default-active="currentPagePath" @open="handleOpen" :router="true"
            theme="dark" @close="handleClose">
            <el-menu-item index="/dashboard">
                <i class="fa fa-tachometer"></i>
                <span>{{ $t('backstage_home') }}</span>
            </el-menu-item>
            <el-sub-menu index="goods">
                <template #title>
                    <i class="fa fa-product-hunt"></i>
                    <span>{{ $t('product_management') }}</span>
                </template>
                <el-menu-item index="/dashboard/goods">
                    <i class="fa fa-circle"></i>
                    <span>{{ $t('product_list') }}</span>
                </el-menu-item>
                <el-menu-item index="/dashboard/category">
                    <i class="fa fa-circle"></i>
                    <span>{{ $t('product_category') }}</span>
                </el-menu-item>
                <el-menu-item index="/dashboard/brand">
                    <i class="fa fa-circle"></i>
                    <span>{{ $t('brand_management') }}</span>
                </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="order">
                <template #title>
                    <i class="fa fa-large fa-truck"></i>{{ $t('order_center') }}
                </template>
                <el-menu-item index="/dashboard/order">
                    <i class="fa fa-circle"></i>
                    <span>{{ $t('order_list') }}</span>
                </el-menu-item>
                <!--<el-menu-item index="/dashboard/order/detail">-->
                <!--<i class="fa fa-circle"></i>-->
                <!--<span>{{ $t('shipping_order') }}</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="/dashboard/order/detail">-->
                <!--<i class="fa fa-circle"></i>-->
                <!--<span>{{ $t('return_exchange') }}</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="/dashboard/order/detail">-->
                <!--<i class="fa fa-circle"></i>-->
                <!--<span>{{ $t('order_evaluation') }}</span>-->
                <!--</el-menu-item>-->
            </el-sub-menu>
            <el-sub-menu index="operate">
                <template #title>
                    <i class="fa fa-large fa-truck"></i>
                    <span>{{ $t('store_operation') }}</span>
                </template>
                <el-menu-item index="/dashboard/operate/topic">
                    <i class="fa fa-circle"></i>
                    <span>{{ $t('topic_management') }}</span>
                </el-menu-item>
            </el-sub-menu>
            <!--<el-sub-menu index="total">-->
            <!--<template #title>-->
            <!--<i class="fa fa-large fa-line-chart"></i>-->
            <!--<span>{{ $t('statistics') }}</span>-->
            <!--</template>-->
            <!--<el-menu-item index="/dashboard/total">-->
            <!--<i class="fa fa-circle"></i>-->
            <!--<span>{{ $t('order_list') }}</span>-->
            <!--</el-menu-item>-->
            <!--</el-sub-menu>-->
            <el-sub-menu index="user">
                <template #title>
                    <i class="fa fa-large fa-users"></i>
                    <span>{{ $t('member_management') }}</span>
                </template>
                <el-menu-item index="/dashboard/user">
                    <i class="fa fa-circle"></i>
                    <span>{{ $t('member_list') }}</span>
                </el-menu-item>
            </el-sub-menu>
            <!--<el-sub-menu index="setting">-->
            <!--<template #title>-->
            <!--<i class="fa fa-large fa-wrench"></i>-->
            <!--<span>{{ $t('store_settings') }}</span>-->
            <!--</template>-->
            <!--<el-menu-item index="/dashboard/setting">-->
            <!--<i class="fa fa-circle"></i>-->
            <!--<span>{{ $t('store_information') }}</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="/dashboard/setting/s">-->
            <!--<i class="fa fa-circle"></i>-->
            <!--<span>{{ $t('wechat_settings') }}</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="/dashboard/setting/a">-->
            <!--<i class="fa fa-circle"></i>-->
            <!--<span>{{ $t('home_page_setting') }}</span>-->
            <!--</el-menu-item>-->
            <!--</el-sub-menu>-->
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentPagePath: '/dashboard'
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        hasOwn() {
        }
    },
    mounted() {
        console.log(this.$route.path);
    }
}
</script>

<style>
.left-box {
    width: 200px;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    height: 100%;
    float: left;
    flex-direction: column;
    background: #324157;
}

.left-box .sidebar {
    width: 200px;
    flex: 1;
    border-radius: 0;
    background: #324157;
}

.left-box .fa {
    margin-right: 10px;
    font-size: 18px;
}

.left-box .el-sub-menu .el-menu-item .fa {
    margin-right: 10px;
    font-size: 10px;
}

.left-box .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .5);
}

.left-box .logo img {
    height: 40px;
}
</style>