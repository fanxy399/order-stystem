// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import Vuex from 'vuex'
import '@/assets/css/basic.scss'

import Axios from 'axios';
Axios.defaults.baseURL = 'http://a.itying.com';
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.Axios = Axios

Vue.config.productionTip = false

Vue.use(router)

import mintui from 'mint-ui';
Vue.use(mintui);
import 'mint-ui/lib/style.css'; 

import storage from './assets/js/storage'

let roomid = window.location.hash.split('=')[1]
if(roomid){
  storage.set('roomid',roomid)
}else{
  // roomid = storage.get('roomid')
  roomid = '399'
  storage.set('roomid',roomid)
}
console.log(roomid)

import VueSocketIO from 'vue-socket.io' //引入vuesocker.io
Vue.use(new VueSocketIO({               //使用vuesocker.io
    debug:false,                         //开启debug模式
    connection:'http://a.itying.com?roomid='+roomid    //配置与服务器长连接路径
}))
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  sockets: {
    connect: function () {                //与服务器连接成功执行函数
        console.log('socket connected')      
    }
  }
})

