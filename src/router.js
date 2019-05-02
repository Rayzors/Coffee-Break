import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Watch from '@/views/Watch';
import Search from '@/views/Search';
import Category from '@/views/Category';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/watch/:videoid',
      name: 'watch',
      component: Watch,
    },
    {
      path: '/search/:query',
      name: 'search',
      component: Search,
    },
    {
      path: '/category/:categoryid',
      name: 'category',
      component: Category,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition);
        } else {
          resolve({ x: 0, y: 0 });
        }
      }, 3000);
    });
  },
});
