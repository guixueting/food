import Vue from 'vue'
import App from './App'
import store from './store'
import '@/static/fonts/iconfont.css'
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
