<style scoped>
body {
    background: #f5f7fa;
    display: block;
}

.container {
    height: 100%;
    width: 100%;
}

.content {
    box-sizing: border-box;
    padding: 70px 20px 20px 220px;
    min-height: 700px;
    overflow: auto;
}

.footer {
    margin-top: 10px;
    text-align: center;
    line-height: 30px;
    color: #999;
    display: block;
}
</style>

<template>
    <div class="container">
        <sidebar></sidebar>
        <navbar></navbar>
        <div class="content">
            <router-view v-slot="{ Component }">
                <transition name="router-fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
            <a class="footer" href="https://github.com/tumobi" target="_blank"> nideshop created by tumobi</a>
        </div>
    </div>
</template>

<script>
import Sidebar from './Common/Sidebar.vue';
import Navbar from './Common/Navbar.vue';

export default {
    data() {
        return {
            dialogVisible: false
        }
    },
    components: {
        Sidebar,
        Navbar
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
}
</script>
