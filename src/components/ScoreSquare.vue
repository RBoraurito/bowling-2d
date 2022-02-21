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
      v-for="(score, index) in props.scores"
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
  const props = defineProps(['round', 'scores', 'total'])
</script>

<style>

</style>