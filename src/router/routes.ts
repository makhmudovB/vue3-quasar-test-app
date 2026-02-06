import type { RouteRecordRaw } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', redirect: '/items' },

      {
        path: 'items',
        component: () => import('pages/items/ItemsList.vue'),
      },
      {
        path: 'items/create',
        component: () => import('pages/items/ItemCreate.vue'),
      },
      {
        path: 'items/:id/edit',
        component: () => import('pages/items/ItemEdit.vue'),
        props: true,
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
