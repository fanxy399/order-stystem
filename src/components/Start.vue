<template>
  <div class="content">
    <div  class="start_content">			
			
			<header class="start_header">				
				<img src="@/assets/images/canju.png"/> <span ref="title">用餐人数</span>
			</header>			
			
			<p class="notice">请选择正确的用餐人数 ，小二马上给你送餐具</p>
						
			<div class="content">
				<ul class="user_list">
					<li v-for="(item, index) in pNum" :key="index" @click="poNum('userLi','num',index)" ref="userLi">						
						<span :class="{active:index == num}">{{item}}人</span>
					</li>
					
									
				</ul>
        <div class="markInput"><input type="text" placeholder="请输入您的口味要求、忌口……（可不填）" v-model="markLi"></div>
        <ul class="markLi">
          <li v-for="(item, index) in pChose" :key="index" @click="poNum('markLi','chose',index)" ref="markLi">
            <span :class="{active:index == chose}">{{item}}</span>
          </li>
        </ul>
			</div>
				
		</div>
		
		<router-link tag="div" :to="'/home/cart?uid='+$route.query.uid" id="start" class="startaa cancel" v-if="!flag">
			
			<span>取消修改</span>
		
	 	</router-link>
		<div id="start" class="startaa start" @click="intoMenu()" v-if="flag">
			
			<span>开始点菜</span>
		
	 	</div>
     <div id="start" class="startaa confirm" @click="intoMenu()" v-if="!flag">
			
			<span>确定修改</span>
		
	 	</div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import storage from '../assets/js/storage.js'
export default {
  data() {
    return {
      chose:-1,
      num:-1,
      pNum:[1,2,3,4,5,6,7,8,9,10,11,12],
      pChose:['不辣','微辣','中辣','变态辣','打包带走'],
      userLi:'',
      markLi:'',
      flag:true
    }
  
  },
  beforeRouteEnter (to, from, next) {
    
    if (from.path == '/home/cart') {
     next(vm => {
        vm.flag = false
        vm.$refs.title.innerHTML = '修改用餐人数'
     })
    }else if(from.path == '/'){
      next(vm => {
        vm.getOrderlistnum()
        window.onload=function(){
          if(vm.num != -1){
            next('/home')
          }
        }
      })  
    }
    next()
  },
  created() {
    this.getOrderlistnum()
  },
  methods: {
    intoMenu(){
      var p_mark=this.markLi
      if (this.userLi == '') {
        Toast('用餐人数不能为空');
        return false
      }else if (this.markLi == ''){
        p_mark = '暂无口味要求'
      }
      this.Axios.post('/api/addPeopleInfo',{
        uid:storage.get('roomid'),
        p_num:this.userLi,
        p_mark:p_mark
      }).then( res => {
        if(res.data.success == 'true'){
          this.$socket.emit('addcart','更新用餐人数信息')  //向服务器更新用餐人数信息 ，广播数据
          this.$router.push({path:'/home',query:{uid: storage.get('roomid')}})
        }
      }).catch( err => {
        console.log(err)
      })
    },
    poNum(name,node,key){
      this[node] = key
      this[name] = this.$refs[name][key].querySelector('span').innerHTML
    },
    getOrderlistnum(){
      this.Axios.get('/api/peopleInfoList?uid='+storage.get('roomid')).then( res => {
        this.num = parseInt(res.data.result[0].p_num)-1
        this.userLi = res.data.result[0].p_num
        this.markLi = res.data.result[0].p_mark
      }).catch( err => {
        console.log(err)
      })
    }
  },
  sockets:{
    addcart(){
      this.getOrderlistnum()
    }
  }
}
</script>
<style lang="scss" scoped>
  .content{
    .start_content{
    
    
    
    .start_header{
        
        height: 3.2rem;
        
        line-height: 3.2rem;
        background: #000;
        
        color: #fff;
        
        width: 12rem;
        text-align: center;
        margin: 5rem auto 0rem auto;
        
        border-radius: .5rem;
        
        img{
            
            height:2.2rem;
            
            line-height: 2.2rem;
            position: relative;
            
            top:.5rem;
            margin-left: 1rem;
        }
    }
    
    
    .notice{
        
        color: red;
        //
        text-align: center;
        
        
        margin:1rem 0rem;
        
        
    }
    .markInput{
      padding: 1rem;
      padding-right: 3rem;
      input{
        height: 3.5rem;
        line-height: 3.5rem;
        width: 100%;
        border: .1rem solid #eee;
        border-radius: .1rem;
        padding-left: 2rem;
      }
    }
    .user_list , .markLi{
        $color:#2c3e50 !default;
        $background:#fff !default;
        display: flex;
        
        flex-wrap: wrap;
        padding: .5rem;
        
        li{
            
             width: 25%;
             padding: .5rem;             
             box-sizing: border-box;   /*盒子的宽度=盒子本身宽度    默认 盒子的宽度=盒子的宽度+padding+border*/
             
             span{
                 
                 display: block;
                 
                 width: 100%;
                 height: 3.2rem;
                 color: $color;
                 line-height: 3.2rem;
                 text-align: center;
                 background: $background ;
                 border-radius: .5rem;
                 border: 1px solid #ccc;
             }
            .active{
                background: red;
                color: #fff;
              }
        
            
        }
        
        
    }
  }
.cancel{
    left: 20%;
   }
   .start{
    left: 50%;
   }
   .confirm{
    right: 10%;
   }
.startaa{
    
    position: fixed;
    
    bottom: 5rem;
    
    
    margin-left: -3rem;
    
    width: 6rem;
    
    height: 6rem;
    
    border-radius: 50%;
    
    background: red;
    color: #fff;
    span{
        
        display: block;
        
        width: 2.5rem;
        
        margin: 0 auto;
        
        position: relative;
        
        top:1.5rem;
    }
    
  }
}
  
</style>

