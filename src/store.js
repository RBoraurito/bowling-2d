import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      isStarted: false,
      players: []
    }
  },
  mutations: {
    begin (state) {
      state.isStarted = true
    },
    addPlayer(state, payload) {
      state.players.push({
        name: payload,
        id: crypto.randomUUID(),
        rounds: Array(10).fill({
          first: 0,
          second: 0,
          type: '',
          total: 0
        })
      })
    },
    backFromPlayers(state) {
      state.isStarted = false
    },
    reset(state) {
      state.isStarted = false
      state.players = []
    }
  },
  actions: {
    setPlayers({state, commit}, payload) {
      state.players = []
      payload.forEach(player => {
        commit('addPlayer', player)
      })
    }
  }
})

export default store