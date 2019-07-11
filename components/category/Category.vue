<template>
    <div class="container" v-if="category">
        <div class="row">
            <div class="col-12">
                <h1> {{category.name | ucFirst}} </h1>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-lg-6">
                <img :src="imagePath(category.image)" :alt="category.name">
            </div>
            <div class="col-12 col-lg-6 ">
                
                  <p v-html="category.description" v-if="category.description">  </p>  
            
            </div>
        </div>
        <!-- LINKS -->
        <div class="row links mt-3" v-if="$mq == 'lg'">
            <div class="col-2 col-lg-2 p-0">
                <button @click="display = 'grid'"
                        class="btn btn-sm "
                        :class="{'bg-focus white-bold' : display == 'grid'}">
                        <fa-icon icon="th"></fa-icon>
                </button>
                <button @click="display = 'list'"
                        class="btn btn-sm "
                        :class="{'bg-focus white-bold' : display == 'list'}">
                        <fa-icon icon="list-ul"></fa-icon>
                </button>
            </div>
            <div class="col-10 col-lg-7 row p-0 d-flex justify-content-start pl-4">
                <div class="col-5 row p-0">
                    <label class=" p-0 pt-2 col-5 text-right pr-1">Ordenar</label>
                    <select class="form-control col-7" v-model="sortby">
                        <option value="name">Nombre</option>
                        <option value="price">Precio</option>
                    </select>
                </div>
                <div class="col-1 offset-1">
                    <button v-if="order == 'asc'" 
                            class="btn btn-sm bg-transparent" 
                            @click="order='desc'">
                        <fa-icon icon="arrow-up"></fa-icon>
                    </button>
                    <button v-else
                            class="btn btn-sm bg-transparent" 
                            @click="order = 'asc'">
                        <span class="fas fa-arrow-down"></span>
                    </button>
                </div>
                <div class="col-5 col-lg-4 row p-0">
                    <label class=" col-6 pt-2 pr-1 ">Mostrar</label>
                    <select class="form-control col-6 p-0" v-model="show">
                        <option v-for="op in showOptions" 
                                :key="op"
                                :value="op"> 
                                {{op}} 
                        </option>
                    </select>
                </div>
            </div>
            <div class="col-12 mt-2 mt-lg-0 col-lg-3">
                <div v-if="pages > 1">
                    <button v-if="page != 1" class=" bg-transparent"
                            @click="page--">
                        <fa-icon icon="chevron-left"></fa-icon>
                    </button>
                    <button v-for="p in pagination" :key="p" 
                            class=" bg-transparent"
                            :class="{'text-focus' : page == p }"
                            @click="page = p">
                        <span> {{p}} </span>
                    </button>
                    
                    <button v-if="page != pages" class=" bg-transparent"
                            @click="page++">
                        <fa-icon icon="chevron-right"></fa-icon>
                    </button>
                </div>
            </div>
        </div>
        <!-- END links -->

        <div class="row">
            <div class="col-12" v-if="display == 'grid'">
                <products-grid :products="products"></products-grid>
            </div>
            <div class="col-12" v-else>
                <products-list :products="products"></products-list>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12 col-lg-4 offset-lg-8 ">
                   
                <div v-if="pages > 1" class="justify-content-center d-flex">
                    <button v-if="page != 1" class=" bg-transparent"
                            @click="page--">
                        <fa-icon icon="chevron-left"></fa-icon>
                    </button>
                    <button v-for="p in pagination" :key="p" 
                            class=" bg-transparent"
                            :class="{'text-focus' : page == p }"
                            @click="page = p">
                        <span> {{p}} </span>
                    </button>
                    
                    <button v-if="page != pages" class=" bg-transparent"
                            @click="page++">
                        <fa-icon icon="chevron-right"></fa-icon>
                    </button>
                </div>
            
            </div>
        </div>
    </div>
</template>

<script>
import productsGrid from './products-grid.vue';
import productsList from './products-list.vue';
export default {
    components : {productsGrid,productsList},
    props:['category'],
    
    mounted(){
        if (this.category && this.category.description)
        {
            this.category.description = this.category.description.replace(/\n/g, "<br />");
        }
    },
    computed : {
        categories(){
            return this.$store.getters.getCategories;
        },
        
    
        products(){
            
            
            if (this.category != null && this.category.products.length > 0){

                let prods = this.category.products;
                
                prods = prods.filter (prod => {
                    return !prod.paused;
                });

                prods = this.orderArray(prods,this.sortby);
                if (this.order == 'desc'){
                    prods = prods.reverse();
                }
                let from = (this.page-1)*this.show;
                let to = from + this.show;
                prods = prods.slice(from,to);
             
               
                return prods;
            }
        },
        pagination(){
            if (this.pages <= 6){
                let array = [];
                for (var i = 1; i <= this.pages ;i++)
                {
                    array.push(i);
                }
                return array;
            }
            else {
                let current = this.page;
                if(current >= this.pages){
                    return [1,current-4,current-3,current-2,current-1,current];
                }
                else if (current >= this.pages-1){
                    return [1,current-2,current-1,current,this.pages];
                }
                else if (current > 2){
                    return [1,current-1,current,current+1,this.pages];
                }else if (current == 1){
                    return [1,2,3,4,5,this.pages];
                }else if (current == 2){
                    return [1,2,3,4,this.pages];
                }
            }
        },
        pages(){
             let res = Math.round(this.category.products.length / this.show);
             if (this.category.products.length % this.show != 0){
                 res++;
             }
             return res;
             
           
        }
      
    },
    data(){
        return{
            display : 'grid',
            sortby : 'name',
            order : 'asc',
            showOptions :[3,6,9,12],
            show:12,
            page:1,
        }
    },
    watch : {
        show(){
            this.page = 1 ;
        }
    }
}
</script>

<style lang="scss" scoped>
    .links{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
        background-color: #6e6c6c44;
        font-size: .75rem;
        font-weight: bold;
        div{
             display: flex;
                justify-content: center;
                align-items: center;
        }
    }
    .form-control{
        font-size: .7rem;
        padding: 0;
    }
    @media(max-width: 990px){
        .links{
            margin-left: -11%;
            margin-right: -20%;
        }
    }
</style>
