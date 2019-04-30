<template>
    <div>
        <header class="index_header">
			
			<div class="hlist">
				<img src="@/assets/images/rexiao.png"/>
				<p>热销榜</p>				
			</div>
			
			<div class="hlist">
				<img src="@/assets/images/caidan.png" />
				<p>点过的菜</p>				
			</div>
			<div class="hlist">
				
				<img src="@/assets/images/sousuo.png"/>
				<p>搜你喜欢</p>				
			</div>
			
		</header>
		
		<aside class="left_cate" id="left_cate" ref="left_cate">
				<ul>
					<li v-for="(item, index) in itemMenu" :key="index" @click="getKey(index)">{{item.title}}</li>
				</ul>
				
				<div id="nav_cate" class="nav_cate" ref="nav_cate" @click="menuClick()">
					<img src="@/assets/images/nav.png"/>
					<p>菜单</p>
				</div>
				
				
		</aside>
		
		
		<div class="content">
			
			
			<div class="item" v-for="(item, index) in itemMenu" :key="index" ref="itemTitle">
				
				<h3 class="item_cate">{{item.title}}</h3>
				
				<ul class="item_list">
					<router-link :to="'/home/pcontent?id='+items._id+'&uid='+$route.query.uid" tag="li" v-for="(items, index) in item.list" :key="index">	
						<div class="inner">
							<img :src="Axios.defaults.baseURL+'/'+items.img_url" />
							<p class="title">{{items.title}}</p>						
							<p class="price">¥{{items.price}}</p>
						</div>		
					</router-link>
					
					
					
				</ul>
				
			</div>
			
		</div>
		
		<div class="bg" id="bg" ref="bg" @click="menuClick()">
			
			
		</div>
        <Navfooter></Navfooter>
        <div id="footer_cart" class="footer_cart" @click="intoCat()">
			<img src="@/assets/images/cart.png"/>
			<p>购物车</p>
            <span id="greensnum">{{greensnum}}</span>
		</div>
    </div>
</template>
<script>
import Navfooter from '@/components/public/Navfooter'
import storage from '../assets/js/storage.js'
export default {
    data() {
        return {
            flag : false,
            itemMenu:[],
            greensnum:0
        }
    },
    created() {
        this.getProduclist()
        this.getcarnum()
    },
    methods: {
        menuClick(){
            const bg = this.$refs.bg
            const lfet_cate = this.$refs.lfet_cate
           if(this.flag){
                left_cate.style.transform = 'translate(-100%,0)'
                bg.style.display='none';
           }else{
                bg.style.display='block';
                left_cate.style.transform = 'translate(0,0)'
           }
           this.flag = !this.flag
        },
        getProduclist(){
            this.Axios.get('/api/productlist')
            .then(response => {
                this.itemMenu = response.data.result
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        getKey(key){
            var  tpScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            console.log(tpScrollTop)
            // this.$nextTick(() => {
                
            //     console.log(this.$refs.itemTitle[key].offsetTop)
            //     this.$refs.itemTitle[key].offsetTop = tpScrollTop
            //      console.log(tpScrollTop)
            // })
            tpScrollTop = 500
        //   this.$nextTick(() => {
        //         document.querySelector(".item")[key].scrollTop = this.$refs.itemTitle[key].offsetTop
        //         });
            
            console.log(this.$refs.itemTitle[key].offsetTop)
           
        },
        getcarnum(){
            this.Axios.get('/api/cartCount?uid='+storage.get('roomid')).then( res => {
                this.greensnum = parseInt(res.data.result)
            }).catch( err => {
                console.log(err)
            })
            let data={
                uid:storage.get('roomid')
            }
        },
        intoCat(){
            this.$router.push({path: '/home/cart', query: { uid: storage.get('roomid') }})
        }
    },
    components:{
        Navfooter
    },
    sockets:{
        addcart:function(){   //当服务器更新后重新向客户端发起数据
            this.getcarnum()        
        }
    }
}
</script>
<style lang="scss" scoped>
    .index_header{
    width: 96%;
    
    margin: 0 auto;
    
    height: 4.4rem;
    
    
    background: #fff;
    margin-top:1rem;
    
    display: flex;
    border-radius: .5rem;
    
    .hlist{
        
        flex: 1;
        text-align: center;
        padding-top: .2rem;
        border-right: 1px solid #eee;
        
        img{
            width: 2rem;
            height: 2rem;
            margin: 0 auto;
        }
        
        &:last-child{
            
            border-right: none;
        }
    }
    
    
}

/*列表*/
.item{
    
    .item_cate{
        text-align: center;
        
        padding: .5rem;
    }
    
    .item_list{
        
        display: flex;
        
        flex-wrap: wrap;
        
        padding: 0px .5rem;
        
        li{
            width: 33.3%;
            padding: .5rem;
            
            box-sizing: border-box;
            
                  
            .inner{
                
                background: #fff;                
                width: 100%;
                 border-radius: .5rem;    
                 overflow: hidden; 
                img{
                    width: 100%;
                    height: 10rem;
                }
                p{
                    
                    padding: .2rem .5rem;
                    
                }
                
                .title{
                    
                    font-weight: bold;
                }
                
                
            }
        }
    }
}



/*侧边栏*/


.left_cate{
    
    /*css3运动  加过渡效果*/   
    transition: all 1s;
    
    transform: translate(-100%,0);
    
    z-index: 2;
    
    
    
    width: 7rem;
    
    height: 100%;
    
    position: fixed;
    
    background: #eee;
    top:0px;
    left: 0px;
    
    ul{
        position: absolute;
        
        height: 100%;
        padding: .5rem;
        
        z-index: 3;
        
        background: #eee;
        li{
            
            line-height: 4.4rem;
        }
    }
    
    
    
    .nav_cate{
        
        position: absolute;
        
        right: -3.5rem;
        
        background: rgba(132, 128, 128, 0.9);
        top:42%;
        
        width: 5rem;
        
        height: 4rem;
        text-align: center;
        
        border-radius: 0rem 50% 50% 0rem;
        
         z-index: 2;
        img{
            
            width: 1.8rem;
            
            height: 1.8rem;
            
            margin-left: 1rem;
            
            margin-top: .4rem;
            
        }
        p{
            color: #fff;
            margin-left: 1rem;
            
            margin-top:-0.3rem
        }
    }
}


/*透明层*/

.bg{
    
    position: fixed;
    
    width: 100%;
    height: 100%;
    
    background: rgba(132, 128, 128, 0.4);
    
    left: 0px;
    
    top:0px;
    z-index: 1;
    
    display: none;
    
    
}
.footer_cart{
    span{
        display: block;
        background: red;
        border-radius: 50%;
        display: block;
        background: red;
        border-radius: 50%;
       top: -5rem;
        position: relative;
        right: -3.5rem;
        width: 2rem;
        line-height: 2rem;
        height: 2rem;
        font-size: 1rem


    }
}
</style>
