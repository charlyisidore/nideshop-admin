<template>
    <div class="content-page">
        <div class="content-nav">
            <div class="breadcrumb">
                订单详情
            </div>
            <div class="operation-nav">
                <el-button type="primary" @click="goBackPage" size="small">
                    <el-icon><ArrowLeft /></el-icon>
                    {{ $t('back_to_list') }}
                </el-button>
            </div>
        </div>
        <div class="content-main">
            <div class="form-table-box" v-loading="pageLoading" :element-loading-text="$t('desperately_loading')">

            </div>
        </div>
    </div>
</template>

<script>
import { ArrowLeft } from '@element-plus/icons-vue';
export default {
    data() {
        return {
            pageLoading: false,
            infoForm: {
                id: 0,
            }
        }
    },
    methods: {
        goBackPage() {
            this.$router.go(-1);
        },
        getInfo() {
            if (this.infoForm.id <= 0) {
                return false
            }

            // 加载品牌详情
            // Load Brand Details
            let that = this
            this.axios.get('http://127.0.0.1:8360/admin/brand/info', {
                params: {
                    id: that.infoForm.id
                }
            }).then((response) => {
                console.log(response.data);
                let resInfo = response.data.data;
                that.infoForm = resInfo;
                this.pageLoading = false;
            })
        }

    },
    components: {
        ArrowLeft,
    },
    mounted() {
        console.log(this.$route.query)
        this.infoForm.id = this.$route.query.id || 0;
        this.getInfo();
    }
}
</script>

<style></style>
