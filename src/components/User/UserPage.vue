<template>
	<div class="content-page">
		<div class="content-nav">
			<el-breadcrumb class="breadcrumb" separator="/">
				<el-breadcrumb-item :to="{ path: '/dashboard' }">{{ $t('home_page') }}</el-breadcrumb-item>
				<el-breadcrumb-item>{{ $t('product_management') }}</el-breadcrumb-item>
				<el-breadcrumb-item>{{ $t('member_list') }}</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="operation-nav">
				<router-link to="/dashboard/user/add">
					<!--<el-button type="primary">
						<el-icon><Plus /></el-icon>
						{{ $t('add_member') }}
					</el-button>-->
				</router-link>
			</div>
		</div>
		<div class="content-main">
			<div class="filter-box">
				<el-form :inline="true" :model="filterForm" class="demo-form-inline">
					<el-form-item :label="$t('member_name')">
						<el-input v-model="filterForm.name" :placeholder="$t('member_name')"></el-input>
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
					<el-table-column prop="username" :label="$t('member_name')">
					</el-table-column>
					<el-table-column prop="nickname" :label="$t('this_name')">
					</el-table-column>
					<el-table-column prop="gender" :label="$t('gender')" width="120">
						<template #default="scope">
							{{ scope.row.gender == 1 ? $t('female') : $t('male') }}
						</template>
					</el-table-column>
					<el-table-column prop="mobile" :label="$t('cell_phone_number')">
					</el-table-column>
					<el-table-column prop="register_time" :label="$t('registration_time')">
					</el-table-column>
					<el-table-column :label="$t('operation')" width="140">
						<template #default="scope">
							<!--<el-button size="small" @click="handleRowEdit(scope.$index, scope.row)">{{ $t('edit') }}</el-button>-->
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
			localStorage.setItem('userPage', this.page)
			localStorage.setItem('userFilterForm', JSON.stringify(this.filterForm));
			this.getList()
		},
		handleRowEdit(index, row) {
			this.$router.push({ name: 'user_add', query: { id: row.id } })
		},
		handleRowDelete(index, row) {

			this.$confirm(this.$t('ok_to_delete'), this.$t('tip'), {
				confirmButtonText: this.$t('ok'),
				cancelButtonText: this.$t('cancel'),
				type: 'warning'
			}).then(() => {

				this.axios.post('user/destory', { id: row.id }).then((response) => {
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
			this.axios.get('user', {
				params: {
					page: this.page,
					name: this.filterForm.name
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
