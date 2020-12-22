import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		carts: uni.getStorageSync('carts') || [],
		menus: uni.getStorageSync("menus") || [],
		forceLogin: false,
		hasLogin: false,
		userName: ""
	},
	mutations: {
		addToCarts(state, good) {
			var currentGood = state.carts.find(item => {
				if (item.name == good.name) {
					return item;
				}
			})
			if (currentGood) {
				if (currentGood.name) {
					uni.showToast({
						title: '添加过了'
					})
				}
			} else {
				state.carts.push(good)
				console.log("99999999999", state.carts)
			}
			uni.setStorageSync('carts', state.carts)
		},
		addToMenus(state, menus) {
			var isexist = false;
			state.menus.forEach(item => {
				if (item.id == menus.id) {
					isexist = true
					var i = state.menus.indexOf(item)
					console.log(item.id, state.menus, i, "hhhhhhhhh");
					state.menus.splice(i, 1)
				}
			})
			if (isexist == false) {
				state.menus.push(menus)
				menus.num++;
			}
			console.log("menu", state.menus)
			uni.setStorageSync("menus", state.menus)
		},
		login(state, userName) {
			state.userName = userName || '新用户';
			state.hasLogin = true;
			console.log("login" + JSON.stringify(state))
		},
		loginout(state) {
			state.userName = '';
			state.hasLogin = false;
			console.log("loginout" + JSON.stringify(state))
		}
	},
	actions: {}
})
export default store
