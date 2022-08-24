export default [
  {
    path: '/',
    name: 'index',
    component: () => import('./routes/Index.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./routes/About.vue')
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: '404', 
    component: () => import('./routes/Index.vue') 
  }
]
