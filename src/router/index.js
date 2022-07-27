import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/detail/:id', component: () => import('@/pages/Detail.vue') },
  { path: '/', component: () => import('@/pages/List.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
