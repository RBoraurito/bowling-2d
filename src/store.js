import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      isStarted: false
    }
  },
  mutations: {
    begin (state) {
      state.isStarted = true
    }
  }
})

export default store