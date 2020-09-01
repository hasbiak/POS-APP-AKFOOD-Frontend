import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Axios from '../views/Axios.vue'
import Lifecycle from '../views/Lifecycle.vue'
import History from '../views/History.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/History',
    name: 'History',
    component: History
  },
  // {
  //   path: '/Axios',
  //   name: 'Axios',
  //   component: Axios
  // },
  {
    path: '/lifecycle',
    name: 'Lifecycle',
    component: Lifecycle
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
