import { createRouter, createWebHistory } from 'vue-router'
import CreateView from '../views/CreateView.vue'
import ReadView from '../views/ReadView.vue'
import SuccessView from '../views/SuccessView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'create',
      component: CreateView
    },
    {
      path: '/success',
      name: 'success',
      component: SuccessView
    },
    {
      path: '/:slug',
      name: 'read',
      component: ReadView,
      props: true
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

export default router