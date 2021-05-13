import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(VueRouter)
const Login = () => import('../views/Login.vue')
const Layout = () => import('../views/Layout.vue')
const Index = () => import('../views/Index.vue')
const Role = () => import('../views/role/Role.vue')
const Error = () => import('../views/Error.vue')
const Admin = () => import('../views/role/Admin')
const RoomType = () => import('../views/room/RoomType.vue')

const Home = () => import('../views/user/Home')
const Mine = () => import('../views/user/Mine')
const Email = () => import('../views/user/Email')
const Message = () => import('../views/user/Message')
const ResetPwd = () => import('../views/user/ResetPwd')
const Room = () => import('../views/room/Room.vue')
const Guest = () => import('../views/guest/Guest.vue')
const routes = [
  {
    path: '/',
    meta: { title: 'Bing酒店管理系统' },
    component: Index
  },
  {
    path: '/login',
    meta: { title: '登录页' },
    component: Login
  },
  {
    path: '/layout',
    meta: { title: 'Bing酒店管理系统' },
    component: Layout,
    children: [
      {
        path: '',
        meta: { title: '首页' },
        component: Home
      },
      {
        path: 'message',
        meta: { title: '系统消息' },
        component: Message
      },
      {
        path: 'email',
        meta: { title: '电子邮件' },
        component: Email
      },
      {
        path: 'mine',
        meta: { title: '个人中心' },
        component: Mine
      },
      {
        path: 'resetPwd',
        meta: { title: '修改密码' },
        component: ResetPwd
      },
      {
        path: 'role',
        meta: { title: '角色管理' },
        component: Role
      },
      {
        path: 'admin',
        meta: { title: '账户管理' },
        component: Admin
      },
      {
        path: 'roomType',
        meta: { title: '客房类型管理' },
        component: RoomType
      },
      {
        path: 'room',
        meta: { title: '客房管理' },
        component: Room
      },
      {
        path: 'guest',
        meta: { title: '顾客管理' },
        component: Guest
      }
    ]
  },
  {
    path: '*',
    component: Error
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

// 路由后置守卫
router.afterEach((to, from) => {
  NProgress.done()
})
export default router
