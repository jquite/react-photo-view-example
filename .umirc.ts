import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/example'
    },
    {
      path: 'example',
      component: '@/pages/example'
    },
    {
      path: 'example1',
      component: '@/pages/example/example1'
    },
  ],
  fastRefresh: {},
  mfsu: {},
});
