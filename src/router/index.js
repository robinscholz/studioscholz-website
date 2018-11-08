import Vue from 'vue'
import Router from 'vue-router'
import Featured from '@/components/Featured'
import Index from '@/components/Index'
import Project from '@/components/Project'
import ProjectImage from '@/components/ProjectImage'
import Studio from '@/components/Studio'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Featured',
      props: true,
      component: Featured
    }, {
      path: '/inventory',
      name: 'Inventory',
      props: true,
      component: Index
    }, {
      path: '/inventory/:id',
      name: 'project',
      component: Project,
      props: true,
      children: [
        {
          path: ':num(\\d+)',
          component: ProjectImage,
          props: true,
          name: 'projectimg'
        }
      ]
    },
    {
      path: '/about',
      name: 'About',
      props: true,
      component: Studio
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
