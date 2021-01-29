import request from '@/utils/request'

// 登录
export const login = data => {
	return request({
		method: 'POST',
		url: 'login',
		data
	})
}

//左侧菜单
export const leftMenu = data => {
	return request({
		method: 'GET',
		url: 'menus',
		data
	})
}

//获取用户列表数据
export const getListUsers = params => {
	return request({
		method: "GET",
		url: 'users',
		params
	})
}

