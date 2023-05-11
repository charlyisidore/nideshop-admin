<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ name: 'dashboard' }">{{ $t('home_page') }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ $t('product_management') }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ infoForm.id ? $t('editorial_categories') : $t('add_category') }}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operation-nav">
                <el-button type="primary" @click="goBackPage">
                    <el-icon><ArrowLeft /></el-icon>
                    {{ $t('back_to_list') }}
                </el-button>
            </div>
        </div>
        <div class="content-main">
            <div class="form-table-box">
                <el-form ref="infoForm" :rules="infoRules" :model="infoForm" label-width="120px">
                    <el-form-item :label="$t('higher_categories')" prop="name">
                        <el-select v-model="infoForm.parent_id" :placeholder="$t('please_select_a_higher_category')">
                            <el-option v-for="item in parentCategory" :key="item.id" :label="item.name"
                                :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('category_name')" prop="name">
                        <el-input v-model="infoForm.name"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('short_introduction')" prop="front_name">
                        <el-input type="textarea" v-model="infoForm.front_name" :rows="1"></el-input>
                        <div class="form-tip"></div>
                    </el-form-item>
                    <el-form-item :label="$t('icon')" prop="wap_banner_url">
                        <el-upload class="image-uploader" name="wap_banner_pic"
                            action="http://127.0.0.1:8360/admin/upload/categoryWapBannerPic" :show-file-list="false"
                            :on-success="handleUploadImageSuccess" :headers="uploaderHeader">
                            <img v-if="infoForm.wap_banner_url" :src="infoForm.wap_banner_url" class="image-show">
                            <i v-else class="el-icon-plus image-uploader-icon"></i>
                        </el-upload>
                        <div class="form-tip">{{ $t('category_image_size_requirement') }}</div>
                    </el-form-item>
                    <el-form-item :label="$t('sort')">
                        <el-input-number v-model="infoForm.sort_order" :min="1" :max="1000"></el-input-number>
                    </el-form-item>
                    <el-form-item :label="$t('enable')">
                        <el-switch v-model="infoForm.is_show"></el-switch>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmitInfo">{{ $t('ok_to_save') }}</el-button>
                        <el-button @click="goBackPage">{{ $t('cancel') }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { ArrowLeft } from '@element-plus/icons-vue';
import api from '@/config/api';
export default {
    data() {
        return {
            uploaderHeader: {
                'X-Nideshop-Token': localStorage.getItem('token') || '',
            },
            parentCategory: [
                {
                    id: 0,
                    name: this.$t('top_category')
                }
            ],
            infoForm: {
                id: 0,
                name: "",
                parent_id: 0,
                front_name: '',
                wap_banner_url: '',
                sort_order: 100,
                is_show: true,
            },
            infoRules: {
                name: [
                    { required: true, message: this.$t('please_enter_the_name'), trigger: 'blur' },
                ],
                front_name: [
                    { required: true, message: this.$t('please_enter_profile'), trigger: 'blur' },
                ],
                wap_banner_url: [
                    { required: true, message: this.$t('please_select_category_picture'), trigger: 'blur' },
                ],
            },
        }
    },
    methods: {
        goBackPage() {
            this.$router.go(-1);
        },
        onSubmitInfo() {
            this.$refs['infoForm'].validate((valid) => {
                if (valid) {
                    this.axios.post('category/store', this.infoForm).then((response) => {
                        if (response.data.errno === 0) {
                            this.$message({
                                type: 'success',
                                message: this.$t('saved_successfully')
                            });
                            this.$router.go(-1)
                        } else {
                            this.$message({
                                type: 'error',
                                message: this.$t('save_failed')
                            })
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        handleUploadImageSuccess(res, file) {
            if (res.errno === 0) {
                switch (res.data.name) {
                    // 分类图片
                    // Category picture
                    case 'wap_banner_url':
                        //              this.$set('infoForm.wap_banner_url', res.data.fileUrl);
                        this.infoForm.wap_banner_url = res.data.fileUrl;
                        break;
                }
            }
        },
        getTopCategory() {
            this.axios.get('category/topCategory').then((response) => {
                this.parentCategory = this.parentCategory.concat(response.data.data);
            })
        },
        getInfo() {
            if (this.infoForm.id <= 0) {
                return false
            }

            // 加载分类详情
            // Load category details
            let that = this
            this.axios.get('category/info', {
                params: {
                    id: that.infoForm.id
                }
            }).then((response) => {
                let resInfo = response.data.data;
                resInfo.is_show = resInfo.is_show ? true : false;
                that.infoForm = resInfo;
            })
        }

    },
    components: {
        ArrowLeft,
    },
    mounted() {
        this.getTopCategory();
        this.infoForm.id = this.$route.query.id || 0;
        this.getInfo();
    }
}
</script>

<style>
.image-uploader {
    height: 105px;
}

.image-uploader .el-upload {
    border: 1px solid #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.image-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.image-uploader .image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    min-width: 105px;
    height: 105px;
    line-height: 105px;
    text-align: center;
}

.image-uploader .image-show {
    min-width: 105px;
    height: 105px;
    display: block;
}
</style>
