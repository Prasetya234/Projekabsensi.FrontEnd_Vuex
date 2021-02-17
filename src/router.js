import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      // lazy-loaded
      component: () => import('./views/Register.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      // lazy-loaded
      component: () => import('./views/BoardAdmin.vue')
    },
    {
      path: '/absen',
      name: 'absen',
      // lazy-loaded
      component: () => import('./views/BoardAbsen.vue')
    },
    {
      path: '/siswa',
      name: 'siswa',
      // lazy-loaded
      component: () => import('./views/Siswa.vue')
    },
    {
      path: '/mod',
      name: 'moderator',
      // lazy-loaded
      component: () => import('./views/BoardModerator.vue')
    },
    {
      path: '/edit',
      name: 'edit',
      // lazy-loaded
      component: () => import('./views/Edit.vue')
    },
    {
      path: '/map2',
      name: 'map2',
      // lazy-loaded
      component: () => import('./views/Map2.vue')
    },
    {
      path: '/check2',
      name: 'check2',
      // lazy-loaded
      component: () => import('./views/Check2.vue')
    },
    {
      path: '/check',
      name: 'check',
      // lazy-loaded
      component: () => import('./views/Check.vue')
    },
    {
      path: '/uji',
      name: 'uji',
      // lazy-loaded
      component: () => import('./views/Uji.vue')
    },
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./views/BoardUser.vue')
    },
    // {
    //   path: '/map',
    //   name: 'map',
    //   // lazy-loaded
    //   component: () => import('./views/Map.vue')
    // }
  ]
});

