import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo,getTagA,getTagB,getSliderList,getHotTagList } from "@/api/user";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		userInfo:null,
		tagAList:[],
		tagBList:[],
		sliderList:[],
		hotTagList:[],
		tagItem:null,
		imgUrl:'http://www.jiyou-tech.com/2020/522/images/'
  },
	getters:{
		getCount(state){
			return state.count+1
		}
	},
  mutations: {
		SET_USERINFO: (state, data) => {
		  state.userInfo = data
		},
		SET_TAGA: (state,data) => {
			state.tagAList = data
		},
		SET_TAGB: (state,data) => {
			state.tagBList = data
		},
		SET_SLIDER: (state,list) => {
			state.sliderList = list
		},
		SET_HOTTAG: (state,list) => {
			state.hotTagList = list
		}
  },
  actions: {
		getUserInfo({ commit }){
			return new Promise((resolve, reject) => {
				getUserInfo({visit_state:2}).then(res=>{
					if(res.code==200){
						const { user_info } = res
						commit('SET_USERINFO', user_info)
					}
					resolve(res)
				})
			})
		},
		getTagA({ commit }){
			getTagA({list_type:1,item_state:1}).then(res=>{
				if(res.code==200){
					var { data }=res;
					commit('SET_TAGA', data)
				}
			})
		},
		getTagB({ commit },taga_list){
			return new Promise((resolve, reject) => {
				getTagB({list_type:1,item_state:1,taga_list:taga_list}).then(res=>{
					if(res.code==200){
						var { data }=res;
						commit('SET_TAGB', data)
					}
					resolve(res)
				}).catch(error =>{
					reject(error)
				})
			})
		},
		getSliderList({ commit }){
			getSliderList({list_type:1,item_state:1}).then(res=>{
				if(res.code==200){
					var { data }=res;
					commit('SET_SLIDER', data)
				}
			})
		},
		getHotTagList({ commit }){
			getHotTagList().then(res=>{
				if(res.code==200){
					var { data }=res;
					commit('SET_HOTTAG', data)
				}
			})
		}
  },
  modules: {
  }
})
