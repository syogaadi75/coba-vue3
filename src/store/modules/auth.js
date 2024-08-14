import axios from 'axios'

const state = {
  user: null,
  token: null,
  loading: false,
  error: null
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_LOADING(state, status) {
    state.loading = status
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

const actions = {
  async login({ commit }, credentials) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      console.log(credentials, 'credentials')
      const response = await axios.post('/api/login', credentials) // Ubah URL sesuai kebutuhan
      const { user, token } = response.data
      commit('SET_USER', user)
      commit('SET_TOKEN', token)
    } catch (error) {
      commit('SET_ERROR', error.response.data.message || 'Failed to login')
    } finally {
      commit('SET_LOADING', false)
    }
  },

  logout({ commit }) {
    commit('SET_USER', null)
    commit('SET_TOKEN', null)
  }
}

const getters = {
  isAuthenticated: (state) => !!state.token,
  user: (state) => state.user,
  loading: (state) => state.loading,
  error: (state) => state.error
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
