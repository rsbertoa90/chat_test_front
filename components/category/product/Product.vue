<template>
    <div v-if="product">
        <div class="row justify-content-center" itemscope itemtype="http://schema.org/Product">
            <div class="col-12 col-lg-6 row">
                <div class="col-12" @click="show">
                    <v-lazy-image v-if="!product.images[0]"  src="/storage/images/app/no-photo.png" alt="sin foto"/>
                    <v-lazy-image  itemprop="image" v-else 
                        :src="product.images[selectedImage].url" 
                        :alt="product.name" />
                </div>
                <div class="col-12 row" v-if="product.images[1]">
                    <div  v-if="i-1 != selectedImage"  class="col-4" v-for="i in product.images.length" :key="i" @click="selectedImage=i-1">
                        <v-lazy-image :src="product.images[i-1].url" :alt="product.name"  />
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-6">
                <div class="d-flex flex-column align-items-start justify-content-around h-100">
                    <div class="d-flex flex-column">
                        <h2> {{product.name | ucFirst}} </h2>
                        <span class="text-secondary"> {{product.category.name |ucFirst}} </span>
                    </div>
                    <div  class="d-flex align-items-center">
                        <h2>  ${{product.price}} </h2>
                        <h5> <del class="text-secondary ml-2"> ${{product.price*1.4 |price}} </del> </h5>
                    </div>
                    <div class="d-flex flex-column mt-3" v-if="product.description">
                        <h4>Sobre el producto:</h4>
                        <p class="texto"> {{product.description | ucFirst}} </p>
                        <span style="font-size: 0.7rem ; font-style:italic">* Los diseños estan sujetos a disponibilidad</span>
                    </div>
                    <div class="mt-3">
                        <nuxt-link to="/cotizador" class="btn btn-lg btn-outline-success"> <span class="fa fa-shopping-cart"></span> Hacer pedido</nuxt-link>
                    </div>
                    <div class="row mt-3">
                        <div class="col-6 d-flex align-items-center">
                             <span class="fa fa-truck mr-2"></span>
                             <span class="ml-2">Envio a todo el país</span>
                        </div>
                     
                        <div class="col-12 d-flex flex-column">
                            <span><i class="fa fa-arrow-right"></i> Compra minima en local: $1500</span>
                            <span><i class="fa fa-arrow-right"></i> Compra minima para envios: $3000</span>
                            <span><i class="fa fa-arrow-right"></i> Los despachos se realizaran de 1 a 5 días hábiles a partir del informe y acreditación del pago</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <related-products :category_id="product.category_id"></related-products>
        </div>
    </div>
</template>

<script>
import relatedProducts from './related.vue';
export default {
    components:{relatedProducts},
    data(){
        return{
            selectedImage : 0
        }
    },
    computed:{
        product(){
            let slug = this.$route.params['product_slug'];
            
            slug = '/'+slug;
            slug =slug.replace('//','/');
            slug =slug.replace('//','/');
            let categories = this.$store.getters.getCategories;
            let res =null;
            if  (categories){
                categories.forEach(c => {
                    c.products.forEach(p=>{
                        let sl = '/'+p.slug;
                        sl = sl.replace('//','/');
                        sl = sl.replace('//','/');
                       
                        if (sl == slug)
                        {
                            res = p;
                        }
                        
                    });
                });
                return res;
            }
        },
    },
    methods:{
        show(){
            if (this.product.images[0]){
                let url = this.product.images[this.selectedImage].url;
                let image = document.createElement('img');
                image.setAttribute('src',url);
                swal({
                    content:image,
                });
            }else{
                    var content = document.createElement("img");
                    $(content).attr('src','/storage/images/app/no-photo.png');
                    content.style.width = '100%';
                    swal({content : content});
            }
        }
    }
}
</script>


<style scope>
    .fa,.fas{
        font-size: 1.5rem;
        text-align: center;
        
    }
</style>