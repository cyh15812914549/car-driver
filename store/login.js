const state = {
  authState: '',
  phoneNumber: '',
  password: '',
  roleNum: '',
  totalTopHeight: ''
}


const mutations = {
  saveLoginData(state,data){
	  state.authState = data.authState
	  state.phoneNumber = data.phoneNumber
	  state.password = data.password
	  state.roleNum = data.roleNum
  },
  getCustomHeight(state,data){
  	state.statusBar = data.statusBar
  	state.customBar = data.customBar
	state.totalTopHeight = data.totalTopHeight
  	console.log(data,"data")
  }
}

const actions = {
  
}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
