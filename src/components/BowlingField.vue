<template>
  <section class="ml-52 bg-green-800 p-8 relative" ref="field">
    <div class="pins" v-show="!showStrike">
      <div class="flex flex-col space-y-2">
        <span :class="[getPine(10) && 'active']" class="pine"/>
        <span :class="[getPine(9) && 'active']" class="pine"/>
        <span :class="[getPine(8) && 'active']" class="pine"/>
        <span :class="[getPine(7) && 'active']" class="pine"/>
      </div>
      <div class="flex flex-col space-y-2">
        <span :class="[getPine(6) && 'active']" class="pine"/>
        <span :class="[getPine(5) && 'active']" class="pine"/>
        <span :class="[getPine(4) && 'active']" class="pine"/>
      </div>
      <div class="flex flex-col space-y-2">
        <span :class="[getPine(3) && 'active']" class="pine"/>
        <span :class="[getPine(2) && 'active']" class="pine"/>
      </div>
      <span :class="[getPine(1) && 'active']" class="pine"></span>
    </div>
    <figure v-show="showStrike">
      <img src="/img/strike.png" alt="strike image">
    </figure>
    <span
      class="bowl"
      :style="isMoving && `transform: translateX(-${fieldWidth - 260}px);`"
    />
  </section>  
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";
import { useStore } from "vuex";

const emits = defineEmits(['sendPins'])
const store = useStore()
const field = ref(null)
const fieldWidth = computed(() => field.value.clientWidth)
const showStrike = ref(false)

const initialValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const pins = ref(initialValue)
const firstThrow = ref(null)

const genRandom = (until = 10) => Math.floor(Math.random() * until)

const throwBowl = () => {
  const pinsDown = genRandom(pins.value.length + 1)
  isMoving.value = true
  setTimeout(() => {
    for (let index = 0; index < pinsDown; index++) {
      const pine = genRandom(pins.value.length)
      pins.value = pins.value.filter((p, index) => {
        return index != pine
      })
    }
    if(pinsDown === 10 && firstThrow.value === null) {
      showStrike.value = true
      isMoving.value = false
      setTimeout(() => {
        showStrike.value = false
        emits('sendPins', pinsDown)
        reset()
      }, 2000)
    } else {
      isMoving.value = false
      emits('sendPins', pinsDown)
      setTimeout(() => {
        if(firstThrow.value !== null) return reset()
        firstThrow.value = pinsDown
      }, 2000)
    }
  }, 4000)
}
const reset = () => {
  pins.value = initialValue
  firstThrow.value = null
}

const getPine = computed(() =>{
  return (i) => pins.value.find(p => p === i)
})

const isMoving = ref(false)

watch(() => store.state.hasToReset, (val) => {
  if(val) reset()
})

defineExpose({
  throwBowl,
  reset
})

</script>

<style>
  .pins {
    @apply relative flex items-center space-x-2 w-fit;
  }

  .pine {
    @apply w-8 h-8 rounded-full bg-white opacity-0;
  }

  .pine.active {
    @apply opacity-100
  }

  .bowl {
    @apply absolute right-8 top-0 bottom-0 my-auto w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-500 border border-gray-50 rounded-full transition-all;
    transition-duration: 4000ms;
  }

  figure {
    width: 152px;
    height: 152px;
    @apply object-contain flex items-center;
  }

</style>
