<template>
    <div>
       <div class="order_content">
			
		 	<div class="order_info">
	       		
	       		<div class="order_top">
	       			<img src="../assets/images/timer.png" />	       		       		      			
	       			<div class="order_info_right">
	       				<h2>{{orderlist.uid}}号桌待门店接单</h2>
	       				<p>请及时联系服务员确认一点菜品信息!</p>
	       			</div>	 
	       		</div>
	       		
       			
       			<h3>已点菜品{{orderlist.total_num}}份,合计 : <span class="price">{{orderlist.total_price}}元</span> </h3>
	       		<div  class="radio-wrapper">
                    <div @click="alipay()">
                        <img class="icon" src="@/assets/images/alipay.png">
                        <span class="text">支付宝支付</span>
                    </div>           
                    <div @click="wechat()">
                        <img class="icon" src="@/assets/images/wechat.png">
                        <span class="text">微信支付</span>
                    </div>
                </div>
                
             
	       </div>
	       
	       <!--订单列表-->
	       
	       <div class="order_list">
	       	
	       		<h3>菜品详情:</h3>
	       		<ul class="list">
	       			<li v-for="(item, index) in orderlist.items" :key="index">
	       				<div class="title">
	       					{{item.title}}
	       				</div>
	       					
       					<div class="num">
       						
       						{{item.num}}份
       					</div>
       					
       					
       					<div class="price">
       						
       						{{item.price}}元
       					</div>
       			
	       			</li>
	       			
	       			
	       			
	       		</ul>
	       
	       </div>
       	
			
		</div>
        <Navfooter></Navfooter>			
		
		<router-link tag="div" to="/home" id="footer_book" class="footer_book">
			<img src="@/assets/images/menu.png"/>
			<p>菜单</p>
		</router-link>
    </div>
</template>
<script>
import Navfooter from '@/components/public/Navfooter'
import storage from '../assets/js/storage.js'
export default {
    data() {
        return {
            orderlist:[]
        }
    },
    created() {
        this.getorderlist()
    },
    methods: {
        getorderlist(){
            this.Axios.get('/api/getOrder?uid='+storage.get('roomid')).then(res =>{
                console.log(res.data.result)
                this.orderlist = res.data.result[0]
            })
        },
        alipay(){
            this.Axios.post('/api/doPay',{
                uid:storage.get('roomid'),
                order_id:this.orderlist.order_id,
                total_price:this.orderlist.total_price,
                return_url:'http://localhost:3000/#/home/success'
            }).then( res => {
                console.log(res.data)
                if(res.data.result.code == 0){
                    location.href = res.data.result.data
                }
            }).catch( err => {
                console.log(err)
            })
            
        },
        wechat(){
            location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7bf3787c783116e4&redirect_uri=http://b.itying.com?cid=123&name=zhangsan&response_type=code&scope=snsapi_base#wechat_redirect'
        }
    },
    sockets:{
        addcart(){
            this.getorderlist()
        }
    },
    components:{
        Navfooter
    }
}
</script>
<style lang="scss" scoped>
.order_content{
    padding: 1rem;
    
    
    .order_info{
        
        background: #fff;
        
        border-radius: .5rem;
        
       .order_top{
           
           display: flex;
           
           img{
               width: 5.6rem;
               height: 5.6rem;
           }
           
           .order_info_right{
               flex: 1;
               padding-top: .5rem;
               
           }           
          
       }
       
        h3{
               
               line-height: 2;
               padding: .5rem;
               
               .price{
                   font-size: 2rem;
                   
                   color: red;
               }
        }
        .radio-wrapper {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-around;
        div{
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            background: #eee;
            box-shadow: 1px 1px .5rem #999;
            padding: .5rem;
            border-radius: 3px;
            .icon {
            width: 30px;
            height: 30px;
            margin-left: 5px;
            margin-right: 5px;
            }
            .text {
            font-size: 20px;
            }
        }
      }
    }
    
    
    //  订单列表
    
    
      .order_list{
          
          background: #FFFFFF;
          border-radius: .5rem;
          margin-top: 1rem;
          
          padding: .5rem;
          
          h3{
              
              line-height: 2;
          }
          
          
          .list{
                           
              
              li{
                  
                  display: flex;
                  
                  line-height: 2;
                  padding: .5rem 0rem;
                  
                  .title{
                      
                      flex: 2;
                  }
                  
                  .num{
                      flex: 1;
                      text-align: center;
                  }
                  
                  .price{
                      flex: 1;
                      
                      text-align: center;
                  }
              }
          }
          
      }

    /*支付页面*/
    .order_pay{
        
            
            background: #fff;
            
            border-radius: .5rem;
            
            h3{
                
                padding:2rem 0rem .5rem 0rem;
                
                font-size: 2rem;
                text-align: center;
               
            }
            
            .order_pay_detail{
                display: flex;
                
                line-height: 2;
                
                border-bottom: 1px solid #eee;
                
                padding: .5rem;
                
                .d_num,.p_num,.order_time{
                    
                    flex:1;
                }
            }
            
            .order_pay_info{
                
                line-height: 2;
                
                display: flex;
                
                margin: 1rem 0rem;
                padding: .5rem .5rem 1rem .5rem;
                
                
                .price_list{
                    flex: 1;
                    
                    .price{
                        
                        font-size: 2rem;
                        
                        color: red;
                    }
                }
                
                .pay_button{
                    
                        width: 10rem;
                        border-radius: .5rem;
                        background: red;
                        color: #fff;
                        text-align: center;
                        height: 2.6rem;
                        line-height: 2.6rem;
                       position: relative;
                       
                       top:.5rem
                }
            }
    }

    
    
}
.footer_book{
    left: 90%;
}
</style>
