<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ path: '/dashboard' }">{{ $t('backstage_home') }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content-main">

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false
        }
    },
    components: {

    },
}
</script>

<style scoped></style>
