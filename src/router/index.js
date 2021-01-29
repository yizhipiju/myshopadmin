import Vue from 'vue'
import VueRouter from 'vue-router'
import loginIndex from '@/views/login'
import homeIndex from '@/views/home'
import welcomeIndex from '@/views/home/welcome'
import userIndex from '@/views/home/users'
import rolesIndex from '@/views/home/roles'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: '/login'
	},
	{
		name: 'loginIndex',
		path: '/login',	
		component: loginIndex
	},
	{
		// name: 'homeIndex',
		path: '/home',
		redirect: '/welcome',
		component: homeIndex,
		children: [
			{
				path: '/welcome',
				name: 'welcomeIndex',
				component: welcomeIndex
			},
			{
				path: '/users',
				name: 'userIndex',
				component: userIndex
			},
			{
				path: '/roles',
				name: 'rolesIndex',
				component: rolesIndex
			}
		]
	}
]

const router = new VueRouter({
	routes
})


router.beforeEach((to, from, next) => {
	if(to.path === '/login'){
		return next()
	}
	
	const tokenStr = window.sessionStorage.getItem('token')
	if(!tokenStr){
		return next('/login')
	}else{
		next()
	}
	
})

export default router
