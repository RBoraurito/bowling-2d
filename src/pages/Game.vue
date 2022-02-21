<template>
  <main class="p-6">
    <section class="relative pt-16 pl-52 mb-12">
      <h1 class="text-3xl font-bold uppercase mb-8">
        Bowling 2D
      </h1>
      <div class="absolute top-4 right-4 flex space-x-4">
        <div v-show="showControls" class="text-lg flex space-x-3">
          <p class="text-gray-700">End game?</p>
          <a class="text-red-600 cursor-pointer" @click="exit">
            Yes
          </a>
          <a class="text-green-600 cursor-pointer" @click="toggleControls">
            No
          </a>
        </div>
        <Close @click="toggleControls" class="cursor-pointer" />
      </div>
    </section>
    <div class="flex space-x-8 pr-8">
      <div class="w-full">
        <BowlingField
          ref="field"
          class="mb-12"
          @send-pins="handlePins"
        />
        <ScoreBoard
          v-for="(player, index) in store.state.players"
          :key="player.id"
          :id="player.id"
          :isActive="index === 0"
        />
      </div>
      <button
        class="uppercase text-white font-bold p-24 block bg-green-800 mr-8 h-fit"
        @click="play"
        :disabled="!canClick"
      >
        Play
      </button>
    </div>
  </main>  
</template>

<script setup>
import Close from '@/components/Close.vue'
import BowlingField from '@/components/BowlingField.vue';
import ScoreBoard from '@/components/ScoreBoard.vue';

import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { watch } from '@vue/runtime-core';

const store = useStore()
const router = useRouter()

const field = ref(null)
const canClick = ref(true)

const play = () => {
  if(!canClick.value) return
  canClick.value = false
  field.value.throwBowl()
  setTimeout(() => {
    canClick.value = true
  }, 8000)
}

const handlePins = (pins) => {
  store.dispatch('throwBowl', pins)
}

watch(() => store.state.isOver, (val, oldVal) => {
  if(val) {
    router.push('/congrats')
  }
})
// Controls

const showControls = ref(false)
const toggleControls = () => showControls.value = !showControls.value
const exit = () => {
  store.commit('reset')
  router.push('/')
}
</script>
