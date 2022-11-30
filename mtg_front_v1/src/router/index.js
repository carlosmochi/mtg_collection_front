import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../components/UserList')
  },
  {
    path: "/user/:id",
    name: "user-details",
    component: () => import("../components/selected/User")
  },
  {
    path: "/user/newUser",
    name: "new-user",
    component: () => import("../components/selected/newUser")
  },
  {
    path: '/card',
    name: 'card',
    component: () => import('../components/CardList')
  },
  {
    path: "/card/:id",
    name: "card-details",
    component: () => import("../components/selected/Card")
  },
  {
    path: "/card/newCard",
    name: "new-card",
    component: () => import("../components/selected/newCard")
  },
  {
    path: '/deck',
    name: 'deck',
    component: () => import('../components/DeckList')
  },
  {
    path: "/deck/:id",
    name: "deck-details",
    component: () => import("../components/selected/Deck")
  },
  {
    path: "/deck/newDeck",
    name: "new-deck",
    component: () => import("../components/selected/newDeck")
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
