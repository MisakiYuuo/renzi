import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  children: [
    {
    // 默认路径,访问父路由/employees直接方法这个子路由
      path: '',
      name: 'employees',
      component: () => import('@/views/employees/index.vue'),
      meta: { title: '员工', icon: 'people' }
    },
    {
      path: 'detail/:id',
      component: () => import('@/views/employees/detail.vue'),
      props: true,
      hidden: true
    },
    {
      path: 'print/:id',
      component: () => import('@/views/employees/print.vue'),
      props: true,
      hidden: true
    }
  ]
}
