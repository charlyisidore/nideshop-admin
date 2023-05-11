<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ name: 'dashboard' }">{{ $t('home_page') }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ $t('mall_operation') }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ infoForm.id ? $t('edit_topic') : $t('add_topic') }}</el-breadcrumb-item>
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
                    <el-form-item :label="$t('title')" prop="title">
                        <el-input v-model="infoForm.title"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('sub_title')" prop="subtitle">
                        <el-input type="textarea" v-model="infoForm.subtitle" :rows="3"></el-input>
                        <div class="form-tip"></div>
                    </el-form-item>
                    <el-form-item :label="$t('thumbnails')" prop="scene_pic_url">
                        <el-upload class="image-uploader" name="scene_pic_url"
                            action="http://127.0.0.1:8360/admin/upload/topicThumb" :show-file-list="false"
                            :on-success="handleUploadImageSuccess" :headers="uploaderHeader">
                            <img v-if="infoForm.scene_pic_url" :src="infoForm.scene_pic_url" class="image-show">
                            <i v-else class="el-icon-plus image-uploader-icon"></i>
                        </el-upload>
                        <div class="form-tip">{{ $t('image_750_415_size_requirement') }}</div>
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
            infoForm: {
                id: 0,
                title: "",
                subtitle: '',
                sort_order: 100,
                is_show: true,
                scene_pic_url: ''
            },
            infoRules: {
                title: [
                    { required: true, message: this.$t('please_enter_the_title'), trigger: 'blur' },
                ],
                subtitle: [
                    { required: true, message: this.$t('please_enter_a_subheading'), trigger: 'blur' },
                ],
                scene_pic_url: [
                    { required: true, message: this.$t('please_select_thumbnail'), trigger: 'blur' },
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
                    this.axios.post('topic/store', this.infoForm).then((response) => {
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
                    // 专题图片
                    // Topic picture
                    case 'scene_pic_url':
                        this.infoForm.scene_pic_url = res.data.fileUrl;
                        break;
                }
            }
        },
        getInfo() {
            if (this.infoForm.id <= 0) {
                return false
            }

            // 加载专题详情
            // Load feature details
            let that = this
            this.axios.get('topic/info', {
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
        this.infoForm.id = this.$route.query.id || 0;
        this.getInfo();
        console.log(api)
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
    width: 187px;
    height: 105px;
    line-height: 105px;
    text-align: center;
}

.image-uploader .image-show {
    width: 187px;
    height: 105px;
    display: block;
}

.image-uploader.new-image-uploader {
    font-size: 28px;
    color: #8c939d;
    width: 165px;
    height: 105px;
    line-height: 105px;
    text-align: center;
}

.image-uploader.new-image-uploader .image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 165px;
    height: 105px;
    line-height: 105px;
    text-align: center;
}

.image-uploader.new-image-uploader .image-show {
    width: 165px;
    height: 105px;
    display: block;
}
</style>
