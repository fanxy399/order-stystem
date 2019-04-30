<template>
    <div>
        	<div class="cart_content">
			
			<div class="cart_info" >
				
				
				<h2>购物车</h2>				
				
				<div class="p_number">
					<div class="p_number_left">
	       				<p>用餐人数:{{userLi}}</p>
	       				<p>备注:{{markLi}}</p>
	       			</div>	       			
	       			<div class="p_number_right" @click="backStart()">
	       				<img src="@/assets/images/edit.png"/>
	       				<p>修改</p>
	       			</div>					
					
				</div>
				
				<div class="cart_p_num" v-if="!tag">
					
					<p>购物车中总共有{{$store.state.MenuListNum}}个菜</p>
	       			
	       			<p>合计：<span class="price">¥{{$store.state.MenuListTotal}}</span></p>
				</div>
			</div>
			
			
			
			<div class="cart_list" v-if="!tag">
				
				
				<ul>
					<li class="item" v-for="(item, index) in greenslist" :key="index">
							 	<div class="left_food">
	       							<img :src="Axios.defaults.baseURL+'/'+item.img_url"/>       						
		       						<div class="food_info">
		       							<p>{{item.title}}</p>
		       							<p class="price">¥{{item.price}}</p>
		       						</div>
	       							
	       						</div>
	       						
	       						<div class="right_cart">
	       							<div class="cart_num">
								         <div class="input_left" @click="subtractitem(item,index)">-</div>
								          <div class="input_center">
								              <input type="text"  readonly="readonly" v-model="item.num" name="num" id="num" />
								          </div>
								          <div class="input_right" @click="additem(item)">+</div>				      
								        </div>	
	       						</div>	
						
						
						
					</li>
				</ul>
			</div>
			
			
			
			
			<div class="hot_food">
				
				<h3>本店顾客最长点的菜</h3>
				
				<div class="item_list_outer">
					<ul class="item_list">
						<li>	
							<div class="inner">
								<img src="@/assets/images/1.jpg" />
								<p class="title">大蒜腊肉</p>						
								<p class="price">¥26</p>
							</div>		
						</li>
						
						<li>
							<div class="inner">
								<img src="@/assets/images/2.jpg" />
								
								<p class="title">家乡扣肉</p>
								
								<p class="price">¥26</p>	
							</div>					
							
						</li>
						
						<li>	
							<div class="inner">
								<img src="@/assets/images/1.jpg" />
								<p class="title">大蒜腊肉</p>						
								<p class="price">¥26</p>
							</div>		
						</li>
						
						<li>
							<div class="inner">
								<img src="@/assets/images/2.jpg" />
								
								<p class="title">家乡扣肉</p>
								
								<p class="price">¥26</p>	
							</div>					
							
						</li>
						
						<li>
							<div class="inner">
								<img src="@/assets/images/2.jpg" />
								
								<p class="title">家乡扣肉</p>
								
								<p class="price">¥26</p>	
							</div>					
							
						</li>
						
						
					</ul>
					
				</div>

				
			</div>
            <div class="cart_empty" v-if="tag" ref="total">您当前购物车为空，请点击菜单选择您喜欢的菜品</div>
		</div>
		
		<Navfooter></Navfooter>			
		
		<router-link tag="div" :to="'/home?uid='+$route.query.uid" id="footer_book" class="footer_book">
			<img src="@/assets/images/menu.png"/>
			<p>菜单</p>
		</router-link>
		
		
		
		<div @click="getOrder()" id="footer_cart" class="footer_cart">
			<img src="@/assets/images/doorder.png"/>
			<p>下单</p>
        </div>
    </div>
