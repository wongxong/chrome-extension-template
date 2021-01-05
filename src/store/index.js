import Vue from 'vue';
import Vuex from 'vuex';
import { login_api } from '@/api/content-api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false, // 全局 loading
    userInfo: {} // 用户信息
  },
  mutations: {
    updateLoading(state, loading) {
      state.loading = loading;
    },
    updateUserInfo(state, info) {
      state.userInfo = info;
    }
  },
  actions: {
    // 登录
    login({ commit, state }, params) {
      return login_api(params).then(res => {
        commit("updateUserInfo", res);
      });
    },
    // 退出登录
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("updateUserInfo", null);
      });
    }
  }
});
