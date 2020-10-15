import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export let secondrouter=[
  {
    path:'banner',
    name:'轮播图',
    component:()=>import('../pages/banner/banner.vue')
  },
  {
    path:'cate',
    name:'分类',
    component:()=>import('../pages/cate/cate.vue')
  },
  {
    path:'goods',
    name:'商品',
    component:()=>import('../pages/goods/goods.vue')
  },
  {
    path:'member',
    name:'会员',
    component:()=>import('../pages/member/member.vue')
  },
  {
    path:'menu',
    name:'菜单',
    component:()=>import('../pages/menu/menu.vue')
  },
  {
    path:'role',
    name:'角色',
    component:()=>import('../pages/role/role.vue')
  },
  {
    path:'seckill',
    name:'秒杀',
    component:()=>import('../pages/seckill/seckill.vue')
  },
  {
    path:'specs',
    name:'规格',
    component:()=>import('../pages/specs/specs.vue')
  },
  {
    path:'manage',
    name:'管理员',
    component:()=>import('../pages/manage/manage.vue')
  },
];

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登录',
      component: ()=>import('../pages/login/login.vue')
    },
    {
      path: '/',

      component: ()=>import('../pages/index/index.vue'),
      children:[
        {
          path:'',
          component:()=>import('../pages/home/home.vue')
        },
        ...secondrouter,
        
      ]
    }
  ]
})
