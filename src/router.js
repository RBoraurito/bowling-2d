import {createRouter, createWebHistory} from 'vue-router'

import Home from '@/pages/Home.vue'
import Players from '@/pages/Players.vue'
import Game from '@/pages/Game.vue'
import Congrats from '@/pages/Congrats.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/new-game', component: Players },
  { path: '/game', component: Game },
  { path: '/congrats', component: Congrats },
]
const router = createRouter({
  history: createWebHistory(),
  routes, 
})

export default router