<template>
  <div class="p-6 w-full mb-12" :class="props.isActive && 'bg-green-800'">
    <div class="h-24 flex space-x-12 max-w-5xl w-full mx-auto">
      <div
        class="w-40 flex-shrink-0 flex items-center justify-end p-4"
      >
        <p
          class="text-lg font-bold"
          :class="props.isActive ? 'text-white' : 'text-gray-700'"
        >
          {{player.name}}
        </p>
      </div>
      <div class="grid grid-cols-10 w-full">
        <ScoreSquare
          v-for="round in player.rounds"
          :key="round.order"
          :round="round.order"
          :scores="
            round.hasOwnProperty('third') ?
            [round.first, round.second, round.third] :
            [round.first, round.second]
          "
          :total="round.total"
          class="bg-white"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ScoreSquare from './ScoreSquare.vue';
import { useStore } from "vuex"


const props = defineProps(['id', 'isActive'])
const store = useStore()
const player = store.getters.getPlayer(props.id)
</script>

<style>

</style>