</template>
<script>
// import { mapMutations } from "Vuex";
import Navfooter from '@/components/public/Navfooter'
import storage from '../assets/js/storage.js'
export default {
    data() {
        return {
            greenslist:[],
            tag:false,
            userLi:'',
            markLi:''
        }
    },
    created() {
        this.getGreensList()
        this.getOrderlistnum()
    },
    watch: {
        
    },
    methods: {
        getGreensList(){
            this.Axios.get('/api/cartlist?uid='+storage.get('roomid')).then( res => {
                this.greenslist = res.data.result
                // mapMutations(['getMenuListNum',this.greenslist])
               this.$store.commit('getMenuListTotal',this.greenslist)
            }).catch( err => {
                console.log(err)
            })
        },
        subtractitem(item,key){
            
            this.Axios.get(`/api/decCart?uid=${item.uid}&product_id=${item.product_id}&num=${item.num}`).then( res => {
                this.$socket.emit('addcart','更新数据')
                this.$store.commit('getMenuListTotal',this.greenslist)
            }).catch( err => {
                console.log( err)
            })
            if(item.num == 1){
                this.greenslist.splice(key,1)
            }
            --item.num
        },
        additem(item){
            
            this.Axios.get(`/api/incCart?uid=${item.uid}&product_id=${item.product_id}&num=${item.num}`).then( res => {
                this.$socket.emit('addcart','更新数据')
                this.$store.commit('getMenuListTotal',this.greenslist)
            }).catch( err => {
                console.log( err)
            })
            ++item.num
        },
        backStart(){
            this.$router.push({path:'/',query:{uid:storage.get('roomid')}})
        },
        getOrderlistnum(){
            this.Axios.get('/api/peopleInfoList?uid='+storage.get('roomid')).then( res => {
                this.userLi = res.data.result[0].p_num
                this.markLi = res.data.result[0].p_mark
            }).catch( err => {
                console.log(err)
            })
        },
        getOrder(){
            this.Axios.post('/api/addOrder',{
                uid:storage.get('roomid'),
                p_num:this.userLi,
                p_mark:this.markLi,
                order:JSON.stringify(this.greenslist),
                total_price:this.$store.state.MenuListTotal,
                total_num:this.$store.state.MenuListNum
            }).then( res => {
                if( res.data.success){
                    
                    this.$socket.emit('addcart','下单成功')   // 告诉websocket，下单成功，广播数据
                    this.$router.push({path:'/home/orderpay'})
                }
            })
        }
    },
    watch:{
        greenslist:{
            handler(n,o){
            if(n.length == 0){
                this.tag = true
                }else{
                    this.tag = false
                }
            },
            deep:true,  //deep为true时，可以对data进行深度监听：可以监听到data中二维数组对象
            immediate:true //immediate表示在watch中首次绑定的时候，是否执行handler，值为true则表示在watch中声明的时候，
                            //就立即执行handler方法，值为false，则和一般使用watch一样，在数据发生变化的时候才执行handler。
        }
        // greenslist(n,o){
        //     if(n.length == 0){
        //         this.tag = true
        //         }else{
        //             this.tag = false
        //         }
        //     console.log(n.length)
        //     },
    },
    components:{
        Navfooter
    },
    sockets:{
        addcart(){    //当服务器更新后重新向客户端发起数据
            this.getOrderlistnum()  //用餐人数
            this.getGreensList()  //菜单列表
        }
    }
}
</script>
<style lang="scss" scoped>
.cart_content{
    
    padding: 1rem;
    
    /*头部信息*/
    .cart_info{
        
        background: #fff;
        
        h2{
            text-align: center;
            font-size: 1.8rem;
            padding: .8rem 0px;
            border-bottom: 1px solid #eee;
        }
        border-radius:.5rem;
        padding: .5rem;
        .p_number{
            
            
            display: flex;
            
            padding: .5rem 0;
            border-bottom: 1px solid #eee;
            
            .p_number_left{
                
                flex: 1;
                
                 
                p{
                    line-height: 2;
                    
                    &:first-child{
                        
                        color: red;
                    }
                }
            }
            
            .p_number_right{
                width: 4rem;
                height: 4rem;
                text-align: center;
                
                img{
                    
                    width: 1.8rem;
                    height: 1.8rem;
                    margin: 0 auto;
                }
            }
            
            
            
        }
        
        /*购物车总数量*/
        
        
       .cart_p_num{
           border-bottom: 1px solid #eee;
           p{
               
               line-height: 2;
               
               .price{
                   
                   font-size: 2.4rem;
                   color:red;
               }
           }
       }
        
        
    }
    /*购物车列表*/
   
   .cart_list{
       margin-top: 1rem;
       
       padding: .5rem;
       
       background: #fff;
       
       border-radius: .5rem;
       
       
       
       display: flex;
       
       ul{
           width: 100%;
           
             .item{
                    display: flex;
                    width:100%;
                    
                     border-bottom: 1px solid #eee;
                    
                    padding: 1rem 0px;
                   .left_food{
                       flex: 1;
                       
                       display: flex;                       
                       img{
                            width: 4rem;
                            height: 4rem;
                            border-radius: 10%;
                            margin-right: .8rem;
                                                   
                       }
                       
                       .food_info{
                           
                           flex: 1;
                       }
                       
                       
                   }
                   
                   .right_cart{
                       
                       width: 10rem;
                   }
           }
       }
     
       
      
   }
   
   /*最长点的菜*/
  
  .hot_food{
      
      background: #fff;
      
      margin-top: 1rem;
      
      border-radius: .5rem;
      
      margin-bottom: 4rem;
      
      h3{
          
          font-size: 1.4rem;
          
          padding: .5rem 0px;
      }
      
      .item_list_outer{
          
            width: 100%;
            
            overflow-x:auto;
            .item_list{
          
             
                padding: 0px .5rem;                
                width: 50rem;
                
                li{
                    
                        width: 8rem;
                        padding: .5rem;
                        box-sizing: border-box;                    
                        float: left;
                        
                        .inner{
                                background: #fff;
                                width: 100%;
                                border-radius: .5rem;
                                overflow: hidden;
                                
                                img{
                                    
                                    width:100%;
                                }
                                
                        }
                }
          }
      
          
      }
    
      
      
       
  }
    
    
}

/*购车加减*/
.cart_num{
          
      width: 10rem;      
      
      display: flex;
      margin-top: .8rem;
      
      
      .input_left,.input_right{
          flex: 1;
          
          width: 2.8rem;
          height: 2.8rem;
          
          line-height: 2.8rem;
          
          text-align: center;
          
          color: red;
          
          border: 1px solid #eee;
          
          font-size: 2.4rem;
      }    
      
      .input_center{
          
          flex: 1;
          
          input{
              
               width: 2rem;
               text-align: center;
                width: 100%;
                height: 2.8rem; 
                border: none;
                
                 border-top: 1px solid #eee;
                 
                 border-bottom: 1px solid #eee;
          
                 float: left;
          }
      }
  }
  


/*购车空*/


.cart_empty{
    
    text-align: center;
    line-height: 3;
    
    h3{
        font-size: 1.8rem;
    }
}
</style>
