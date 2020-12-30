import Vue from 'vue'
import Vuex from 'vuex'

import login from './login.js'
import common from './common.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		login,
		common,
	}
})