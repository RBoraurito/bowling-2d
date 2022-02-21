<template>
  <div
    class="grid border border-gray-700 grid-rows-3"
    :class="props.scores.length === 2 ? 'grid-cols-2' : 'grid-cols-3'"
  >
    <div
      class="border-b border-gray-700 p-1 flex items-center justify-center font-bold"
      :class="props.scores.length === 2 ? 'col-span-2' : 'col-span-3'"
    >
      {{ props.round }}
    </div>
    <div
      v-for="(score, index) in formatScore"
      :key="index"
      class="border-gray-700 flex items-center justify-center col-span-1"
      :class="index === 0 ? 'border-0' : 'border-l border-b'"
    >
      {{ score }}
    </div>
    <div
      class="flex items-center justify-center "
      :class="props.scores.length === 2 ? 'col-span-2' : 'col-span-3'"
    >
      {{ props.total }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core"

  const props = defineProps(['round', 'scores', 'total'])

  const formatScore = computed(() => {
    const scores = props.scores
    return scores.map((score, index) => {
      if(scores.length === 3) {
        if(score === 10) return 'x'
        if(index === 2 && scores[0] + scores[1] < 10) return ''
        if(index === 1 && scores[0] + scores[1] === 10 && scores[0] !== 10) return '/'
        if(
          index === 2 &&
          scores[1] + scores[2] === 10 &&
          scores[1] !== 10 &&
          scores[0] === 10
        ) return '/'
      }
      if (score === 0) {
        return '-'
      }
      if(score === 10 && index === 0) return ''
      if(index === 1 && scores[0] === 10) {
        return 'X'
      }
      if(index === 1 && score + scores[0] === 10) {
        return '/'
      }
      return score
    })
  })
</script>

<style>

</style>