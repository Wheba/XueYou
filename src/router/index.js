import Vue from 'vue'
import VueRouter from 'vue-router'
import Excessive from '../views/Excessive.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Excessive',
    component: Excessive
  },
  {
    path: '/follow',
    name: 'Follow',
    component: () => import('../views/Follow.vue')
  },
	{
	  path: '/main',
	  name: 'Main',
	  component: () => import('../views/Main'),
		children:[{
			path: 'home',
			name: 'Home',
			component: () => import('../views/Main/components/home'),
		},{
			path: 'user',
			name: 'User',
			component: () => import('../views/Main/components/user'),
		},{
			path: 'more',
			name: 'More',
			component: () => import('../views/Main/components/more'),
		}]
	}
]

const router = new VueRouter({
  routes
})

export default router
