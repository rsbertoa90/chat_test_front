<template>
    <div v-if="product">
        <div class="row justify-content-center" itemscope itemtype="http://schema.org/Product">
            <div class="col-12 col-lg-6 row">
                <div class="col-12" >
                    <v-lazy-image v-if="!product.images[0]"  :src="noImage" alt="sin foto"/>
                    <v-lazy-image  itemprop="image" v-else 
                        :src="imagePath(product.images[selectedImage])" 
                        :alt="product.name" />
                </div>
                <div class="col-12 row" v-if="product.images[1]">
                    <div class="col-4" v-for="i in product.images.length" :key="i" @click="selectedImage=i-1">
                        <v-lazy-image :src="imagePath(product.images[i-1])" :alt="product.name"  />
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-6" itemprop="offer">
                <div class="d-flex flex-column align-items-start justify-content-around h-100">
                    <div class="d-flex flex-column">
                        <h1 itemprop="name"> {{product.name | ucFirst}} </h1>
                        <span class="text-secondary"> {{product.category.name |ucFirst}} </span>
                    </div>
                    <div  class="d-flex align-items-center" v-if="config && !config.hide_prices">
                        <h2 itemprop="price">  ${{product.price}} </h2>
                        <h5> <del class="text-secondary ml-2"> ${{product.price*1.4 |price}} </del> </h5>
                    </div>
                    <div class="d-flex flex-column mt-3" v-if="product.description">
                        <h4>Sobre el producto:</h4>
                        <p class="texto"> {{product.description | ucFirst}} </p>
                        <span style="font-size: 0.7rem ; font-style:italic">* Los diseños estan sujetos a disponibilidad</span>
                    </div>
                    <div class="mt-3">
                        <shop-button :product="product"></shop-button>
                    </div>
                    <div class="row mt-3">
                        <div class="col-6 d-flex align-items-center">
                             <fa-icon icon="truck" class="mr-2"></fa-icon>
                             <span class="ml-2">Envio a todo el país</span>
                        </div>
                        <div class="col-6 d-flex align-items-center">
                            <fa-icon icon="hand-holding-usd"></fa-icon>
                            <span class="ml-2">Somos fabricantes!</span>
                        </div>
                        <div class="col-12 d-flex flex-column" v-if="configs">
                            <span> <fa-icon icon="check"></fa-icon>  Los precios publicados son sin IVA</span>
                            <span> <fa-icon icon="check"></fa-icon> Acercándote personalmente a las sucursales la compra mínima es de ${{configs.minbuy}}.</span>
                            <span> <fa-icon icon="check"></fa-icon> La Compra minima <b> ONLINE </b> es de ${{configs.minbuy_ship}}</span>
                            <span> <fa-icon icon="check"></fa-icon> Los despachos o retiros de las compras online se realizan de 2 a 6 días hábiles luego del informe y acreditación de pago.</span>
                            <span> <fa-icon icon="check"></fa-icon> <b> Envío: </b> la elección del trasporte y el costo del mismo corre a cargo del comprador. Mates Fabi lo lleva sin cargo  desde la fabrica hasta el transporte de tu elección.</span>
                            <span> <fa-icon icon="check"></fa-icon> <b> Formas de pago: </b> Efectivo o Deposito /Transferencia Bancaria.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
           <no-ssr>

                <related-products :category_id="product.category_id"></related-products>
           </no-ssr>
           
        </div>
    </div>
</template>

<script>
import shopButton from './shop-button.vue';
import relatedProducts from './related.vue';
export default {
    components:{relatedProducts,shopButton},
    
    data(){
        return{
            selectedImage : 0
        }
    },
    computed:{
        configs(){
            return this.$store.getters.getConfig;
        },
        categories(){
            return this.$store.getters.getCategories;
        },
        product(){
              
            let res = null;
            let param = '/' + this.$route.params.product;
            param =param.replace('//','/');
            this.categories.forEach(c=>{
               let prod  = c.products.find(p => {
                   let slug = '/'+p.slug;
                    slug =slug.replace('//','/');
                    return slug == param;
               });
               if(prod){
                   res = prod;
                    return res;
               }
            });
         
             return res;
        
        },
    },
    methods:{
        show(){
            if (this.product.images[0]){
                let url = this.product.images[this.selectedImage].url;
                let image = document.createElement('img');
                image.setAttribute('src',this.imagePath(url));
                swal({
                    content:image,
                });
            }else{
                    var content = document.createElement("img");
                    $(content).attr('src',this.noImage);
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
    }
</style>