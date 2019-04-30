import Vue from 'vue'
import Router from 'vue-router'
import Start from '@/components/Start'
import Home from '@/components/Home'
import Pcontent from '@/components/Pcontent'
import Cart from '@/components/Cart'
import OrderPay from '@/components/OrderPay'
import Success from '../components/Success'
Vue.use(Router)

export default new Router({
  // mode:history,
  routes: [
    {
      path: '/',
      redirect:'/start',
    },
    {
      path: '/start',
      name: 'Start',
      component: Start
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/home/pcontent',
      name: 'Pcontent',
      component: Pcontent
    },
    {
      path:'/home/cart',
      name:'Cart',
      component:Cart
    },
    {
      path:'/home/orderpay',
      name:'OrderPay',
      component:OrderPay
    },
    {
      path:'/home/success',
      name:'Success',
      component:Success
    }
  ]
})
