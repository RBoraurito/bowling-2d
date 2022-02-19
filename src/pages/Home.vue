<template>
  <main class="flex justify-center items-center h-screen">
    <div class="w-fit">
      <h1 class="text-3xl text-center font-bold uppercase mb-8">
        Bowling 2D
      </h1>
      <router-link
        to="/new-game"
        class="py-4 px-20 text-white bg-gradient-to-r from-blue-400 to-blue-700 text-lg leading-none rounded-md"
        @click="begin"
      >
        New Game
      </router-link>
    </div>
  </main>  
</template>

<script setup>
import { useStore } from "vuex"

const store = useStore()

const begin = () => store.commit('begin')
</script>