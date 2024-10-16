// vie-router通过npm安装
import { createRouter, createWebHistory } from 'vue-router'
// 在js文件中可以直接引入vue文件。他们会被vite编译成js文件。
import ReView from '../views/ReView.vue'

// 这里是路由配置。我们可以在这里配置路由，然后在 App.vue 中使用 <RouterView> 来显示路由组件。
// 通过 createRouter 创建一个路由实例，然后通过 createWebHistory 创建一个路由历史实例。
// 通过 router.addRoute 添加路由配置。
// 最后通过 export default router 导出路由实例。
// 导出的路由实例会在 main.ts 中被挂载到 app 上。
//  import router from './router'
//  app.use(router)

const router = createRouter({
  // 这里的 import.meta.env.BASE_URL 是 vite 的一个全局变量，它会根据你的项目路径生成一个基础路径。
  // 例如，如果你的项目路径是 /beidanci/，那么 import.meta.env.BASE_URL 就是 /beidanci/。
  // 这样做的好处是，你可以在不同的环境中使用相同的代码，而不用担心路径问题。
  // createWebHistory 是一个工厂函数，它会返回一个路由历史实例。
  // 这个路由历史实例会根据浏览器的 history API 来管理路由。
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/review',
      name: 'review',
      component: ReView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
