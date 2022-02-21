<template>
  <main class="py-12">
    <h1 class="text-3xl text-center uppercase font-bold">
      The winner is
    </h1>
    <hr class="max-w-sm mx-auto my-7">
    <h2 class="text-3xl text-center font-bold mb-12">
      {{ winner.name }} <br> Congrats!
    </h2>
    <SuccessScore
      v-for="player in store.state.players"
      :key="player "
      :id="player.id"
      :isActive="player.id === winner.id"
    />
    <div class="mx-auto w-fit">
      <button @click="restart" class="bg-green-800 text-white py-6 w-52 font-bold block mb-4">
        Restart Game
      </button>
      <button @click="exit" class="bg-red-500 text-white py-6 w-52 font-bold">
        Exit
      </button>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import SuccessScore from '../components/SuccessScore.vue';

const store = useStore()
const router = useRouter()
const winner = store.state.players.reduce((current, player, index) => {
  debugger
  if(index === 0) return player
  return current.rounds[9].total > player.rounds[9].total ? current : player
}, {})

const exit = () => {
  store.commit('reset')
  router.push('/')
}
const restart = () => {
  store.commit('restart')
  router.push('/game')
}
</script>
