<template>
  <main class="flex justify-center items-center h-screen">
    <div class="p-4 h-fit w-fit">
      <h1 class="text-3xl text-center font-bold uppercase mb-8">
        Bowling 2D
      </h1>
      <div
        v-for="(player, index) in players"
        :key="index"
        class="mb-4"
      >
        <label :for="`player${formattedIndex(index)}`" class="text-lg mb-3 inline-block">
          Player {{ formattedIndex(index) }}
        </label>
        <input
          v-model="players[index]"
          type="text"
          :id="`player${formattedIndex(index)}`"
          placeholder="Your name"
          class="block border border-gray-200 rounded-md py-3 px-4 placeholder:text-gray-400 text-gray-700"
          @input="checkError(index)"
        >
        <span v-show="errors[index]" class="text-sm mt-2 text-red-700 inline-block">
          Please fill with your name
        </span>
      </div>
      <button
        class="py-3 rounded-md text-lg leading-none bg-green-600 text-white w-full font-bold mb-3 mt-8 disabled:cursor-not-allowed disabled:bg-opacity-50"
        :disabled="hasError.length"
        @click="setPlayers"
      >
        Start
      </button>
      <button
        class="py-3 rounded-md text-lg leading-none bg-red-600 text-white w-full font-bold"
        @click="goBack"
      >
        Back
      </button>
    </div>
  </main>  
</template>

<script setup>
  import { ref } from '@vue/reactivity'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import { computed } from '@vue/runtime-core'

  const store = useStore()
  const router = useRouter()

  const playerCount = 2
  const players = ref(Array(playerCount).fill(''))

  const errors = ref(Array(playerCount).fill(true))
  const checkError = (i) => {
    errors.value[i] = players.value[i] === '' && true
  }
  const hasError = computed(() => {
    return errors.value.filter((e) => e === true)
  })

  const setPlayers = () => {
    if(hasError.value.length) return
    store.dispatch('setPlayers', players.value)
    router.push('/game')
  }
  const goBack = () => {
    store.commit('backFromPlayers')
    router.push('/')
  }

  const formattedIndex = (i) => i += 1
</script>