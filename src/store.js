import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      isStarted: false,
      players: [],
      round: 0,
      hasToReset: false,
      isOver: false
    }
  },
  getters: {
    getPlayer: state => {
      return id => state.players.find(player => player.id === id)
    },
    isRoundOver: state => {
      return !state.players.some(player => player.rounds[state.round].isFinished === false)
    },
    hasPendingThrows: state => player =>{
      let pending = player.rounds.map((round, index) => {
        const hasThrows = round.pendingThrows?.includes(null)
        return hasThrows ? index : false
      })
      pending = pending.filter(round => round !== false)
      return pending
    },
  },
  mutations: {
    begin (state) {
      state.isStarted = true
    },
    addPlayer(state, payload) {
      let rounds = Array(9).fill({
        first: null,
        second: null,
        pendingThrows: [],
        isFinished: false,
        total: null
      })
      rounds.push({
        first: null,
        second: null,
        third: null,
        isFinished: false,
        total: null
      })
      rounds = rounds.map((round, index) => ({...round, order: index + 1}))
      state.players.push({
        name: payload,
        id: crypto.randomUUID(),
        rounds
      })
    },
    backFromPlayers(state) {
      state.isStarted = false
    },
    reset(state) {
      state.isStarted = false
      state.players = []
    },
    setPoints(state, points) {
      const round = state.players[0].rounds[state.round]
      if(round.first === null) {
        round.first = points
        round.pendingThrows = Array(points === 10 ? 2 : 0).fill(null)
        console.log('first', state.players[0].name, points)
        round.isFinished = points == 10 && state.round !== 9 ? true : false
      } else if(round.second === null) {
        round.second = points
        round.pendingThrows = Array(points + round.first === 10 ? 1 : 0).fill(null)
        round.isFinished = (round.hasOwnProperty('third') && round.first + round.second >= 10) ? false : true
        if(round.first + round.second < 10 && state.round === 9) round.thrid = 0
        console.log('second', state.players[0].name, points)
      } else if(
        round.hasOwnProperty('third') &&
        round.third === null
      ) {
        round.third = points
        round.isFinished = true
        console.log('third', state.players[0].name, points)
      }
    },
    setPendingThrow(state) {
      const rounds = state.players[0].rounds
      rounds.forEach((round, index) => {
        if(index === 9) return
        if(round.pendingThrows.length === 1 && round.pendingThrows[0] === null) {
          round.pendingThrows[0] = rounds[index + 1].first
        }
        if(round.pendingThrows.length === 2) {
          if(round.pendingThrows[0] === null) round.pendingThrows[0] = rounds[index + 1].first
          if(round.pendingThrows[1] === null) {
            round.pendingThrows[1] = rounds[index + 1].first !== 10 ? rounds[index + 1].second : rounds[index + 2].first
          }
        }
      })
    },
    calculateTotal(state) {
      const rounds = state.players[0].rounds
      rounds.forEach((round, index) => {
        if(
          index === 9 &&
          round.first !== null &&
          round.second !== null &&
          round.third !== null
        ) {
          round.total = round.first + round.second + round.third + rounds[index - 1].total
          return
        }
        if(round.first !== null &&
          (round.second !== null || round.first === 10) &&
          !round.pendingThrows.includes(null)
        ) {
          if(index === 0) {
            const pending = round.pendingThrows.reduce((total, value) => total + value, 0)
            round.total = round.first + round.second + pending
            return
          }
          if(rounds[index - 1].total !== null) {
            const pending = round.pendingThrows.reduce((total, value) => total + value, 0)
            round.total = round.first + round.second + pending + rounds[index - 1].total 
          }
          return 
        }
      })
    },
    nextRound(state) {
      state.round++
    },
    nextTurn(state, payload) {
      state.players.push(payload)
      state.players.shift()
    },
    resetField(state) {
      state.shouldReset = true
      setTimeout(() => state.shouldReset = false, 100)
    }
  },
  actions: {
    setPlayers({state, commit}, payload) {
      state.players = []
      payload.forEach(player => {
        commit('addPlayer', player)
      })
    },
    throwBowl({commit, dispatch}, points) {
      commit('setPoints', points)
      dispatch('checkTotal', points)
      commit('calculateTotal')
      dispatch('checkNextTurn')
    },
    checkTotal({state, commit, getters}, points) {
      const player = state.players[0]
      const roundsPending = getters.hasPendingThrows(player)
      if(roundsPending.length) commit('setPendingThrow')
    },
    checkNextTurn({state, commit, getters}) {
      const player = state.players[0]
      if(player.rounds[state.round].isFinished) {
        commit('nextTurn', player)
        commit('resetField')
      }
      if(getters.isRoundOver) {
        commit('nextRound')
        return
      }
      if(state.round > 9) state.isOver = true
    },
  }
})

export default store