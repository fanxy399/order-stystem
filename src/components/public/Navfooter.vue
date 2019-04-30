<template>
    <div>
        <div id="footer_nav" class="footer_nav" @click="flag = !flag">
			<img src="@/assets/images/navigation.png"/>
			<p>导航</p>
		</div>
        <div class="footer_nav_show" v-if="flag">
            
            <ul class="list">                    
                
                <router-link tag="li" to="/home">
                    
                        <img src="@/assets/images/menu.png"/>
                        <p>菜单</p>
                   
                  
                </router-link>
                
                <router-link tag="li" to="/home/cart">
                   
                         <img src="@/assets/images/cart.png"/>
                        <p>购物车</p>
                    
                </router-link>
                
                <router-link tag="li" to="/home/orderpay">	
                    
                       <img src="@/assets/images/order.png"/>
                        <p>我的订单</p>
                   	
                   
                </router-link>				
                
                <li>	
                  
                       <img src="@/assets/images/wallet.png"/>
                        <p>结账</p>
                   
                    
                </li>
                
                <li @click="flag= !flag">
                    <img src="@/assets/images/close.png"/>
                    <p>返回</p>
                </li>
            </ul>
            
            
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            flag:false
        }
    },
}
</script>
<style lang="scss" scoped>

</style>
