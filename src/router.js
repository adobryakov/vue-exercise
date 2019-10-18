import Vue from 'vue';
import Router from 'vue-router';
import UserList from './components/UserList.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'users',
      component: UserList
    }
  ]
});
