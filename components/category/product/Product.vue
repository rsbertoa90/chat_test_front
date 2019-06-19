<template>
<div v-if="product" class="row">
    <div class="col-12  row p-0 m-0">    
        <div class="red-ribbon col-12" v-if="$mq == 'lg'">
           
            <h1  class=" font-weight-bold" >
                 {{product.name|uc}}
            </h1>
            <div col-lg-3>

            </div>
        </div>
        <div class="col-12 row">
            <div class="col-12 col-lg-8">
                <div class="row">
                    <card :i="i" v-if="$mq=='lg'" :hideHead="true" :product="product"></card>
                    <small-card :i="i" v-else :product="product"></small-card>
                </div>
                <div class="small-images row" v-if="product.images[1]">
                    <div  class="small-image col-3" v-for="(image,key) in product.images" :key="image.url" @click="i =key">
                        <v-lazy-image  :src="imagePath(image.url)" :alt="product.name"></v-lazy-image>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-4">
                <info-row></info-row>
            </div>
        </div>
       
        <div class="col-12 descri" v-if="product.description">
           <p> {{product.description |ucFirst}} </p>
        </div>

        <div class="col-12 mt-4" v-if="category">
            <related-products :products="category.products"></related-products>
        </div>
        
    </div>

        
           
</div>
</template>

<script>
import relatedProducts from './related-products.vue';

import infoRow from './info.vue';
import card from './card.vue';
import smallCard from './small-card.vue';
export default {
    components:{card,smallCard,infoRow,relatedProducts},
    metaInfo(){
        return{
            title:this.metatitle,
            meta: [
                { charset: 'utf-8' },
                { vmid: 'description', name: 'description', content: this.metadescription }
            ]
        }
    },
    data(){
        return{
            i:0
        }
    },
    computed:{

        metatitle(){
            if (this.product )
            {
                
                return this.product.metatitle ? this.product.metatitle : this.product.name+' por mayor'
            }else{return ''}
            
        },
        metadescription(){
            if (this.product){
                if (this.product.metadescription)
                {
                    return this.product.metadescription;
                }
                else if (this.product.description)
                {
                    return this.product.description;
                }
                else return this.product.name+" "+'por mayor';
                    
            }  else{return ''}
            
        },
        categories(){
            return this.$store.getters.getNotPaused;
        },
        category(){
            if(this.product && this.categories)
            {
                return this.categories.find(c => {
                    return c.id == this.product.category_id;
                });
            }
        },
        product(){
            let vm =this;
            let res = null;
             this.categories.forEach(c => {
                 let p = c.products.find(pr => {
                     if(pr.slug){
                       
                         let productSlug = '/'+pr.slug;
                         productSlug = productSlug.replace('//','/');
                         let routeParam = '/'+vm.$route.params.product;
                         routeParam = routeParam.replace('//','/');
                        
                         return routeParam.trim().toLowerCase() == productSlug.trim().toLowerCase(); 
                     }
                   
                 });
                 if (p){
                     res = p;
                  
                     return res;
                 }
            });
            return res;
        },
        config(){
            return this.$store.getters.getConfig;
        }

    }

}
</script>


<style lang="scss" scoped>

.descri{
    font-size:1.3rem;
}
    .fixed-pannel{
        position:fixed;
        top:55px;
        left:20px;
    }

    .red-ribbon{
    background-color: #D52B1E;
    width:100%;
    height:50px;
    display:flex;
    align-items:center;
    justify-content: space-around;
    color:#fff;
    margin-bottom:20px;
    margin-top:10px;
    
    .logo-square{
        background-color: #fff;
        border: 3px solid #868686;
        font-size:2rem;
        color:#D52B1E;
        /* padding:5px; */
        display: flex;
        justify-content: center;
        align-items:center;
        height:75px;
        width:75px;
    }
}

h1{
    font-size: 2rem;
    white-space: nowrap;
}
img{
    width:100%;
}
.small-images{
   padding:10px;
   margin-left:10px;
}
.small-image{
    padding:5px;
    border:1px solid #868686;
    margin-left:5px;
    cursor:pointer;
}

@media(max-width:600px){
    .red-ribbon{
        margin-top: 20px;
        width:100vw;
        height: 60px;
        h1{
            margin-left:10px;
            font-size:1.3rem;
            white-space:normal;
          
        }
    }
}


</style>
