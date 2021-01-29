<template>
	<div class="">
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片 -->
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<el-row :gutter="20">
					<el-col :span="10">
						<el-input placeholder="请输入内容" class="input-with-select">
							<el-button slot="append" icon="el-icon-search"></el-button>
						</el-input>
					</el-col>
					<el-col :span="5">
						<el-button type="primary">添加</el-button>
					</el-col>
				</el-row>
			</div>
			<div class="text item">
				<el-table
					:data="listUsers"
					style="width: 100%"
					stripe
					border
					center
				>
					<el-table-column
						type="index"
						label="排序"
						
					>
					</el-table-column>
					<el-table-column
						prop="username"
						label="姓名"
						>
					</el-table-column>
					<el-table-column
						prop="email"
						label="邮箱"
						>
					</el-table-column>
					<el-table-column
						prop="mobile"
						label="电话">
					</el-table-column>
					<el-table-column
						prop="role_name"
						label="角色">
					</el-table-column>
					<el-table-column
						label="状态"
					>
						<template slot-scope="scope">
							<el-switch
								v-model="scope.row.mg_state"
								active-color="#13ce66"
								inactive-color="#ff4949"
							>
							</el-switch>
						</template>
					</el-table-column>
					<el-table-column
						prop=""
						label="操作"
					>
						<template>
							<el-button type="primary" icon="el-icon-edit" circle></el-button>
							<el-button type="danger" icon="el-icon-delete" circle></el-button>
							<el-button type="warning" icon="el-icon-setting" circle></el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-card>
	</div>
</template>

<script>
	import { getListUsers } from '@/api/user'
	
	export default {
		name: 'usersIndex',
		props: {

		},
		components: {

		},
		data() {
			return {
				listUsers: [],  //用户列表数据
				
			}
		},
		watch: {

		},
		computed: {

		},
		created() {
			this.loadListUsers()
		},
		mounted() {

		},
		methods: {
			async loadListUsers() {
				const { data } = await getListUsers({
					pagenum: 1,
					pagesize: 10
				})
				console.log(data)
				if(data.meta.status != 200) {
					return this.$message.error('获取用户列表数据失败！')
				}
				this.listUsers = data.data.users
			}
		},
	}
</script>

<style lang="less" scoped>
	.el-breadcrumb {
		color: #fff;
		margin-bottom: 20px;
	}
</style>
