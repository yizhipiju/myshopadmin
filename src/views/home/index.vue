<template>
  <el-container class="home-container">
    <el-header>
			<div class="home-el-header">
				<img class="home-image" src="../login/login.jpg" />
				<span class="home-span">电商后台管理系统</span>
			</div>
			<el-button type="info" @click="logout">退出</el-button>
		</el-header>
    <el-container>
      <el-aside :width=" isMenuToggle ? '64px' : '200px' " background-color='#222222'>
				<el-button type="info" class="el-icon-s-unfold" @click="MenuToggle">
				</el-button>
				<el-menu
					class="el-menu-vertical-demo"
					background-color="#222222"
					text-color="#fff"
					active-text-color="#ffd04b"
					unique-opened
					:default-active="this.$route.path"
					:collapse="isMenuToggle"
					router
				>
					<el-submenu :index="menu.id + ''" v-for="menu in listMenu" :key="menu.id">
						<template slot="title">
							<i :class="menuIcon[menu.id]"></i>
							<span>{{ menu.authName }}</span>
						</template>
						
						<el-menu-item :index="'/' + secondMenu.path + ''" v-for="secondMenu in menu.children" :key="secondMenu.id">
							<template slot="title">
								<i class="el-icon-menu"></i>
								<span>{{ secondMenu.authName }}</span>
							</template>
						</el-menu-item>
						
					</el-submenu>
				</el-menu>
			</el-aside>
      <el-main>
				<router-view></router-view>
			</el-main>
    </el-container>
  </el-container>
</template>

<script>
import { leftMenu } from '@/api/user'

export default {
  name: 'homeIndex',
  props:{

  },
  components:{

  },
  data () {
    return {
      listMenu: [], //菜单列表
			menuIcon: { //菜单icon
				"125": "el-icon-user-solid",
				"103": "el-icon-warning",
				"101": "el-icon-s-goods",
				"102": "el-icon-s-order",
				"145": "el-icon-s-data"
			},
			isMenuToggle:false, //控制菜单是否折起
    }
  },
  watch:{

  },
  computed:{

  },
  created() {
		this.loadMenu()
  },
  mounted() {

  },
  methods:{
		logout(){
			this.$confirm('此操作将退出管理系统, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				window.sessionStorage.clear()
				this.$router.push('/login')
				this.$message({
					type: 'success',
					message: '退出成功!'
				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消退出'
				});          
			});
		},
		async loadMenu() {
			const { data } = await leftMenu()
			// console.log(data)
			if(data.meta.status != 200){
				return this.$message({
					typr: 'error',
					message: '请求菜单列表数据错误！'
				})
			}
			this.listMenu = data.data
		},
    MenuToggle(){
			this.isMenuToggle = !this.isMenuToggle
		},
  },
}
</script>

<style lang="less" scoped>
.home-container{
	height: 100%;
}
.el-header{
	display: flex;
	align-items: center;
	justify-content: space-between;
	// padding: 30px;
	background-color: #555;
	.home-el-header{
		display: flex;
		align-items: center;
		.home-span{
			margin-left: 20px;
			color: #fff;
			font-size: 24px;
		}
	}
}
.el-menu {
  border-right: none;
}
.el-icon-s-unfold {
	width: 100%;
	display: inline-block;
	line-height: 0;
	white-space: nowrap;
	cursor: pointer;
	background: #FFF;
	border: 1px solid #DCDFE6;
	color: #606266;
	-webkit-appearance: none;
	text-align: center;
	box-sizing: border-box;
	outline: 0;
	margin: 0;
	transition: .1s;
	font-weight: 500;
	padding: 12px 20px;
	font-size: 20px;
	border-radius: 4px;
}
.el-aside{
	background-color: #222;
}
.el-main{
	background-color: #999;
}
.home-image{
	width: 60px;
	height: 60px;
	border-radius: 50%;
}
</style>

