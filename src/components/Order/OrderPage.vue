<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ path: '/dashboard' }">{{ $t('home_page') }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ $t('order_center') }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ $t('order_list') }}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operation-nav">
                <router-link to="/dashboard/order/add">
                    <el-button type="primary">
                        <el-icon><Plus /></el-icon>
                        {{ $t('add_order') }}
                    </el-button>
                </router-link>
            </div>
        </div>
        <div class="content-main">
            <div class="filter-box">
                <el-form :inline="true" :model="filterForm" class="demo-form-inline">
                    <el-form-item :label="$t('order_number')">
                        <el-input v-model="filterForm.order_sn" :placeholder="$t('please_enter_order_number')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('consignee')">
                        <el-input v-model="filterForm.consignee" :placeholder="$t('please_enter_the_consignee')"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmitFilter">{{ $t('inquiry') }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="form-table-box">
                <el-table :data="tableData" style="width: 100%" border stripe>
                    <el-table-column prop="id" label="ID" width="100">
                    </el-table-column>
                    <el-table-column prop="order_sn" :label="$t('order_number')">
                    </el-table-column>
                    <el-table-column prop="add_time" :label="$t('order_time')">
                    </el-table-column>
                    <el-table-column prop="consignee" :label="$t('consignee')">
                    </el-table-column>
                    <el-table-column prop="actual_price" :label="$t('order_amount')">
                    </el-table-column>
                    <el-table-column prop="order_status_text" :label="$t('order_status')">
                    </el-table-column>
                    <el-table-column :label="$t('operation')" width="140">
                        <template #default="scope">
                            <el-button size="small" @click="handleRowEdit(scope.$index, scope.row)">{{ $t('view') }}</el-button>
                            <el-button size="small" type="danger"
                                @click="handleRowDelete(scope.$index, scope.row)">{{ $t('delete_action') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="page-box">
                <el-pagination @current-change="handlePageChange" :current-page="page" :page-size="10"
                    layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { Plus } from '@element-plus/icons-vue';
export default {
    data() {
        return {
            page: 1,
            total: 0,
            filterForm: {
                name: ''
            },
            tableData: []
        }
    },
    methods: {
        handlePageChange(val) {
            this.page = val;
            // 保存到localStorage
            // Save to localStorage
            localStorage.setItem('orderPage', this.page)
            localStorage.setItem('orderFilterForm', JSON.stringify(this.filterForm));
            this.getList()
        },
        handleRowEdit(index, row) {
            this.$router.push({ name: 'order_add', query: { id: row.id } })
        },
        handleRowDelete(index, row) {

            this.$confirm(this.$t('ok_to_delete'), this.$t('tip'), {
                confirmButtonText: this.$t('ok'),
                cancelButtonText: this.$t('cancel'),
                type: 'warning'
            }).then(() => {

                this.axios.post('order/destory', { id: row.id }).then((response) => {
                    console.log(response.data)
                    if (response.data.errno === 0) {
                        this.$message({
                            type: 'success',
                            message: this.$t('deleted_successfully')
                        });

                        this.getList();
                    }
                })


            });
        },
        onSubmitFilter() {
            this.page = 1
            this.getList()
        },
        getList() {
            this.axios.get('order', {
                params: {
                    page: this.page,
                    orderSn: this.filterForm.order_sn,
                    consignee: this.filterForm.consignee,
                }
            }).then((response) => {
                this.tableData = response.data.data.data
                this.page = response.data.data.currentPage
                this.total = response.data.data.count
            })
        }
    },
    components: {
        Plus,
    },
    mounted() {
        this.getList();
    }
}
</script>

<style scoped></style>
