import Vue from 'vue'
import VueRouter from 'vue-router'
import loginIndex from '@/views/login'

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
	}
]

const router = new VueRouter({
	routes
})

export default router
