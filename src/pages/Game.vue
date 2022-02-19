<template>
  <main class="p-6">
    <section class="relative pt-16 pl-52">
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
  </main>  
</template>

<script setup>
import Close from '@/components/Close.vue'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const showControls = ref(false)

const toggleControls = () => showControls.value = !showControls.value
const exit = () => {
  store.commit('reset')
  router.push('/')
}
</script>
