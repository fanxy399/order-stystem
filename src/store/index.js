import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        MenuListNum:0,
        MenuListTotal:0
    },
    mutations:{
        getMenuListTotal(state,total){
            let greensTotal = 0
            let greensNum = 0
            total.forEach(element => {           
                greensTotal += parseInt(element.price)*parseInt(element.num)
                greensNum += parseInt(element.num)
            });
            state.MenuListNum = greensNum
            state.MenuListTotal = greensTotal
        }
    },
    getters:{

    }
})
export default store