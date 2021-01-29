<template>
	<div class="login-container">
		<el-form class="login-form" ref="login-form" :model="user" :rules="formRules">
			<div class="login-title">
				<h3>HongThai Admin</h3>
			</div>
			<el-form-item prop="username" class="login-item">
				<span class="iconfont icon-B login-icon"></span>
				<el-input v-model="user.username" placeholder="请输入账号" />
			</el-form-item>
			<el-form-item prop="password" class="login-item">
				<span class="iconfont icon-mima login-icon"></span>
				<el-input type="password" v-model="user.password" placeholder="请输入密码" />
			</el-form-item>
			<el-form-item prop="agree" class="login-agreement">
				<el-checkbox v-model="user.agree"></el-checkbox>
				我已阅读并同意用户协议和隐私条款
			</el-form-item>
			<el-form-item class="login-btn">
				<el-button type="primary" @click="onLogin" :loading="loginLoading">登录</el-button>
				<el-button type="info" @click="onReset">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { login } from '@/api/user'
	export default {
		name: '',
		props: {

		},
		components: {

		},
		data() {
			return {
				user: {
					username: 'admin', //手机号
					password: '123456', //密码
					agree: false //阅读验证
				},
				loginLoading: false, //登录的loading状态
				formRules: { //表单验证规则配置
					username: [{
							required: true,
							message: '请输入账号',
							trigger: 'change'
						},
						{
							// pattern: /^1[3|5|7|8|9]\d{9}$/,
							message: '请输入正确账号格式',
							trigger: 'change'
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'change'
						},
						{
							min: 3,
							max: 15,
							message: '长度在 3 到 15 个字符',
							trigger: 'change'
						}
					],
					agree: [{
							validator: (rule, value, callback) => {
								if (value) {
									callback()
								} else {
									callback(new Error('请勾选用户协议'))
								}
							},
							trigger: 'change'
						},

					]
				}
			}
		},
		watch: {

		},
		computed: {

		},
		created() {

		},
		mounted() {

		},
		methods: {
			async onLogin() {
				this.$refs['login-form'].validate(async valid => {
					if (!valid) {
						return
					}
					try {
						this.loginLoading = true
						const { data } = await login(this.user)
						console.log(data)
						if(data.meta.status === 200){
							this.$message({
								type: 'success',
								message: '恭喜你,登录成功!'
							})
							window.sessionStorage.setItem('token',data.data.token)
							this.$router.push('/home')
						}
						this.loginLoading = false
						//这里写把用户信息存储在本地
					} catch (err) {
						console.log('登陆失败', err)
						this.$message.error('登陆失败!')
						this.loginLoading = false
					}
				})

			},
			onReset() {
				this.$refs['login-form'].resetFields()
			}
		},
	}
</script>

<style lang="less" scoped>
	.login-container {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background: url(./login.jpg);
		background-size: cover;

		.login-form {
			background-color: #444;
			padding: 20px 50px 20px 50px;
			min-width: 300px;

			.login-title {
				width: 300px;
				display: flex;
				color: #fff;
				align-items: center;
				justify-content: center;
				margin-bottom: 20px;
			}

			.login-item {
				position: relative;

				.login-icon {
					position: absolute;
					left: 5px;
					z-index: 99;
					font-size: 20px;
					bottom: 0px;
					color: skyblue;
				}

				/deep/ .el-input__inner {
					-webkit-appearance: none;
					background-color: #FFF;
					background-image: none;
					border-radius: 4px;
					border: 1px solid #DCDFE6;
					box-sizing: border-box;
					color: #606266;
					display: inline-block;
					font-size: inherit;
					height: 40px;
					line-height: 40px;
					outline: 0;
					padding: 0 32px;
					transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
					width: 100%;
				}
			}

			.login-btn {
				display: flex;
				justify-content: flex-end;
			}

			.login-agreement {
				color: #fff;
			}
		}

		.el-icon-platform-eleme {
			vertical-align: middle;
			display: inline-block;
		}
	}
</style>
